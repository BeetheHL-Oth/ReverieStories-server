const OpenAI = require('openai')

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
})

async function generateChatResponse({ characterDescription, messages = [] }) {
  try {
    const formattedMessages = [
      {
        role: 'system',
        content: `
        You are roleplaying as: ${characterDescription}
        
        Rules:
        - Stay fully in character
        - Never break character
        - Respond conversationally
        `
      },
      ...messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ]

    const response = await client.chat.completions.create({
      model:'llama-3.1-8b-instant',
      messages: formattedMessages,
      temperature: 0.8,
      max_tokens: 300
    })

    return response.choices[0].message.content

  }
  catch (error) {
    console.log(error.response?.data || error.message)
    throw error
  }
}

module.exports = generateChatResponse