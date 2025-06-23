import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { PassThrough } from 'stream';

// Set the path for fluent-ffmpeg to find the ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export async function POST(req: NextRequest) {
  try {
    const { youtubeURL } = await req.json();

    if (!youtubeURL || !ytdl.validateURL(youtubeURL)) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing YouTube URL." },
        { status: 400 }
      );
    }

    // Get video info to name the file
    const info = await ytdl.getInfo(youtubeURL);
    const videoTitle = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize filename

    // Create a pass-through stream to handle the data flow
    const stream = new PassThrough();

    // Start the conversion
    ffmpeg(ytdl(youtubeURL, { quality: 'highestaudio', filter: 'audioonly' }))
      .audioBitrate(192)
      .format('mp3')
      .on('error', (err) => {
        console.error('FFMPEG Error:', err);
        stream.destroy(err);
      })
      .pipe(stream);

    // Set the headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'audio/mpeg');
    headers.set('Content-Disposition', `attachment; filename="${videoTitle}.mp3"`);

    // Return the stream as the response.
    // The type for NextResponse body can be ReadableStream<any> | null | undefined.
    // Casting `stream` to `any` because of type mismatch between Node.js streams and Web streams,
    // but Next.js handles this internally.
    return new NextResponse(stream as any, { headers });

  } catch (error: any) {
    console.error('Conversion Error:', error);
    let errorMessage = "Failed to convert the video.";
     if (error.message && error.message.includes('private')) {
        errorMessage = 'This video is private and cannot be converted.';
    } else if (error.message && (error.message.includes('unavailable') || error.message.includes('410'))) {
        errorMessage = 'This video is unavailable or has been removed.';
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
