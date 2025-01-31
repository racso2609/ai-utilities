import * as fs from "fs";
import path from "node:path";
import { assert, describe, suite, test } from "vitest";
import { AiHandler, defaultOllamaHandler } from "./src";

suite("aiHandler", () => {
  describe("Ollama", () => {
    const handler = new AiHandler(defaultOllamaHandler);

    test("context data", async () => {
      const textFilePath = path.join(
        __dirname,
        "test",
        "utils",
        "files",
        "first-steps.md",
      );
      const textFile = fs.readFileSync(textFilePath, "utf8");
      const response = await handler.ask("What is been talked on this file?", {
        contextData: textFile.toString(),
      });

      assert.equal(response.model, "mistral");
      assert.equal(response.response.includes("trading"), true);
    });

    test("image viewer", async () => {
      const imagePath = path.join(
        __dirname,
        "test",
        "utils",
        "files",
        "IMG-valentin-wallet-s1Iq2bRoR6Q-unsplash.jpg",
      );
      const file = fs.readFileSync(imagePath);
      const fileBase64 = file.toString("base64");

      const response = await handler.ask("What is this image?", {
        images: [fileBase64],
      });

      assert.equal(response.model, "llava");
      assert.equal(response.response.includes("city"), true);
    });
  });
});
