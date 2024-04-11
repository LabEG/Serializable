{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE ImplicitParams #-}
{-# LANGUAGE OverloadedLabels #-}
{-# LANGUAGE OverloadedRecordDot #-}
{-# LANGUAGE PatternSynonyms #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TypeApplications #-}
{-# OPTIONS_GHC -fplugin Debug.Breakpoint #-}

module Generate where

import AST
import Control.Lens (filtered, isn't, to, traversed, (^.), (^..))
import Control.Lens.Extras (is)
import Data.Generics.Labels ()
import Data.Generics.Product ()
import Data.Generics.Sum (_Ctor)
import Data.List.NonEmpty (NonEmpty ((:|)), fromList, toList)
import Data.Time (UTCTime (..), secondsToDiffTime)
import Data.Time.Calendar.OrdinalDate (pattern YearDay)
import Hedgehog (Gen)
import Hedgehog.Gen (alphaNum, choice, element, frequency, integral, lower, nonEmpty, string, subsequence, upper)
import Hedgehog.Gen qualified as Gen
import Hedgehog.Range (constant)

_NAME_LENGTH_MAX :: Int
_NAME_LENGTH_MAX = 10

genManyName :: Gen String
genManyName = string (constant 2 _NAME_LENGTH_MAX) alphaNum

genCamelCaseName :: Gen String
genCamelCaseName = (:) <$> lower <*> genManyName

genJsonName :: Gen JsonName
genJsonName = JsonName <$> ((:) <$> lower <*> genManyName)

genPascalCaseName :: Gen String
genPascalCaseName = (:) <$> upper <*> genManyName

genClassName :: Gen ClassName
genClassName = ClassName <$> genPascalCaseName

genJsonPropertyElementaryType :: (?classes :: [SomeClass]) => Gen JsonPropertyElementaryType
genJsonPropertyElementaryType = do
  frequency
    ( [(1, pure PNumber), (1, pure PString), (1, pure PDate), (1, PVoid <$> genNumber)]
        <> [(10, PClass <$> element ?classes) | not $ null ?classes]
    )

genTypeModifier :: Gen TypeModifier
genTypeModifier = element [MSingle, MList]

genFieldModifier :: Gen FieldModifier
genFieldModifier = element [MPublic, MPrivate]

genJsonPropertyCompleteType :: (?classes :: [SomeClass]) => Gen JsonPropertyCompleteType
genJsonPropertyCompleteType = do
  _jsonPropertyCompleteType_type <- genJsonPropertyElementaryType
  _jsonPropertyCompleteType_typeModifier <-
    genTypeModifier
      >>= ( \val ->
              pure
                if is (_Ctor @"PVoid") _jsonPropertyCompleteType_type
                  then MSingle
                  else val
          )
  pure JsonPropertyCompleteType{..}

allDifferent :: (Eq a) => [a] -> Bool
allDifferent [] = True
allDifferent (x : xs) = x `notElem` xs && allDifferent xs

genJsonPropertyType :: (?classes :: [SomeClass]) => Gen JsonPropertyType
genJsonPropertyType = do
  -- TODO unique types
  _jsonPropertyType <- Gen.filter (allDifferent . toList) (nonEmpty (constant 1 3) genJsonPropertyCompleteType)
  pure JsonPropertyType{..}

genJsonProperty :: (?classes :: [SomeClass]) => Gen JsonProperty
genJsonProperty = do
  _jsonProperty <- genJsonPropertyType
  pure JsonProperty{..}

-- ---

genUTCTime :: Gen UTCTime
genUTCTime = do
  y <- integral (constant 1970 2100)
  dy <- integral (constant 1 360)
  let utctDay = YearDay y dy
  utctDayTime <- secondsToDiffTime <$> integral (constant 1 86000)
  pure UTCTime{..}

genNumber :: Gen Int
genNumber = integral (constant (-100) 100)

-- TODO generate unicode, exclude special characters
genString :: Gen String
genString = string (constant 0 10) alphaNum

-- TODO void only with MSingle

-- TODO mutate class from type
-- TODO jsonProperty sets the type for field
genClassFieldValue :: (?selectedTypes :: NonEmpty JsonPropertyCompleteType) => Gen ClassFieldCompleteValue
genClassFieldValue = do
  choice $
    ?selectedTypes
      ^.. traversed
        . to
          ( \JsonPropertyCompleteType{..} -> do
              let _classFieldCompleteValue_typeModifier = _jsonPropertyCompleteType_typeModifier
              _classFieldCompleteValue_value <-
                case _jsonPropertyCompleteType_type of
                  PNull -> pure VNull
                  PVoid n -> pure $ VVoid n
                  PNumber -> VNumber <$> genNumber
                  PString -> VString <$> genString
                  PDate -> VDate <$> Gen.maybe genUTCTime
                  PClass c -> pure $ VClass c
              pure ClassFieldCompleteValue{..}
          )

genClassFieldType :: (?selectedTypes :: NonEmpty JsonPropertyCompleteType) => ClassFieldType
genClassFieldType =
  ClassFieldType $
    ?selectedTypes
      ^.. traversed
        . filtered (\t -> isn't (_Ctor @"PVoid") (t ^. #_jsonPropertyCompleteType_type))
        . to
          ( \JsonPropertyCompleteType{..} ->
              let _classFieldCompleteType_modifier = _jsonPropertyCompleteType_typeModifier
                  _classFieldCompleteType_type =
                    case _jsonPropertyCompleteType_type of
                      PNull -> TNull
                      PVoid n -> TVoid n
                      PNumber -> TNumber
                      PString -> TString
                      PDate -> TDate
                      PClass c -> TClass c
               in ClassFieldCompleteType{..}
          )

genClassField :: (?genJsonProperty :: Gen JsonProperty) => Gen ClassField
genClassField = do
  _classField_jsonName <- Gen.maybe genJsonName
  _classField_jsonProperty <- ?genJsonProperty
  _classField_modifier <- genFieldModifier
  _classField_name <- ClassFieldName <$> genCamelCaseName
  let ?selectedTypes = _classField_jsonProperty._jsonProperty._jsonPropertyType
  let _classField_type = genClassFieldType
  _classField_value <- genClassFieldValue
  let _classField_isOptional = is (_Ctor @"VVoid") _classField_value._classFieldCompleteValue_value
  pure ClassField{..}

-- TODO unique class field names

genClassMethodType :: Gen ClassMethodType
genClassMethodType = element [CMString, CMNumber]

genClassMethod :: Gen ClassMethod
genClassMethod = do
  _classMethod_modifier <- genFieldModifier
  _classMethod_name <- genCamelCaseName
  _classMethod_type <- genClassMethodType
  pure ClassMethod{..}

genNamingStrategy :: Gen NamingStrategy
genNamingStrategy = element [SnakeCase, KebabCase, PascalCase]

genJsonObject :: Gen JsonObject
genJsonObject = JsonObject <$> genNamingStrategy

genSomeClass :: (?genJsonProperty :: Gen JsonProperty) => Gen SomeClass
genSomeClass = do
  _someClass_jsonObject <- genJsonObject
  _someClass_name <- genClassName
  _someClass_fields <- nonEmpty (constant 2 5) genClassField
  _someClass_methods <- nonEmpty (constant 2 5) genClassMethod
  pure SomeClass{..}

genClasses :: Int -> Gen [SomeClass] -> Gen (NonEmpty SomeClass)
genClasses 0 cs = fromList . reverse <$> cs
genClasses n cs =
  genClasses
    (n - 1)
    ( do
        cs1 <- cs
        cs2 <- subsequence cs1
        cs3 <-
          let ?genJsonProperty = let { ?classes = cs2 } in genJsonProperty
           in genSomeClass
        pure $ cs3 : cs1
    )

genJsonPropertyForClass :: SomeClass -> JsonProperty
genJsonPropertyForClass c =
  JsonProperty
    { _jsonProperty =
        JsonPropertyType
          { _jsonPropertyType =
              JsonPropertyCompleteType
                { _jsonPropertyCompleteType_type = PClass c
                , _jsonPropertyCompleteType_typeModifier = MSingle
                }
                :| []
          }
    }

genTopClass :: NonEmpty SomeClass -> Gen SomeClass
genTopClass classes = do
  fields <- traverse (\c -> let ?genJsonProperty = pure $ genJsonPropertyForClass c in genClassField) classes
  someClass <-
    let ?genJsonProperty = let { ?classes = [] } in genJsonProperty
     in genSomeClass
  pure someClass{_someClass_fields = fields}
