import { memo, useState } from 'react';
import { PALETTE, VIEWBOX } from '../../utils/constants';
import { isMuted, setMuted } from '../../hooks/useSoundEffects';

interface SettingsOverlayProps {
  onClose: () => void;
  onMainMenu: () => void;
  viewBoxHeight: number;
}

export const SettingsOverlay = memo(function SettingsOverlay({ onClose, onMainMenu, viewBoxHeight }: SettingsOverlayProps) {
  const centerX = VIEWBOX.width / 2;
  const [muted, setMutedState] = useState(isMuted);
  const centerY = viewBoxHeight * 0.3;

  return (
    <g>
      <rect x={0} y={0} width={VIEWBOX.width} height={viewBoxHeight} fill={PALETTE.bgDarkest} opacity={0.9} />

      <text
        x={centerX} y={centerY}
        fill={PALETTE.textPrimary}
        fontSize={12}
        fontFamily="'Press Start 2P', monospace"
        textAnchor="middle"
      >
        PAUSED
      </text>

      <g onClick={() => { setMuted(!muted); setMutedState(!muted); }} style={{ cursor: 'pointer' }}>
        <rect
          x={centerX - 100} y={centerY + 40}
          width={200} height={44}
          rx={6}
          fill={PALETTE.buttonBg}
          stroke={PALETTE.border}
          strokeWidth={1}
        />
        <text
          x={centerX} y={centerY + 68}
          fill={PALETTE.textPrimary}
          fontSize={13}
          fontFamily="'Share Tech Mono', monospace"
          textAnchor="middle"
        >
          Sound: {muted ? 'OFF' : 'ON'}
        </text>
      </g>

      <g onClick={onClose} style={{ cursor: 'pointer' }}>
        <rect
          x={centerX - 100} y={centerY + 100}
          width={200} height={44}
          rx={6}
          fill={PALETTE.buttonBg}
          stroke={PALETTE.accentCyan}
          strokeWidth={1.5}
        />
        <text
          x={centerX} y={centerY + 128}
          fill={PALETTE.accentCyan}
          fontSize={13}
          fontFamily="'Share Tech Mono', monospace"
          textAnchor="middle"
        >
          Resume
        </text>
      </g>

      <g onClick={onMainMenu} style={{ cursor: 'pointer' }}>
        <rect
          x={centerX - 100} y={centerY + 160}
          width={200} height={44}
          rx={6}
          fill={PALETTE.buttonBg}
          stroke={PALETTE.accentMagenta}
          strokeWidth={1}
        />
        <text
          x={centerX} y={centerY + 188}
          fill={PALETTE.accentMagenta}
          fontSize={13}
          fontFamily="'Share Tech Mono', monospace"
          textAnchor="middle"
        >
          Main Menu
        </text>
      </g>
    </g>
  );
});
