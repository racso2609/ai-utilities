import {
  AiModel,
  AiModelRepository,
  AskConfig,
  AskResponse,
} from "../../types/AiHandler/repositories";

export class AiHandler implements AiModelRepository {
  model: AiModel;

  constructor(model: AiModel) {
    this.model = model;
  }

  async manageContextData(contextData: string) {
    if (!contextData) return undefined;
    const data = await this.model.ask(
      `this is context data: ${contextData}. Dont reply to this message.`,
    );
    return data;
  }

  async ask(
    question: string,
    config: Partial<AskConfig> = {},
  ): Promise<AskResponse> {
    const contextResponse = await this.manageContextData(
      config.contextData || "",
    );

    return this.model.ask(question, {
      ...config,
      context: contextResponse?.context,
    });
  }
}
