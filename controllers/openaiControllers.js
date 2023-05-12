// openai functions in here..
// https://platform.openai.com/docs/guides/images/usage?lang=node.js
// https://github.com/openai/openai-node

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const { prompt , size } = req.body;
    
    const imageSize = size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

    try {
        const response = await openai.createImage({
            prompt,
            n: 1, 
            size: imageSize
        });
        const imageUrl = response.data.data[0].url;
        res.status(200).json({
            success: true,
            imageUrl
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({
            success: false,
            error: "We could not generate that image"
        })
    }
};

const askquestion = async (req, res) => {
    const { question, instructions } = req.body;

    //role field is an enum --> "user", "assistant", "system"

    //in this simple api powered by OpenAI we will not use the assistant role
    //in a frontend next app or ui, you could direcly call the OpenAI API and include the assistant.. persist assistant and user conversation in hooks
    
    //here are some "system" content examples that will gently instruct the "assistant":
    //"You are a helpful assistant"
    //"You are a helpful assistant. Respond in 15 words"   
    //"You are a helpful assistant. Respond in Spanish"
    //"You are a ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Knowledge cutoff: <KNOWLEDGE_CUTOFF> Current date: <CURRENT_DATE>"
    
    //TODO: lookup prompt engineering ideas cookbook
    //TODO: see tiktoken lib to limit input as api key is charged on input and output token calculation

    const chatInstructions = instructions ?? "You are a helpful assistant. Respond in 15 words in Swahili";


    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: chatInstructions}, { role: "user", content: question}], 
            n: 10, //tokens
        });

        const answer = response.data.choices[0].message.content;
        res.status(200).json({
            success: true,
            answer
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({
            success: false,
            error: "We could not generate an answer to that"
        })
    }
};

module.exports = { generateImage, askquestion };
