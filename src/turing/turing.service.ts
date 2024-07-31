import { Injectable } from '@nestjs/common';

import { Agent } from 'src/dto/agent.dto';
import { Message } from 'src/dto/message.dto';

@Injectable()
export class TuringService {
  async generateStarterMessage(agent: Agent, other_agents: Agent[]) {
    return `You are in a game of Reverse Turing Test. You are ${agent.name}. You will be asked questions and you will answer them according to your character. You will be playing against an another AI model and a human; who are ${other_agents[0].name} and ${other_agents[1].name} but you do not know which one is human. You will be chatting with them. After some messages, you will guess who is the human. Notes; do not put your name or your characters name at the start of your message, just give me the message you would like to say. Give around 3 sentences long answers. Do not use a language too complicated and far awat from daily language, act like this is a daily conversation of humans. Now, start acting and talking like ${agent.name}.`;
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
