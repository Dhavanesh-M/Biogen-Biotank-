export const timeline = [
  { start: 0, end: 0.12, from: 1, to: 72, label: 'Assembled' },
  { start: 0.12, end: 0.3, from: 73, to: 108, label: 'Lift the lid' },
  { start: 0.3, end: 0.46, from: 109, to: 144, label: 'Nothing hidden' },
  { start: 0.46, end: 0.62, from: 145, to: 160, label: 'Sedimentation' },
  { start: 0.62, end: 0.78, from: 161, to: 176, label: 'Biological core' },
  { start: 0.78, end: 0.92, from: 177, to: 192, label: 'Clear output' },
  { start: 0.92, end: 1, from: 192, to: 192, label: 'Zero compromise' }
];
export function frameForProgress(progress: number) { const point = timeline.find((item) => progress >= item.start && progress <= item.end) ?? timeline.at(-1)!; const local = point.end === point.start ? 0 : (progress - point.start) / (point.end - point.start); return Math.round(point.from + (point.to - point.from) * Math.max(0, Math.min(1, local))); }