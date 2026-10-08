// Server-only entry point; running this command submits a billable request.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { config, higgsfield } from '@higgsfield/client/v2'
import { describeFailure } from '../index.ts'

const model = 'higgsfield/genjutsu/motion-transfer/v1.0'
const localDirectory = new URL('../referencias/genjutsu.local/', import.meta.url)
const prompt = 'Preserve the facial identity, copper-red hair, original olive-gray dress, beige platform heels, checkerboard clutch, black sports car and brick-townhouse setting from the reference image. Follow the source video motion, camera movement and timing. Keep the crimson glowing eyes and dark red aura. Include the translucent temporal duplicates and optical background distortion from the source video, then merge back into a single woman. Photorealistic cinematic visual effects, coherent anatomy, no birds, no text or watermark.'

function storedUrl(filename: string, field: string): string | undefined {
  try {
    const data = JSON.parse(readFileSync(new URL(filename, localDirectory), 'utf8')) as Record<string, unknown>
    return typeof data[field] === 'string' ? data[field] : undefined
  } catch {
    return undefined
  }
}

function validUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password
  } catch {
    return false
  }
}

async function main(): Promise<void> {
  const imageUrl = process.env.GENJUTSU_IMAGE_URL ?? storedUrl('image-result.json', 'public_url')
  const videoUrl = process.env.GENJUTSU_VIDEO_URL ?? storedUrl('motion-result.json', 'video_url')
  if (!imageUrl || !videoUrl || !validUrl(imageUrl) || !validUrl(videoUrl)) {
    console.error('Genjutsu precisa de uma imagem enviada com sucesso e de um vídeo de movimento em URLs HTTPS. Nenhuma geração foi enviada.')
    process.exitCode = 1
    return
  }
  const credentials = process.env.HF_CREDENTIALS?.trim()
  if (!credentials) {
    console.error('HF_CREDENTIALS não configurada no ambiente privado. Nenhuma geração foi enviada.')
    process.exitCode = 1
    return
  }
  try {
    config({ credentials, maxRetries: 0, maxPollTime: 600000 })
    console.error('Enviando uma geração paga de Genjutsu e aguardando a conclusão...')
    const result = await higgsfield.subscribe(model, {
      input: { prompt, video_url: videoUrl, image_urls: [imageUrl], resolution: '720p' },
      withPolling: true,
    })
    if (result.status !== 'completed' || !result.video?.url || !validUrl(result.video.url)) {
      console.error('Genjutsu não retornou um vídeo concluído com URL válida. Nenhum sucesso foi confirmado.')
      process.exitCode = 1
      return
    }
    mkdirSync(localDirectory, { recursive: true })
    writeFileSync(new URL('result.json', localDirectory), JSON.stringify({
      model,
      status: result.status,
      request_id: result.request_id,
      video_url: result.video.url,
    }, null, 2), { mode: 0o600 })
    console.log(result.video.url)
  } catch (error) {
    console.error(describeFailure(error))
    process.exitCode = 1
  }
}

if (import.meta.main) await main()
