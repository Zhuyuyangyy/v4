export const AGENT_NAMES = {
  PROFILE: 'ProfileAgent',
  RESOURCE: 'ResourceAgent',
  PATH: 'PathAgent',
  TUTOR: 'TutorAgent',
  EVALUATION: 'EvaluationAgent',
  REFLECTION: 'ReflectionAgent',
}

export const RESOURCE_TYPES = ['concept', 'example', 'exercise', 'errorTip', 'recommendReason', 'profileEvidence']

export function validateResourceGenerateInput(input) {
  const errors = []
  if (!input || typeof input !== 'object') {
    errors.push('input must be an object')
    return { valid: false, errors }
  }
  if (!input.topic) errors.push('topic is required')
  if (!input.resourceType) errors.push('resourceType is required')
  return { valid: errors.length === 0, errors }
}

export function createAgentResult({ agentName, input, output, confidence, evidence, durationMs, status, fallbackUsed }) {
  return {
    agentName,
    inputSummary: summarize(input),
    outputSummary: summarize(output),
    input,
    output,
    confidence: confidence ?? 0.8,
    evidence: evidence || [],
    durationMs: durationMs ?? 0,
    status: status || 'completed',
    fallbackUsed: fallbackUsed || false,
  }
}

function summarize(obj) {
  if (!obj) return ''
  if (typeof obj === 'string') return obj.slice(0, 200)
  try {
    const json = JSON.stringify(obj)
    return json.length > 300 ? json.slice(0, 300) + '...' : json
  } catch {
    return String(obj).slice(0, 200)
  }
}
