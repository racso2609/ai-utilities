import { OllamaResponse } from "../../../types/AiHandler/models/ollama";
import {
  AiModel,
  AskConfig,
  AskResponse,
} from "../../../types/AiHandler/repositories";
import { fetcher } from "../../../utils/fetcher";

interface OllamaConfig {
  url: string;
  model: string;
}

export class AiOllamaHandler implements AiModel {
  id = "ollama";
  name = "ollama";
  description = "Ollama AI";

  constructor(private config: Partial<OllamaConfig>) {
    this.config = {
      url: "http://localhost:11434/api",
      model: "mistral",
      ...config,
    };

    this.id = `ollama-${this.config.model}`;
  }

  async ask(
    question: string,
    config: Partial<AskConfig>,
  ): Promise<AskResponse> {
    const url = `/generate`;

    const model =
      config?.images?.length && !config.model
        ? "llava"
        : (config?.model ?? this?.config?.model);

    const body = JSON.stringify({
      prompt: question,
      stream: false,
      ...config,
      model,
    });

    const response = await this._fetcher<OllamaResponse>(url, {
      body,
      method: "POST",
    });

    return {
      context: response.context,
      response: response.response,
      mode: response.model,
    };
  }

  private _fetcher<T>(
    url: `/${string}`,
    initArgs: RequestInit = {},
  ): Promise<T> {
    return fetcher(`${this.config.url}${url}`, {
      ...initArgs,
    });
  }
}

export const defaultOllamaHandler = new AiOllamaHandler({});
