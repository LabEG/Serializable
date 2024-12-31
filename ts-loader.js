import {register} from "node:module";
import {pathToFileURL} from "node:url";
import "reflect-metadata";

register("@swc-node/register/esm", pathToFileURL("./"));
