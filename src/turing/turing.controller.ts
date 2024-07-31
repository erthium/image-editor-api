import { Controller, Post, Body } from '@nestjs/common';

import { GeminiService } from 'src/gemini/gemini.service';
import { OpenaiService } from 'src/openai/openai.service';
import { Message } from 'src/dto/message.dto';
import { Agent } from 'src/dto/agent.dto';


@Controller('turing')
export class TuringController {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly geminiService: GeminiService,
  ) {}

  @Post('gpt/message')
  async getGptResponse(@Body() data: any): Promise<any> {
    try {
      const messages: Message[] = data.messages;
      const agent: Agent = data.agent;
      const other_agents: Agent[] = data.other_agents;
      const response = await this.openaiService.getGPTMessage(messages, agent, other_agents);
      return { text: response };
    } catch (error) {
      console.error('GPT response error:', error);
      return { error: 'Error getting GPT response' };
    }
  }

  @Post('gpt/guess')
  async getGptGuess(@Body() data: any): Promise<any> {
    try {
      const messages: Message[] = data.messages;
      const agent: Agent = data.agent;
      const other_agents: Agent[] = data.other_agents;
      const response = await this.openaiService.getGPTGuess(messages, agent, other_agents);
      return { text: response };
    } catch (error) {
      console.error('GPT response error:', error);
      return { error: 'Error getting GPT response' };
    }
  }

  @Post('gemini/message')
  async getGeminiResponse(@Body() data: any): Promise<any> {
    try {
      const messages: Message[] = data.messages;
      const agent: Agent = data.agent;
      const other_agents: Agent[] = data.other_agents;
      const response = await this.geminiService.getGeminiMessage(messages, agent, other_agents);
      return { text: response };
    } catch (error) {
      console.error('Gemini response error:', error);
      return { error: 'Error getting Gemini response' };
    }
  }

  @Post('gemini/guess')
  async getGeminiGuess(@Body() data: any): Promise<any> {
    try {
      const messages: Message[] = data.messages;
      const agent: Agent = data.agent;
      const other_agents: Agent[] = data.other_agents;
      const response = await this.geminiService.getGeminiGuess(messages, agent, other_agents);
      return { text: response };
    } catch (error) {
      console.error('Gemini response error:', error);
      return { error: 'Error getting Gemini response' };
    }
  }

}
