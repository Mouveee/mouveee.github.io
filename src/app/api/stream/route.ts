import { NextRequest } from 'next/server';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

export async function GET(req: NextRequest) {
  try {
    // Get the video file path
    const videoPath = join(process.cwd(), 'src', 'assets', 'myself.mp4');
    
    // Check if file exists and get its size
    const stat = statSync(videoPath);
    const videoSize = stat.size;
    
    const range = req.headers.get('range');
    
    if (!range) {
      // If no range header, serve the entire file
      const stream = createReadStream(videoPath);
      const readableStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk) => controller.enqueue(chunk));
          stream.on('end', () => controller.close());
          stream.on('error', (error) => controller.error(error));
        }
      });
      
      return new Response(readableStream, {
        status: 200,
        headers: {
          'Content-Length': videoSize.toString(),
          'Content-Type': 'video/mp4',
          'Accept-Ranges': 'bytes',
        },
      });
    }

    // Parse range header
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + 1024 * 1024, videoSize - 1); // 1MB chunks
    
    // Ensure end doesn't exceed file size
    const chunkEnd = Math.min(end, videoSize - 1);
    const contentLength = chunkEnd - start + 1;

    // Create a read stream for the specific range
    const stream = createReadStream(videoPath, { start, end: chunkEnd });
    const readableStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (error) => controller.error(error));
      }
    });

    const headers = {
      "Content-Range": `bytes ${start}-${chunkEnd}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength.toString(),
      "Content-Type": "video/mp4",
    };

    return new Response(readableStream, {
      status: 206,
      headers,
    });

  } catch (error) {
    console.error('Error serving video:', error);
    return new Response('Video not found', { status: 404 });
  }
}