import algoliasearch from "algoliasearch/lite";
import { appId, readKey } from "./constants";

export const searchClient = algoliasearch(appId, readKey);