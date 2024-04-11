{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedLabels #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE ScopedTypeVariables #-}

module Test where

import AST (SomeClass)
import Control.Lens ((^.))
import Control.Monad (forM_)
import Data.Generics.Labels ()
import Data.Generics.Product ()
import Data.List (intercalate)
import Data.List.NonEmpty
import Data.String.Interpolate (i, __i'L)
import Generate
import Hedgehog.Gen

main :: IO ()
main = forM_ [1 .. 3] $ \(idx :: Int) -> do
  classes <- sample (genClasses 10 (pure []))
  topClass <- sample $ genTopClass classes
  let topClassName = show $ topClass ^. #_someClass_name
  writeFile [i|ts/generated#{idx}.ts|] (makeTS classes topClass topClassName)

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