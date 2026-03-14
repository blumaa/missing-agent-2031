import { memo } from 'react';
import { PALETTE, VIEWBOX } from '../../utils/constants';
import { wrapText } from '../../utils/textLayout';

interface EndingScreenProps {
  endingType: 'reconnect' | 'destroy' | 'coexist' | 'unknown';
  sceneName: string;
  narrative: string;
  playtimeSeconds: number;
  viewBoxHeight: number;
  onMainMenu: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const ENDING_COLORS = {
  reconnect: PALETTE.accentCyan,
  destroy: PALETTE.accentMagenta,
  coexist: PALETTE.accentAmber,
  unknown: PALETTE.textSecondary,
} as const;

export const EndingScreen = memo(function EndingScreen({
  endingType,
  sceneName,
  narrative,
  playtimeSeconds,
  viewBoxHeight,
  onMainMenu,
}: EndingScreenProps) {
  const centerX = VIEWBOX.width / 2;
  const color = ENDING_COLORS[endingType];

  const lines = wrapText(narrative, 36);

  return (
    <g>
      <rect x={0} y={0} width={VIEWBOX.width} height={viewBoxHeight} fill={PALETTE.bgDarkest} />

      {/* Ending title */}
      <text
        x={centerX} y={80}
        fill={color}
        fontSize={10}
        fontFamily="'Press Start 2P', monospace"
        textAnchor="middle"
      >
        THE END
      </text>

      <text
        x={centerX} y={120}
        fill={color}
        fontSize={16}
        fontFamily="'Share Tech Mono', monospace"
        textAnchor="middle"
      >
        {sceneName}
      </text>

      <line x1={centerX - 60} y1={140} x2={centerX + 60} y2={140} stroke={color} strokeWidth={1} opacity={0.5} />

      {/* Narrative text */}
      {lines.map((line, i) => (
        <text
          key={i}
          x={24}
          y={170 + i * 18}
          fill={PALETTE.textPrimary}
          fontSize={14}
          fontFamily="'Share Tech Mono', monospace"
        >
          {line}
        </text>
      ))}

      {/* Stats */}
      <text
        x={centerX} y={170 + lines.length * 18 + 40}
        fill={PALETTE.textSecondary}
        fontSize={12}
        fontFamily="'Share Tech Mono', monospace"
        textAnchor="middle"
      >
        Time played: {formatTime(playtimeSeconds)}
      </text>

      {/* Play again */}
      <g onClick={onMainMenu} style={{ cursor: 'pointer' }}>
        <rect
          x={centerX - 100} y={viewBoxHeight - 120}
          width={200} height={50}
          rx={6}
          fill={PALETTE.buttonBg}
          stroke={color}
          strokeWidth={1.5}
        />
        <text
          x={centerX} y={viewBoxHeight - 88}
          fill={color}
          fontSize={12}
          fontFamily="'Press Start 2P', monospace"
          textAnchor="middle"
        >
          PLAY AGAIN
        </text>
      </g>

      <text
        x={centerX} y={viewBoxHeight - 30}
        fill={PALETTE.textSecondary}
        fontSize={10}
        fontFamily="'Share Tech Mono', monospace"
        textAnchor="middle"
        opacity={0.4}
      >
        a game about choices
      </text>
    </g>
  );
});
