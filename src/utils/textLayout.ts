export function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (current.length + word.length + 1 > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function getMaxLines(narrativeHeight: number): number {
  const topPadding = 24;
  const bottomReserved = 26; // space for "tap to continue"
  const lineHeight = 18;
  return Math.max(1, Math.floor((narrativeHeight - topPadding - bottomReserved) / lineHeight));
}

export function paginateLines(lines: string[], maxLines: number): string[][] {
  const pages: string[][] = [];
  for (let i = 0; i < lines.length; i += maxLines) {
    pages.push(lines.slice(i, i + maxLines));
  }
  return pages.length > 0 ? pages : [[]];
}
