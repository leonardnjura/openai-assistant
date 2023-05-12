# openai-assistant
#### What?
An Express API based on ChatGPT's OpenAI that generates a requested image with specified resolution. It also answers questions generally or specifically if given instructions.

#### Setup
Get an OpenAI api key and setup .env
npm i 
npm run dev

#### Endpoints
```
1. {{url}}/api/v1/openai/askquestion

SAMPLE REQ

{
    "instructions": "You are a helpful assistant. Respond in 15 words in Swahili",
    "question": "When is Winter in Spain? I need to avoid it at all costs"
}

SAMPLE RES
{
    "success": true,
    "answer": "Msimu wa baridi huanza mwezi Desemba hadi Februari nchini Hispania. Jihadhari nayo."
}

2. {{url}}/api/v1/openai/generateimage
```
Navigate to routes/requests dir for sample rest requests
