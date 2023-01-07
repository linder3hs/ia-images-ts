import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import type { ImagesResponse } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface ImageError {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImagesResponse | ImageError>
) {
  if (!configuration.apiKey) {
    return res.status(500).json({
      message: "some error",
    });
  }

  const response = await openai.createImage({
    prompt: req.query.name as string,
    n: 10,
    size: "256x256",
    response_format: "url",
  });

  res.status(200).json(response.data);
}
