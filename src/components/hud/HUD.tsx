import { memo } from 'react';
import { PALETTE, VIEWBOX, HUD_HEIGHT } from '../../utils/constants';
import { Hearts } from './Hearts';

interface HUDProps {
  chapter: number;
  hearts: number;
  maxHearts: number;
  inventoryCount: number;
  onInventoryOpen: () => void;
  onMenuOpen: () => void;
}

export const HUD = memo(function HUD({
  chapter,
  hearts,
  maxHearts,
  inventoryCount,
  onInventoryOpen,
  onMenuOpen,
}: HUDProps) {
  return (
    <g>
      {/* HUD background */}
      <rect
        x={0} y={0}
        width={VIEWBOX.width} height={HUD_HEIGHT}
        fill={PALETTE.bgDarkest}
        opacity={0.9}
      />
      <line x1={0} y1={HUD_HEIGHT} x2={VIEWBOX.width} y2={HUD_HEIGHT} stroke={PALETTE.border} strokeWidth={1} />

      {/* Chapter indicator */}
      <text
        x={16} y={32}
        fill={PALETTE.accentCyan}
        fontSize={10}
        fontFamily="'Press Start 2P', monospace"
      >
        CH.{chapter}
      </text>

      {/* Hearts */}
      <g transform="translate(100, 14)">
        <Hearts hearts={hearts} maxHearts={maxHearts} />
      </g>

      {/* Inventory button */}
      <g
        transform={`translate(${VIEWBOX.width - 84}, 8)`}
        onClick={onInventoryOpen}
        style={{ cursor: 'pointer' }}
      >
        <rect x={-4} y={-4} width={44} height={44} fill="transparent" />
        <rect x={0} y={0} width={36} height={36} rx={4} fill={PALETTE.buttonBg} stroke={PALETTE.border} strokeWidth={1} />
        <text x={18} y={24} fill={PALETTE.accentAmber} fontSize={16} textAnchor="middle" fontFamily="monospace">
          {inventoryCount > 0 ? `${inventoryCount}` : '\u25C8'}
        </text>
      </g>

      {/* Menu button */}
      <g
        transform={`translate(${VIEWBOX.width - 42}, 8)`}
        onClick={onMenuOpen}
        style={{ cursor: 'pointer' }}
      >
        <rect x={-4} y={-4} width={44} height={44} fill="transparent" />
        <rect x={0} y={0} width={36} height={36} rx={4} fill={PALETTE.buttonBg} stroke={PALETTE.border} strokeWidth={1} />
        <text x={18} y={24} fill={PALETTE.textSecondary} fontSize={16} textAnchor="middle" fontFamily="monospace">
          {'\u2261'}
        </text>
      </g>
    </g>
  );
});
