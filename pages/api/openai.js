const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const openaiAPI = async (req, res) => {
  let prompt = req.body.code;
  try {
    const gptResponse = await openai.createCompletion("text-davinci-002", {
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 182,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: "err" });
  }
};

export default openaiAPI;
