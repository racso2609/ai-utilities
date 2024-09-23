import { AiHandler } from "./client/AiHandler";
import { defaultOllamaHandler } from "./client/AiHandler/Models/OllamaHandler";
import * as fs from "fs";

const handler = new AiHandler(defaultOllamaHandler);

const textFilePath = `/home/racso/notes/personal/Trading/first-steps.md`;
const textFile = fs.readFileSync(textFilePath, "utf8");

handler
  .ask("What is been talked on this file?", {
    contextData: textFile.toString(),
  })
  .then(console.log);
