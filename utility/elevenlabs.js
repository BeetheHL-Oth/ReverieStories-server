const axios = require('axios');

const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';
const DEFAULT_VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb';
const DEFAULT_MODEL_ID = 'eleven_multilingual_v2';

async function textToSpeech({
  text,
  voiceId = DEFAULT_VOICE_ID,
  modelId = DEFAULT_MODEL_ID,
}) {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw {
      name: 'elevenLabsError',
      message: 'ELEVENLABS_API_KEY is not set',
    };
  }

  try {
    const response = await axios.post(
      `${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        text,
        model_id: modelId,
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        responseType: 'arraybuffer',
      },
    );

    return Buffer.from(response.data);
  } catch (error) {
    const apiMessage =
      error.response?.data?.detail?.message ||
      error.response?.data?.detail ||
      error.message;

    throw {
      name: 'elevenLabsError',
      message: apiMessage || 'Failed to generate speech',
    };
  }
}

module.exports = textToSpeech;
