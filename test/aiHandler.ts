import test, { describe, suite } from "node:test";
import * as assert from "node:assert";
import * as fs from "fs";
import { AiHandler } from "../src/client/AiHandler";
import { defaultOllamaHandler } from "../src/client/AiHandler/Models/OllamaHandler";

suite("aiHandler", () => {
  describe("Ollama", () => {
    const handler = new AiHandler(defaultOllamaHandler);

    test("context data", async () => {
      const textFilePath = `/home/racso/notes/personal/Trading/first-steps.md`;
      const textFile = fs.readFileSync(textFilePath, "utf8");
      const response = await handler.ask("What is been talked on this file?", {
        contextData: textFile.toString(),
      });

      assert.equal(response.model, "mistral");
      assert.equal(response.response.includes("trading"), true);
    });

    test("image viewer", async () => {
      const imagePath = `/home/racso/wallpapers/IMG-valentin-wallet-s1Iq2bRoR6Q-unsplash.jpg`;
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
