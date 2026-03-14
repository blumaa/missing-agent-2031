import { memo, useState } from 'react';
import { PALETTE, VIEWBOX } from '../../utils/constants';
import { wrapText } from '../../utils/textLayout';

interface CollapseScreenProps {
  viewBoxHeight: number;
  onRecover: () => void;
}

const COLLAPSE_NARRATIVES = [
  'Your vision blurs. The world tilts sideways. You collapse against a cold wall, consciousness fading...',
  'Everything goes dark. The hum of the city fades to nothing. When awareness returns, you are somewhere else.',
  'Your body gives out. The stress, the fear, the constant running — it all catches up at once.',
  'The ground rushes up to meet you. Distant voices. Hands pulling you somewhere safe. Maybe.',
];

export const CollapseScreen = memo(function CollapseScreen({ viewBoxHeight, onRecover }: CollapseScreenProps) {
  const centerX = VIEWBOX.width / 2;
  const [narrativeIndex] = useState(() => Math.floor(Math.random() * COLLAPSE_NARRATIVES.length));
  const narrative = COLLAPSE_NARRATIVES[narrativeIndex];

  const lines = wrapText(narrative, 34);

  return (
    <g>
      <rect x={0} y={0} width={VIEWBOX.width} height={viewBoxHeight} fill="#050508" />

      <text
        x={centerX} y={viewBoxHeight * 0.25}
        fill={PALETTE.accentMagenta}
        fontSize={10}
        fontFamily="'Press Start 2P', monospace"
        textAnchor="middle"
        opacity={0.8}
      >
        SYSTEM FAILURE
      </text>

      <line
        x1={centerX - 60} y1={viewBoxHeight * 0.25 + 20}
        x2={centerX + 60} y2={viewBoxHeight * 0.25 + 20}
        stroke={PALETTE.accentMagenta} strokeWidth={1} opacity={0.3}
      />

      {lines.map((line, i) => (
        <text
          key={i}
          x={24}
          y={viewBoxHeight * 0.35 + i * 20}
          fill={PALETTE.textPrimary}
          fontSize={14}
          fontFamily="'Share Tech Mono', monospace"
          opacity={0.7}
        >
          {line}
        </text>
      ))}

      <text
        x={centerX} y={viewBoxHeight * 0.35 + lines.length * 20 + 40}
        fill={PALETTE.textSecondary}
        fontSize={12}
        fontFamily="'Share Tech Mono', monospace"
        textAnchor="middle"
      >
        You wake up later. Weak, but alive.
      </text>

      <g onClick={onRecover} style={{ cursor: 'pointer' }}>
        <rect
          x={centerX - 100} y={viewBoxHeight - 140}
          width={200} height={50}
          rx={6}
          fill={PALETTE.buttonBg}
          stroke={PALETTE.accentMagenta}
          strokeWidth={1.5}
        />
        <text
          x={centerX} y={viewBoxHeight - 108}
          fill={PALETTE.accentMagenta}
          fontSize={12}
          fontFamily="'Press Start 2P', monospace"
          textAnchor="middle"
        >
          KEEP GOING
        </text>
      </g>
    </g>
  );
});
