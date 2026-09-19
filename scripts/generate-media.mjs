import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile); const root = process.cwd(); const video = path.join(root, 'public', 'videos', 'biogen-process.mp4'); const poster = path.join(root, 'public', 'posters', 'process-poster.jpg'); const fallback = path.join(root, 'public', 'posters', 'hero-first-frame.jpg');
try { await fs.access(poster); console.log('Process poster already exists.'); } catch { try { await fs.access(video); await run('ffmpeg', ['-y', '-i', video, '-frames:v', '1', '-q:v', '2', poster]); console.log('Generated process poster from the video first frame.'); } catch { await fs.copyFile(fallback, poster); console.log('Process video or ffmpeg unavailable; used the assembled hero poster as fallback.'); } }