import { memo, useState } from 'react';
import { PALETTE, VIEWBOX } from '../../utils/constants';
import type { Layout } from '../../utils/constants';
import { useTypewriter } from '../../hooks/useTypewriter';
import { wrapText, getMaxLines, paginateLines } from '../../utils/textLayout';

interface NarrativeBoxProps {
  text: string;
  onTap: () => void;
  layout: Layout;
}

export const NarrativeBox = memo(function NarrativeBox({ text, onTap, layout }: NarrativeBoxProps) {
  const { displayedText, isComplete, skip } = useTypewriter(text);
  const { narrativeY, narrativeHeight } = layout;
  const allLines = wrapText(displayedText, 38);
  const maxLines = getMaxLines(narrativeHeight);
  const pages = paginateLines(allLines, maxLines);

  const [pageIndex, setPageIndex] = useState(0);
  const [hasReadAll, setHasReadAll] = useState(false);
  const [prevText, setPrevText] = useState(text);

  // Reset page when text changes (new scene)
  if (prevText !== text) {
    setPrevText(text);
    setPageIndex(0);
    setHasReadAll(false);
  }

  const isLastPage = pageIndex >= pages.length - 1;
  const isSinglePage = pages.length <= 1;
  const currentLines = pages[pageIndex] || [];

  const handleTap = () => {
    if (!isComplete) {
      skip();
    } else if (!hasReadAll) {
      // First pass: advance through pages, then show choices
      if (!isLastPage) {
        setPageIndex(prev => prev + 1);
      } else {
        setHasReadAll(true);
        onTap();
      }
    } else if (!isSinglePage) {
      // After choices shown: cycle pages endlessly
      setPageIndex(prev => (prev + 1) % pages.length);
    }
  };

  const hintText = !isComplete
    ? null
    : isSinglePage
      ? (hasReadAll ? null : '> tap to continue')
      : hasReadAll
        ? `> ${pageIndex + 1}/${pages.length}`
        : isLastPage
          ? '> tap to continue'
          : `> tap for more (${pageIndex + 1}/${pages.length})`;

  return (
    <g onClick={handleTap} style={{ cursor: 'pointer' }}>
      {/* Background */}
      <rect
        x={0} y={narrativeY}
        width={VIEWBOX.width} height={narrativeHeight}
        fill={PALETTE.bgDarkest}
        opacity={0.95}
      />
      {/* Border top */}
      <line x1={0} y1={narrativeY} x2={VIEWBOX.width} y2={narrativeY} stroke={PALETTE.border} strokeWidth={1} />

      {/* Clip text to narrative area */}
      <clipPath id="narrative-clip">
        <rect x={0} y={narrativeY} width={VIEWBOX.width} height={narrativeHeight} />
      </clipPath>

      <g clipPath="url(#narrative-clip)">
        {currentLines.map((line, i) => (
          <text
            key={i}
            x={20}
            y={narrativeY + 24 + i * 18}
            fill={PALETTE.textPrimary}
            fontSize={15}
            fontFamily="'Share Tech Mono', monospace"
          >
            {line}
          </text>
        ))}

        {!isComplete && (
          <text
            x={20 + (currentLines[currentLines.length - 1]?.length || 0) * 8}
            y={narrativeY + 24 + (currentLines.length - 1) * 18}
            fill={PALETTE.accentCyan}
            fontSize={15}
            fontFamily="'Share Tech Mono', monospace"
            opacity={0.8}
          >
            _
          </text>
        )}
      </g>

      {/* Tap hint */}
      {hintText && (
        <text
          x={20}
          y={narrativeY + narrativeHeight - 8}
          fill={PALETTE.accentCyan}
          fontSize={13}
          fontFamily="'Share Tech Mono', monospace"
          opacity={0.8}
        >
          {hintText}
        </text>
      )}
    </g>
  );
});
