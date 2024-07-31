import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import { TuringService } from 'src/turing/turing.service';
import { Message } from 'src/dto/message.dto';
import { Agent } from 'src/dto/agent.dto';

const getGPTAPIKey = () => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OpenAI API key not found");
  }
  return key;
}

@Injectable()
export class OpenaiService {
  private openai: OpenAI = new OpenAI({ apiKey: getGPTAPIKey() });
  constructor(private turingService: TuringService) {}

  async chatCompletion(chat_messages: Array<ChatCompletionMessageParam>, model: string): Promise<string> {
    const completions = await this.openai.chat.completions.create({
      messages: chat_messages,
      model: model,
    });

    const response = completions.choices[0].message.content;
    if (!response) {
      throw new Error("No response from GPT");
    }
    return response;
  }

  async sendGPTRequest(chat_messages: Message[], agent: Agent, other_agents: Agent[]): Promise<string> {
    const messages: Array<ChatCompletionMessageParam> = [
      {
        role: "system",
        content: await this.turingService.generateStarterMessage(agent, other_agents),
      }
    ];
    chat_messages.forEach((message) => {
      const message_role = message.agent.origin === "ChatGPT" ? "assistant" : "user";
      const message_content = `${message.agent.name}: ${message.content}`;
      messages.push({
        role: message_role,
        content: message_content,
      });
    });
    console.log('GPT messages:', messages);
    const response = await this.chatCompletion(messages, "gpt-3.5-turbo");
    console.log(response);
    return response;
  }

}
