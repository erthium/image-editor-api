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

  @Post('gpt')
  async getGptResponse(@Body() data: any): Promise<any> {
    try {
      console.log('GPT request data:', data);
      const messages: Message[] = data.messages;
      const agent: Agent = data.agent;
      const other_agents: Agent[] = data.other_agents;
      console.log('GPT request messages:', messages);
      console.log('GPT request agent:', agent);
      console.log('GPT request other_agents:', other_agents);
      const response = await this.openaiService.sendGPTRequest(messages, agent, other_agents);
      return { text: response };
    } catch (error) {
      console.error('GPT response error:', error);
      return { error: 'Error getting GPT response' };
    }
  }

  @Post('gemini')
  async getGeminiResponse(@Body() data: any): Promise<any> {
    try {
      console.log('Gemini request data:', data);
      const messages: Message[] = data.messages;
      const agent: Agent = data.agent;
      const other_agents: Agent[] = data.other_agents;
      console.log('Gemini request messages:', messages);
      console.log('Gemini request agent:', agent);
      console.log('Gemini request other_agents:', other_agents);
      const response = await this.geminiService.sendGeminiRequest(messages, agent, other_agents);
      return { text: response };
    } catch (error) {
      console.error('Gemini response error:', error);
      return { error: 'Error getting Gemini response' };
    }
  }

}
