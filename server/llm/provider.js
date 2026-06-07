const LLM_API_URL = process.env.LLM_API_URL || ''
const LLM_API_KEY = process.env.LLM_API_KEY || ''
const LLM_MODEL = process.env.LLM_MODEL || 'generalv3.5'

export function isLlmAvailable() {
  return Boolean(LLM_API_URL && LLM_API_KEY)
}

export function getLlmConfig() {
  return { apiUrl: LLM_API_URL, apiKey: LLM_API_KEY, model: LLM_MODEL }
}

export async function callLlm(systemPrompt, userPrompt, options = {}) {
  const { temperature = 0.7, maxTokens = 2048 } = options

  if (!isLlmAvailable()) {
    return { content: null, fallbackUsed: true, error: null }
  }

  try {
    const response = await fetch(LLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return { content: null, fallbackUsed: true, error: `LLM API error ${response.status}: ${errorText}` }
    }

    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content || data?.data?.text || null
    return { content, fallbackUsed: false, error: null }
  } catch (error) {
    return { content: null, fallbackUsed: true, error: error.message }
  }
}

export function safeParseJson(text) {
  if (!text) return null
  try {
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    return null
  }
}
