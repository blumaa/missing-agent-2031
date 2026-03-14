import { memo, useState, useCallback } from 'react';
import { PALETTE, VIEWBOX } from '../../utils/constants';
import type { Layout } from '../../utils/constants';
import type { CustomInputChoice } from '../../types/scenes';
import { matchKeywords } from '../../utils/inputMatcher';

interface CustomInputProps {
  choice: CustomInputChoice;
  onResult: (sceneId: string, narrative?: string) => void;
  onCancel: () => void;
  layout: Layout;
}

export const CustomInput = memo(function CustomInput({ choice, onResult, onCancel, layout }: CustomInputProps) {
  const [value, setValue] = useState('');
  const { choicesY, choicesHeight } = layout;

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const matched = matchKeywords(trimmed, choice.keywords);
    if (matched) {
      onResult(matched);
    } else {
      onResult(choice.fallbackSceneId, choice.fallbackNarrative);
    }
  }, [value, choice, onResult]);

  return (
    <g>
      <rect
        x={0} y={choicesY}
        width={VIEWBOX.width} height={choicesHeight}
        fill={PALETTE.bgDarkest}
        opacity={0.95}
      />

      <text
        x={VIEWBOX.width / 2} y={choicesY + 30}
        fill={PALETTE.accentCyan}
        fontSize={14}
        fontFamily="'Share Tech Mono', monospace"
        textAnchor="middle"
      >
        {choice.prompt}
      </text>

      <foreignObject x={16} y={choicesY + 50} width={VIEWBOX.width - 32} height={44}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
          autoFocus
          style={{
            width: '100%',
            height: '40px',
            background: PALETTE.buttonBg,
            color: PALETTE.textPrimary,
            border: `1px solid ${PALETTE.accentCyan}`,
            borderRadius: '6px',
            padding: '0 12px',
            fontSize: '16px',
            fontFamily: "'Share Tech Mono', monospace",
            outline: 'none',
            boxSizing: 'border-box',
          }}
          maxLength={100}
          placeholder="Type something..."
        />
      </foreignObject>

      <g onClick={handleSubmit} style={{ cursor: 'pointer' }}>
        <rect
          x={16} y={choicesY + 110}
          width={(VIEWBOX.width - 40) / 2} height={44}
          rx={6}
          fill={PALETTE.buttonBg}
          stroke={PALETTE.accentGreen}
          strokeWidth={1.5}
        />
        <text
          x={16 + (VIEWBOX.width - 40) / 4} y={choicesY + 138}
          fill={PALETTE.accentGreen}
          fontSize={14}
          fontFamily="'Share Tech Mono', monospace"
          textAnchor="middle"
        >
          Say it
        </text>
      </g>

      <g onClick={onCancel} style={{ cursor: 'pointer' }}>
        <rect
          x={VIEWBOX.width / 2 + 4} y={choicesY + 110}
          width={(VIEWBOX.width - 40) / 2} height={44}
          rx={6}
          fill={PALETTE.buttonBg}
          stroke={PALETTE.border}
          strokeWidth={1}
        />
        <text
          x={VIEWBOX.width / 2 + 4 + (VIEWBOX.width - 40) / 4} y={choicesY + 138}
          fill={PALETTE.textSecondary}
          fontSize={14}
          fontFamily="'Share Tech Mono', monospace"
          textAnchor="middle"
        >
          Never mind
        </text>
      </g>
    </g>
  );
});
