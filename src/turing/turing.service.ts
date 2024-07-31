import { Injectable } from '@nestjs/common';

import { Agent } from 'src/dto/agent.dto';
import { Message } from 'src/dto/message.dto';

@Injectable()
export class TuringService {
  async generateStarterMessage(agent: Agent, other_agents: Agent[]) {
    return `You are in a game of Reverse Turing Test. You are ${agent.name}. You will be asked questions and you will answer them according to your character. You will be playing against an another AI model and a human; who are ${other_agents[0].name} and ${other_agents[1].name} but you do not know which one is human. You will be chatting with them. After 15 messages, you will guess who is the human. Now, start acting and talking like ${agent.name}.`;
  }

  async mergeChatHistory(messages: Message[], agent: Agent, other_agents: Agent[]) {
    let chat: string = "";
    chat += await this.generateStarterMessage(agent, other_agents);
    chat += "\n Below is the chat history: \n";
    messages.forEach((message) => {
      chat += `${message.agent.name}: ${message.content}\n`;
    })
    chat += "Now, it's your turn to respond. \n";
    return chat;
  } 
}
