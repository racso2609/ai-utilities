export type AskResponse = {
  response: string;
  context: number[];
  model: string;
};

export type AskConfig = {
  // context information
  contextData: string;
  // ollama context to keep the same convertation context
  context: number[];
  json: boolean;
  suffix: string;
  images: string[];
  model: string;
};

export interface AiModelRepository {
  ask(question: string, config?: Partial<AskConfig>): Promise<AskResponse>;
}

export interface AiModel extends AiModelRepository {
  id: string;
  name: string;
  description: string;
}
