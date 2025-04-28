import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const range = req.headers.get('range');
  if (!range) {
    return new Response('Range header required', { status: 416 });
  }

  // Deine bereits gespeicherte Blob-URL
  const blobUrl = process.env.VIDEO_BLOB_URL!;
  
  // Hole den Stream direkt von der Blob-URL
  const blobRes = await fetch(blobUrl);
  if (!blobRes.ok) {
    return new Response('Failed to fetch the blob', { status: 500 });
  }

  const videoBuffer = Buffer.from(await blobRes.arrayBuffer());
  const videoSize = videoBuffer.length;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + 1024 * 1024, videoSize - 1); // 1MB Chunks

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength.toString(),
    "Content-Type": "video/mp4",
  };

  const chunk = videoBuffer.slice(start, end + 1);

  return new Response(chunk, {
    status: 206,
    headers,
  });
}
