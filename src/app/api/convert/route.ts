import { NextResponse } from 'next/server';
import play from 'play-dl';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { PassThrough } from 'stream';

// Set the path for fluent-ffmpeg
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export async function POST(req: Request) {
  try {
    const { youtubeURL } = await req.json();

    // Validate the URL using play-dl
    const validation = await play.validate(youtubeURL);
    if (validation !== 'yt_video') {
      return NextResponse.json(
        { success: false, error: "Invalid or missing YouTube URL." },
        { status: 400 }
      );
    }

    // Get video info to name the file
    const info = await play.video_info(youtubeURL);
    const videoTitle = info.video_details.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'audio';

    // Get the audio stream
    const stream = await play.stream(youtubeURL, {
      discordPlayerCompatibility: true,
      quality: 2 // 0=lowest, 1=low, 2=high
    });

    // Create a pass-through stream to handle the data flow for ffmpeg
    const passThrough = new PassThrough();

    // Start the conversion
    ffmpeg(stream.stream)
      .audioBitrate(192)
      .format('mp3')
      .on('error', (err) => {
        console.error('FFMPEG Error:', err);
        passThrough.end();
      })
      .pipe(passThrough);

    // Set the headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'audio/mpeg');
    headers.set('Content-Disposition', `attachment; filename="${videoTitle}.mp3"`);

    // Return the stream as the response
    return new NextResponse(passThrough as any, { headers });

  } catch (error) {
    console.error('Conversion Error:', error);
    return NextResponse.json(
      { success: false, error: "Conversion Failed. This video may be unavailable or has been removed." },
      { status: 500 }
    );
  }
}
