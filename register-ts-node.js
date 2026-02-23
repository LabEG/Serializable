import {register} from "node:module";
import {pathToFileURL} from "node:url";
import "reflect-metadata";

register("ts-node/esm", pathToFileURL("./"));
