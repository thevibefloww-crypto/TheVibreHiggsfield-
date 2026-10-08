import assert from 'node:assert/strict'
import test from 'node:test'
import { APIError, AuthenticationError, TimeoutError } from '@higgsfield/client/v2'
import { describeFailure, generateExample } from '../index.ts'

const VIDEO_URL = 'https://example.test/generated-video.mp4'

test('submits the requested model and input, waits, and returns the completed video URL', async () => {
  let calls = 0
  const url = await generateExample(async (model, options) => {
    calls++
    assert.equal(model, 'bytedance/seedance-2.5/text-to-video')
    assert.deepEqual(options, {
      input: {
        prompt: 'A cinematic scene at sunset',
        duration: 5,
        resolution: '720p',
        aspect_ratio: '16:9',
      },
      withPolling: true,
    })
    return { status: 'completed', video: { url: VIDEO_URL } }
  })
  assert.equal(calls, 1)
  assert.equal(url, VIDEO_URL)
})

for (const status of ['failed', 'canceled', 'cancelled', 'nsfw', 'moderated', 'queued', 'in_progress', 'unknown']) {
  test(`never returns a video URL for ${status}, even when a URL is present`, async () => {
    await assert.rejects(generateExample(async () => ({ status, video: { url: VIDEO_URL } })))
  })
}

test('rejects completed results with no video URL', async () => {
  await assert.rejects(generateExample(async () => ({ status: 'completed' })), /não contém uma URL/)
})

test('rejects malformed, insecure, or credential-bearing video URLs', async () => {
  for (const url of ['invalid', 'http://example.test/video.mp4', 'https://user:password@example.test/video.mp4']) {
    await assert.rejects(generateExample(async () => ({ status: 'completed', video: { url } })), /inválida/)
  }
})

test('does not retry rejected submissions', async () => {
  let calls = 0
  await assert.rejects(generateExample(async () => {
    calls++
    throw new Error('Network failure')
  }))
  assert.equal(calls, 1)
})

test('error reporting excludes raw SDK errors, response bodies, and request configuration', () => {
  const sentinel = 'sensitive-data-must-not-appear'
  const errors = [
    new Error(sentinel),
    new AuthenticationError(sentinel),
    new APIError(sentinel, 500, { detail: sentinel }),
    new TimeoutError(sentinel),
  ]
  for (const error of errors) assert.ok(!describeFailure(error).includes(sentinel))
  assert.match(describeFailure(errors[2]), /HTTP 500/)
})
