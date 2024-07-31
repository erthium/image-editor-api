import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from "@google/generative-ai";

import { TuringService } from 'src/turing/turing.service';
import { Message } from 'src/dto/message.dto';
import { Agent } from 'src/dto/agent.dto';

const getGeminiAPIKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("Gemini API key not found");
  }
  return key;
}

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI = new GoogleGenerativeAI(getGeminiAPIKey());
  constructor(private turingService: TuringService) {}

  async sendGeminiRequest(chat_messages: Message[], agent: Agent, other_agents: Agent[]): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const prompt = await this.turingService.mergeChatHistory(chat_messages, agent, other_agents);
    console.log('Gemini prompt:', prompt);
    const response = await model.generateContent(prompt);
    return response.response.text();
  }

}
