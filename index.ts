// Server entry point. Never import this file from the React frontend.
import {
  APIError,
  AuthenticationError,
  BadInputError,
  CredentialsMissedError,
  NotEnoughCreditsError,
  TimeoutError,
  ValidationError,
  config,
  higgsfield,
} from '@higgsfield/client/v2'

export const MODEL = 'bytedance/seedance-2.5/text-to-video'
export const INPUT = {
  prompt: 'A cinematic scene at sunset',
  duration: 5,
  resolution: '720p',
  aspect_ratio: '16:9',
} as const

type Result = { status: string; video?: { url?: string } }
type Subscribe = (
  model: string,
  options: { input: typeof INPUT; withPolling: true },
) => Promise<Result>

class GenerationOutcomeError extends Error {}

export async function generateExample(subscribe: Subscribe): Promise<string> {
  const result = await subscribe(MODEL, { input: { ...INPUT }, withPolling: true })

  if (result.status !== 'completed') {
    switch (result.status) {
      case 'failed':
        throw new GenerationOutcomeError('A geração falhou; nenhum sucesso foi confirmado.')
      case 'canceled':
      case 'cancelled':
        throw new GenerationOutcomeError('A geração foi cancelada.')
      case 'nsfw':
      case 'moderated':
        throw new GenerationOutcomeError('A geração foi bloqueada pela moderação.')
      default:
        throw new GenerationOutcomeError('A geração não chegou a um estado de conclusão confirmado.')
    }
  }

  const url = result.video?.url
  if (!url) {
    throw new GenerationOutcomeError('A resposta concluída não contém uma URL de vídeo.')
  }
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) {
      throw new Error('Invalid video URL')
    }
  } catch {
    throw new GenerationOutcomeError('A resposta contém uma URL de vídeo inválida.')
  }
  return url
}

// SDK errors can contain HTTP request configuration, including authentication.
// Only fixed messages and numeric HTTP status codes may be displayed.
export function describeFailure(error: unknown): string {
  if (error instanceof GenerationOutcomeError) return error.message
  if (error instanceof AuthenticationError || error instanceof CredentialsMissedError) {
    return 'Autenticação Higgsfield indisponível. Confira HF_CREDENTIALS no ambiente seguro.'
  }
  if (error instanceof NotEnoughCreditsError) {
    return 'A Higgsfield recusou a requisição. Confira permissões e créditos na conta.'
  }
  if (error instanceof BadInputError || error instanceof ValidationError) {
    return 'A Higgsfield recusou os parâmetros da requisição.'
  }
  if (error instanceof TimeoutError) {
    return 'O tempo de espera terminou sem confirmar a conclusão. Confira a requisição no painel antes de gerar novamente.'
  }
  if (error instanceof APIError && Number.isInteger(error.statusCode)) {
    return `A API Higgsfield retornou HTTP ${error.statusCode}; nenhuma geração foi confirmada.`
  }
  return 'Não foi possível confirmar a geração. Confira acesso à API e o estado da requisição no painel.'
}

async function main(): Promise<void> {
  const credentials = process.env.HF_CREDENTIALS?.trim()
  if (!credentials) {
    console.error('HF_CREDENTIALS não configurada. Preencha .env.local localmente ou um vínculo seguro; nenhuma requisição foi enviada.')
    process.exitCode = 1
    return
  }
  const parts = credentials.split(':')
  if (parts.length !== 2 || parts.some((part) => !part.trim())) {
    console.error('HF_CREDENTIALS deve estar no formato key-id:key-secret. O valor não será exibido; nenhuma requisição foi enviada.')
    process.exitCode = 1
    return
  }

  try {
    // Disable POST retries to avoid creating another billable request after an
    // ambiguous network failure. Polling remains enabled through subscribe.
    config({ credentials, maxRetries: 0, maxPollTime: 10 * 60 * 1000 })
    console.error('Enviando uma geração paga e aguardando o resultado da Higgsfield...')
    const url = await generateExample(higgsfield.subscribe)
    console.log(url)
  } catch (error) {
    console.error(describeFailure(error))
    process.exitCode = 1
  }
}

// Importing this module for tests must never submit a generation.
if (import.meta.main) await main()
