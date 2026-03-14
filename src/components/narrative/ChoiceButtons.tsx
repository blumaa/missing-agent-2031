import { memo, useCallback, useState } from 'react';
import { PALETTE, VIEWBOX } from '../../utils/constants';
import type { Layout } from '../../utils/constants';
import type { SceneChoice, CustomInputChoice } from '../../types/scenes';
import type { EvaluatedChoice } from '../../utils/storyEngine';
import { ITEMS } from '../../data/items';
import { wrapText } from '../../utils/textLayout';

interface ChoiceButtonsProps {
  choices: EvaluatedChoice[];
  onChoiceSelect: (choice: SceneChoice) => void;
  onCustomInput: (choice: CustomInputChoice) => void;
  layout: Layout;
}

function getLockedLabel(choice: SceneChoice): string {
  if (choice.requires?.items) {
    const names = choice.requires.items.map(id => ITEMS[id]?.name || id);
    return `Needs: ${names.join(', ')}`;
  }
  if (choice.requires?.minHearts) {
    return `Needs more health`;
  }
  return 'Locked';
}

// ~8px per char at fontSize 14, available width = buttonWidth - 32px padding
const BUTTON_TEXT_MAX_CHARS = 40;
const LINE_HEIGHT = 16;

export const ChoiceButtons = memo(function ChoiceButtons({
  choices,
  onChoiceSelect,
  onCustomInput,
  layout,
}: ChoiceButtonsProps) {
  const handleClick = useCallback((evaluatedChoice: EvaluatedChoice) => {
    if (!evaluatedChoice.available) return;
    const choice = evaluatedChoice.choice;
    if ('type' in choice && choice.type === 'custom_input') {
      onCustomInput(choice);
    } else {
      onChoiceSelect(choice as SceneChoice);
    }
  }, [onChoiceSelect, onCustomInput]);

  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const { choicesY, choicesHeight } = layout;
  const buttonGap = 8;
  const buttonX = 16;
  const buttonWidth = VIEWBOX.width - 32;
  const topPadding = 10;

  // Pre-compute wrapped lines and per-button heights
  const buttonData = choices.map((ec) => {
    const isCustom = 'type' in ec.choice && (ec.choice as CustomInputChoice).type === 'custom_input';
    const rawLabel = isCustom
      ? (ec.choice as CustomInputChoice).prompt
      : (ec.choice as SceneChoice).text;
    const label = ec.available ? rawLabel : `🔒 ${rawLabel}`;
    const lines = wrapText(label, BUTTON_TEXT_MAX_CHARS);
    const lockedExtra = (!ec.available && !isCustom) ? 14 : 0; // space for "Needs:" line
    const textHeight = lines.length * LINE_HEIGHT;
    const height = textHeight + 16 + lockedExtra; // 8px top + 8px bottom padding
    return { ec, isCustom, label, lines, height, lockedExtra };
  });

  // Scale down if total exceeds available space
  const totalNeeded = buttonData.reduce((sum, b) => sum + b.height, 0)
    + (buttonData.length - 1) * buttonGap + topPadding * 2;

  const scale = totalNeeded > choicesHeight ? (choicesHeight - topPadding * 2 - (buttonData.length - 1) * buttonGap) / buttonData.reduce((sum, b) => sum + b.height, 0) : 1;

  // Compute final heights and Y positions
  const buttons = buttonData.reduce<Array<typeof buttonData[number] & { finalHeight: number; y: number }>>((acc, b) => {
    const finalHeight = Math.floor(b.height * scale);
    const y = acc.length === 0
      ? choicesY + topPadding
      : acc[acc.length - 1].y + acc[acc.length - 1].finalHeight + buttonGap;
    acc.push({ ...b, finalHeight, y });
    return acc;
  }, []);

  return (
    <g>
      {/* Background */}
      <rect x={0} y={choicesY} width={VIEWBOX.width} height={choicesHeight} fill={PALETTE.bgDarkest} />
      <line x1={0} y1={choicesY} x2={VIEWBOX.width} y2={choicesY} stroke={PALETTE.border} strokeWidth={1} />

      <clipPath id="choices-clip">
        <rect x={0} y={choicesY} width={VIEWBOX.width} height={choicesHeight} />
      </clipPath>

      <g clipPath="url(#choices-clip)">
        {buttons.map(({ ec, isCustom, lines, finalHeight, y, lockedExtra }, i) => {
          const textBlockHeight = lines.length * LINE_HEIGHT;
          const textStartY = y + (finalHeight - textBlockHeight - lockedExtra) / 2 + LINE_HEIGHT * 0.75;

          return (
            <g
              key={i}
              onClick={() => handleClick(ec)}
              onPointerDown={() => ec.available && setPressedIndex(i)}
              onPointerUp={() => setPressedIndex(null)}
              onPointerLeave={() => setPressedIndex(null)}
              style={{ cursor: ec.available ? 'pointer' : 'not-allowed' }}
            >
              <rect
                x={buttonX} y={y}
                width={buttonWidth} height={finalHeight}
                rx={6}
                fill={pressedIndex === i ? PALETTE.bgMid : (ec.available ? PALETTE.buttonBg : PALETTE.bgDarkest)}
                stroke={ec.available ? PALETTE.accentCyan : PALETTE.border}
                strokeWidth={ec.available ? 1.5 : 1}
                opacity={ec.available ? 1 : 0.5}
              />

              {lines.map((line, li) => (
                <text
                  key={li}
                  x={buttonX + 16}
                  y={textStartY + li * LINE_HEIGHT}
                  dominantBaseline="auto"
                  fill={ec.available ? PALETTE.textPrimary : PALETTE.textSecondary}
                  fontSize={14}
                  fontFamily="'Share Tech Mono', monospace"
                >
                  {line}
                </text>
              ))}

              {!ec.available && !isCustom && (
                <text
                  x={buttonX + 16}
                  y={textStartY + lines.length * LINE_HEIGHT + 2}
                  dominantBaseline="auto"
                  fill={PALETTE.accentAmber}
                  fontSize={10}
                  fontFamily="'Share Tech Mono', monospace"
                  opacity={0.7}
                >
                  {getLockedLabel(ec.choice as SceneChoice)}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
});
