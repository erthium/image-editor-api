import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const getAPIKey = () => {
    const api_key = process.env.GET_IMG_API_KEY;
    if (api_key === undefined) {
        throw new Error("getimg.ai API Key is missing!");
    }
    const pattern = new RegExp("key-[a-zA-Z0-9]{96}");
    if (!pattern.test(api_key)) {
        throw new Error("getimg.ai API Key is not valid!");
    }
    return api_key;
}


const testPrompt: string = 'Style the image as if the people in the image are in a pixar animation movie';


@Injectable()
export class AiService {

    static testKey = async () => {
        getAPIKey();
    }

    static postImage = async (image64: string) => {
        // get the image is ./local_assets/test_utku.png
        /*
        const test_path = '/home/erthium/Projects/image-editor-api/local_assets/utku_converted.png';
        const test_image = fs.readFileSync(test_path, 'base64');
        */
        const url = 'https://api.getimg.ai/v1/latent-consistency/image-to-image';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${getAPIKey()}`,
            },            
            body: JSON.stringify({
                model: 'lcm-realistic-vision-v5-1',
                prompt: testPrompt,
                //negative_prompt: 'Disfigured, cartoon, blurry',
                //prompt_2: 'a photo of an astronaut riding a horse on mars',
                //negative_prompt_2: 'Disfigured, cartoon, blurry',
                image: image64,
                strength: 0.15,
                steps: 6,
                //guidance: 15,
                //seed: 2024,
                //scheduler: 'dpmsolver++',
                output_format: 'png'
            })
        };
        const response = await fetch(url, options);
        return response.json();
    }

}

/* request

const fetch = require('node-fetch');

const url = 'https://api.getimg.ai/v1/stable-diffusion-xl/image-to-image';
const options = {
  method: 'POST',
  headers: {accept: 'application/json', 'content-type': 'application/json'},
  body: JSON.stringify({
    model: 'stable-diffusion-xl-v1-0',
    prompt: 'a photo of an astronaut riding a horse on mars',
    negative_prompt: 'Disfigured, cartoon, blurry',
    prompt_2: 'a photo of an astronaut riding a horse on mars',
    negative_prompt_2: 'Disfigured, cartoon, blurry',
    image: '...looooong base64 encoded image string...',
    strength: 0.5,
    steps: 50,
    guidance: 7.5,
    seed: 0,
    scheduler: 'euler',
    output_format: 'jpeg'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

*/

/* response

{
  "image": "...looooong base64 encoded image string...",
  "seed": 42,
  "cost": 0.00663552
}

*/
