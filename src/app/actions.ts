'use server';

import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

// Set the path to the ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

interface FormState {
  success: boolean;
  error?: string | null;
  base64?: string | null;
  title?: string | null;
}

export async function convertUrl(prevState: FormState, formData: FormData): Promise<FormState> {
  const url = formData.get('url') as string;

  if (!url || !ytdl.validateURL(url)) {
    return { success: false, error: 'Invalid YouTube URL provided. Please enter a valid URL.' };
  }

  try {
    const info = await ytdl.getInfo(url);
    // Sanitize title for filename
    const title = (info.videoDetails.title.replace(/[^\w\s-]/gi, '').trim() || 'audio');

    const audioStream = ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
    });

    const conversionPromise = new Promise<Buffer>((resolve, reject) => {
      const chunks: any[] = [];
      const converter = ffmpeg(audioStream)
        .audioBitrate(192)
        .toFormat('mp3')
        .on('error', (err) => {
          console.error('FFmpeg error:', err.message);
          reject(new Error('Failed during the conversion process.'));
        })
        .on('end', () => {
          resolve(Buffer.concat(chunks));
        });
      
      const stream = converter.stream();
      stream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      stream.on('error', (err) => {
          reject(err);
      });
    });

    const buffer = await conversionPromise;
    const base64 = buffer.toString('base64');

    return {
      success: true,
      base64,
      title: `${title}.mp3`,
    };
  } catch (error: any) {
    console.error('Conversion Action Error:', error.message);
    if (error.message.includes('private')) {
        return { success: false, error: 'This video is private and cannot be converted.' };
    }
    return { success: false, error: 'Failed to process the video. It might be unavailable or region-locked.' };
  }
}
