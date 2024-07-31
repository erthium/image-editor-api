import { Agent } from "./agent.dto";

export interface Message {
  agent: Agent;
  content: string;
  createdAt: Date;
}
