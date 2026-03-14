import { memo } from 'react';
import { PALETTE, VIEWBOX } from '../../utils/constants';

interface TitleScreenProps {
  hasSave: boolean;
  onNewGame: () => void;
  onContinue: () => void;
  viewBoxHeight: number;
}

export const TitleScreen = memo(function TitleScreen({ hasSave, onNewGame, onContinue, viewBoxHeight }: TitleScreenProps) {
  const centerX = VIEWBOX.width / 2;
  const centerY = viewBoxHeight * 0.35;
  const buttonsY = centerY + 100;

  return (
    <g>
      <rect x={0} y={0} width={VIEWBOX.width} height={viewBoxHeight} fill={PALETTE.bgDarkest} />

      <text
        x={centerX} y={centerY}
        fill={PALETTE.accentCyan}
        fontSize={32}
        fontFamily="'Press Start 2P', monospace"
        textAnchor="middle"
      >
        2031
      </text>

      <text
        x={centerX} y={centerY + 40}
        fill={PALETTE.textSecondary}
        fontSize={14}
        fontFamily="'Share Tech Mono', monospace"
        textAnchor="middle"
      >
        You have been selected.
      </text>

      <line x1={centerX - 80} y1={centerY + 60} x2={centerX + 80} y2={centerY + 60} stroke={PALETTE.border} strokeWidth={1} />

      {hasSave && (
        <g onClick={onContinue} style={{ cursor: 'pointer' }}>
          <rect
            x={centerX - 100} y={buttonsY}
            width={200} height={50}
            rx={6}
            fill={PALETTE.buttonBg}
            stroke={PALETTE.accentCyan}
            strokeWidth={1.5}
          />
          <text
            x={centerX} y={buttonsY + 32}
            fill={PALETTE.accentCyan}
            fontSize={14}
            fontFamily="'Press Start 2P', monospace"
            textAnchor="middle"
          >
            CONTINUE
          </text>
        </g>
      )}

      <g onClick={onNewGame} style={{ cursor: 'pointer' }}>
        <rect
          x={centerX - 100} y={hasSave ? buttonsY + 70 : buttonsY}
          width={200} height={50}
          rx={6}
          fill={PALETTE.buttonBg}
          stroke={hasSave ? PALETTE.border : PALETTE.accentCyan}
          strokeWidth={hasSave ? 1 : 1.5}
        />
        <text
          x={centerX} y={(hasSave ? buttonsY + 70 : buttonsY) + 32}
          fill={hasSave ? PALETTE.textSecondary : PALETTE.accentCyan}
          fontSize={14}
          fontFamily="'Press Start 2P', monospace"
          textAnchor="middle"
        >
          NEW STORY
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
