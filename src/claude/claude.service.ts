import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { MessageParam } from '@anthropic-ai/sdk/resources';

import { TuringService } from 'src/turing/turing.service';
import { Message } from 'src/dto/message.dto';
import { Agent } from 'src/dto/agent.dto';

const getClaudeAPIKey = () => {
  const key = process.env.CLAUDE_API_KEY;
  if (!key) {
    throw new Error("Claude API key not found");
  }
  return key;
}


@Injectable()
export class ClaudeService {
  private anthropic: Anthropic = new Anthropic({apiKey: getClaudeAPIKey()});
  constructor(private turingService: TuringService) {}

  async getClaudeMessage(chat_messages: Message[], agent: Agent, other_agents: Agent[]): Promise<string> {
    const messages: Array<MessageParam> = [
      {
        role: "user",
        content: await this.turingService.generateStarterMessage(agent, other_agents),
      }
    ];
    chat_messages.forEach((message) => {
      const message_role = message.agent.name === agent.name ? "assistant" : "user";
      const message_content = `${message.agent.name}: ${message.content}`;
      messages.push({
        role: message_role,
        content: message_content,
      });
    });
    const response = await this.anthropic.messages.create({
      messages: messages,
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
    });
    if (response.content[0].type !== "text") {
      throw new Error("Unexpected response from Claude");
    }
    const stripped_message = await this.turingService.stripCharacterName(response.content[0].text, agent);
    console.log(stripped_message);
    return stripped_message;
  }

  async getClaudeGuess(chat_messages: Message[], agent: Agent, other_agents: Agent[]): Promise<string> {
    const messages: Array<MessageParam> = [
      {
        role: "user",
        content: await this.turingService.generateStarterMessage(agent, other_agents),
      }
    ];
    chat_messages.forEach((message) => {
      const message_role = message.agent.name === agent.name ? "assistant" : "user";
      const message_content = `${message.agent.name}: ${message.content}`;
      messages.push({
        role: message_role,
        content: message_content,
      });
    });
    messages.push({
      role: "user",
      content: "Now, the conversation is over. Please guess who is the human is. Only give the name of the character you guess, nothing else.",
    })
    const response = await this.anthropic.messages.create({
      messages: messages,
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
    });
    if (response.content[0].type !== "text") {
      throw new Error("Unexpected response from Claude");
    }
    const stripped_message = await this.turingService.stripCharacterName(response.content[0].text, agent);
    console.log(stripped_message);
    return stripped_message;
  }

}
