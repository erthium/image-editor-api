import { Injectable } from '@nestjs/common';


const getAPIKey = () => {
    const api_key = process.env.STABILITY_API_KEY;
    if (api_key === undefined) {
        throw new Error("Stability API Key is missing!");
    }
    const pattern = new RegExp("sk-[a-zA-Z0-9]{48}");
    if (!pattern.test(api_key)) {
        throw new Error("Stability API Key is not valid!");
    }
    return api_key;
}


// const testPrompt: string = 'Style the image as if the people in the image are in a pixar animation movie';

/*
"invalid mime type for init_image: text/plain; 
charset=utf-8 is not image/jpeg, image/png, image/gif, or image/webp"
*/

@Injectable()
export class AiService {

    async testKey() {
        getAPIKey();
    }


    async postImage(image64: File, prompt: string) {
        const url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image";
        const formData = new FormData();
        formData.append('init_image', image64);
        formData.append('init_image_mode', "IMAGE_STRENGTH");
        formData.append('image_strength', '0.35');
        formData.append('steps', '40');
        formData.append('seed', '0');
        formData.append('cfg_scale', '5');
        formData.append('samples', '1');
        formData.append('text_prompts[0][text]', prompt)
        formData.append('text_prompts[0][weight]', '1');
        formData.append('text_prompts[1][text]', 'blurry, bad')
        formData.append('text_prompts[1][weight]', '-1');
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${getAPIKey()}`,
            },
            body: formData,
        };
        const response = await fetch(url, options);
        return response.json();
    }


    /*
    async postImage(image64: string, prompt: string) {
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
                prompt: prompt,
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
    */
}
