import { Injectable } from '@nestjs/common';
import { File } from 'buffer';

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


@Injectable()
export class AiService {

    async testKey() {
        getAPIKey();
    }


    async postImage(image64: File, promptData: any) {
        const url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image";
        const formData = new FormData();
        formData.append('init_image', image64);
        formData.append('init_image_mode', "IMAGE_STRENGTH");
        formData.append('image_strength', promptData.strength);
        formData.append('steps', '50');
        //formData.append('seed', '0');
        formData.append('cfg_scale', '24');
        formData.append('samples', '1');
        if (promptData.style_preset.length > 0) {
            formData.append('style_preset', promptData.style_preset);
        }
        formData.append('text_prompts[0][text]', promptData.prompt)
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
}
