import { memo } from 'react';
import { PALETTE, VIEWBOX, MAX_INVENTORY } from '../../utils/constants';
import { ITEMS } from '../../data/items';

interface InventoryOverlayProps {
  inventory: string[];
  onClose: () => void;
  viewBoxHeight: number;
}

export const InventoryOverlay = memo(function InventoryOverlay({ inventory, onClose, viewBoxHeight }: InventoryOverlayProps) {
  const cols = 4;
  const cellSize = 80;
  const gridWidth = cols * cellSize;
  const gridX = (VIEWBOX.width - gridWidth) / 2;
  const gridY = viewBoxHeight * 0.25;

  return (
    <g onClick={onClose}>
      <rect x={0} y={0} width={VIEWBOX.width} height={viewBoxHeight} fill={PALETTE.bgDarkest} opacity={0.85} />

      <text
        x={VIEWBOX.width / 2} y={gridY - 30}
        fill={PALETTE.accentAmber}
        fontSize={12}
        fontFamily="'Press Start 2P', monospace"
        textAnchor="middle"
      >
        INVENTORY
      </text>

      {Array.from({ length: MAX_INVENTORY }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = gridX + col * cellSize;
        const y = gridY + row * cellSize;
        const itemId = inventory[i];
        const item = itemId ? ITEMS[itemId] : undefined;

        return (
          <g key={i} onClick={(e) => e.stopPropagation()}>
            <rect
              x={x + 4} y={y + 4}
              width={cellSize - 8} height={cellSize - 8}
              rx={6}
              fill={item ? PALETTE.buttonBg : PALETTE.bgDark}
              stroke={item ? PALETTE.accentAmber : PALETTE.border}
              strokeWidth={item ? 1.5 : 1}
              opacity={item ? 1 : 0.4}
            />
            {item && (
              <>
                <text
                  x={x + cellSize / 2} y={y + 36}
                  fill={PALETTE.accentAmber}
                  fontSize={20}
                  textAnchor="middle"
                >
                  {item.icon === 'phone' ? '\u{1F4F1}' :
                   item.icon === 'tool' ? '\u{1F527}' :
                   item.icon === 'map' ? '\u{1F5FA}' :
                   item.icon === 'id' ? '\u{1FAAA}' :
                   item.icon === 'med' ? '\u{1FA79}' :
                   item.icon === 'emp' ? '\u26A1' :
                   item.icon === 'cash' ? '\u{1F4B5}' :
                   item.icon === 'badge' ? '\u{1F396}' :
                   '\u25C8'}
                </text>
                <text
                  x={x + cellSize / 2} y={y + 58}
                  fill={PALETTE.textPrimary}
                  fontSize={11}
                  fontFamily="'Share Tech Mono', monospace"
                  textAnchor="middle"
                >
                  {item.name}
                </text>
              </>
            )}
          </g>
        );
      })}

      <text
        x={VIEWBOX.width / 2} y={gridY + 2 * cellSize + 40}
        fill={PALETTE.textSecondary}
        fontSize={11}
        fontFamily="'Share Tech Mono', monospace"
        textAnchor="middle"
        opacity={0.6}
      >
        tap anywhere to close
      </text>
    </g>
  );
});
