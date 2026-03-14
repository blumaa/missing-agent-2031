export function matchKeywords(
  input: string,
  keywords: Record<string, string>,
): string | null {
  if (!input.trim()) return null;

  const normalizedInput = input.toLowerCase().trim();

  // Sort keywords by length descending so longer matches win
  const sorted = Object.entries(keywords).sort(
    ([a], [b]) => b.length - a.length,
  );

  for (const [keyword, sceneId] of sorted) {
    if (normalizedInput.includes(keyword.toLowerCase())) {
      return sceneId;
    }
  }

  return null;
}
