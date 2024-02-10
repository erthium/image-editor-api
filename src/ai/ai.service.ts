import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import fs from 'fs';

const getAPIKey = () => {
    const api_key = process.env.OPENAI_API_KEY;
    if (api_key === undefined) {
        throw new Error("OpenAI API Key is missing!");
    }
    const pattern = new RegExp("sk-[a-zA-Z0-9]{48}");
    if (!pattern.test(api_key)) {
        throw new Error("OpenAI API Key is not valid!");
    }
    return api_key;
}

@Injectable()
export class AiService {

    static testKey = async () => {
        const openai = new OpenAI({
            apiKey: getAPIKey()
        });
    }

    static askQuestion = async (question: string) => {

        const openai = new OpenAI({
            apiKey: getAPIKey(),
            //dangerouslyAllowBrowser: true
        });

        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }]
        });

        return gptResponse.choices[0].message.content || "Something went wrong";
    }


    static askInStream = async (question: string, callBack: (input: string | null | undefined) => void) => {
        
        const openai = new OpenAI({
            apiKey: getAPIKey(),
            //dangerouslyAllowBrowser: true
        });

        const gptStream = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [{ role: 'user', content: question }]
        });

        let index = 0;
        for await (const chunk of gptStream) {
            callBack(chunk.choices[0]?.delta?.content);
            console.log(index + "|| " + chunk.choices[0]?.delta?.content + " ||")
            index++;
        }
    }


    static modifyImage = async (imagePath: string, prompt: string): Promise<string> => {
        const openai = new OpenAI({
            apiKey: getAPIKey(),
            //dangerouslyAllowBrowser: true
        });

        const gptResponse = await openai.images.edit({
            image: fs.createReadStream(imagePath),
            prompt: prompt,
            response_format: 'url',
            model: 'dall-e-2',
            size: '512x512'
        });

        const imageUrl: string = gptResponse.data[0].url;

        return imageUrl;
    }

}


/*
export interface ImageEditParams {
  image: Uploadable;
  prompt: string;
  mask?: Uploadable;
  model?: (string & {}) | 'dall-e-2' | null;
  n?: number | null;
  response_format?: 'url' | 'b64_json' | null;
  size?: '256x256' | '512x512' | '1024x1024' | null;
  user?: string;
}
*/


/*
export type RequestOptions<Req = unknown | Record<string, unknown> | Readable> = {
  method?: HTTPMethod;
  path?: string;
  query?: Req | undefined;
  body?: Req | null | undefined;
  headers?: Headers | undefined;

  maxRetries?: number;
  stream?: boolean | undefined;
  timeout?: number;
  httpAgent?: Agent;
  signal?: AbortSignal | undefined | null;
  idempotencyKey?: string;

  __binaryResponse?: boolean | undefined;
  __streamClass?: typeof Stream;
};
*/



/* gptResponse format for chat.completions.create
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
        "role": "assistant"
      },
      "logprobs": null
    }
  ],
  "created": 1677664795,
  "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
  "model": "gpt-3.5-turbo-0613",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 17,
    "prompt_tokens": 57,
    "total_tokens": 74
  }
}
*/
