export type VideoCategory = 'Brand' | 'Process' | 'Installation' | 'Product' | 'Testimonial';
export type VideoChapter = { step: number; label: string; start: number };
export type VideoTrack = { lang: 'en' | 'hi' | 'ta'; src: string };
export type VideoEntry = { slug: string; title: string; description: string; src: string; poster: string; duration?: string; category: VideoCategory; featured?: boolean; chapters?: VideoChapter[]; tracks?: VideoTrack[] };

export const videos: VideoEntry[] = [
  { slug: 'biogen-disassembly', title: 'The BioGen disassembly', description: 'From assembled system to open cutaway.', src: '/videos/biogen-disassembly.mp4', poster: '/posters/hero-last-frame.jpg', duration: '0:08', category: 'Product', featured: true, tracks: [{ lang: 'en', src: '/videos/subtitles/biogen-disassembly.en.vtt' }, { lang: 'hi', src: '/videos/subtitles/biogen-disassembly.hi.vtt' }, { lang: 'ta', src: '/videos/subtitles/biogen-disassembly.ta.vtt' }] },
  { slug: 'biogen-process', title: 'Inside the process', description: 'A closer look at the treatment cycle.', src: '/videos/biogen-process.mp4', poster: '/posters/process-poster.jpg', category: 'Process', featured: false, chapters: [{ step: 1, label: 'Inlet', start: 0 }, { step: 2, label: 'Sedimentation', start: 2 }, { step: 3, label: 'Anaerobic digestion', start: 5 }, { step: 4, label: 'Aerobic filtration', start: 8 }, { step: 5, label: 'Clear output', start: 11 }], tracks: [{ lang: 'en', src: '/videos/subtitles/biogen-process.en.vtt' }, { lang: 'hi', src: '/videos/subtitles/biogen-process.hi.vtt' }, { lang: 'ta', src: '/videos/subtitles/biogen-process.ta.vtt' }] }
];

export function getVideo(slug: string) { return videos.find((video) => video.slug === slug); }