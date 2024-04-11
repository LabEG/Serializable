{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedLabels #-}
{-# LANGUAGE QuasiQuotes #-}

module Test where

import AST (SomeClass)
import Control.Lens ((^.))
import Data.Generics.Labels ()
import Data.Generics.Product ()
import Data.List (intercalate)
import Data.List.NonEmpty
import Data.String.Interpolate (__i'L)
import Generate
import Hedgehog.Gen

main :: IO ()
main = do
  classes <- sample (genClasses 10 (pure []))
  topClass <- sample $ genTopClass classes
  let topClassName = show $ topClass ^. #_someClass_name
  writeFile "ts/generated.ts" (makeTS classes topClass topClassName)

makeTS :: NonEmpty SomeClass -> SomeClass -> String -> String
makeTS classes topClass topClassName =
  [__i'L|
    import 'reflect-metadata'
    import {
        jsonObject,
        jsonProperty,
        jsonName,
        Serializable,
        SnakeCaseNamingStrategy,
        KebabCaseNamingStrategy,
        PascalCaseNamingStrategy
    } from "../../../src/index.ts";
    import { writeFileSync } from 'fs';
    import { join } from 'path';
    #{"\n\n" <> intercalate "\n\n" (toList $ (show <$> (classes <> (topClass :| []))))}

    export const TestClass = #{topClassName}
  |]