import { memo, useId } from 'react';
import { PALETTE } from '../../utils/constants';

interface HeartsProps {
  hearts: number;
  maxHearts: number;
}

export const Hearts = memo(function Hearts({ hearts, maxHearts }: HeartsProps) {
  const uid = useId();
  const fullHearts = Math.floor(maxHearts / 4);
  const heartElements = [];

  for (let i = 0; i < fullHearts; i++) {
    const quartersFilled = Math.min(4, Math.max(0, hearts - i * 4));
    heartElements.push(
      <g key={i} transform={`translate(${i * 28}, 0)`}>
        {/* Heart outline */}
        <path
          d="M10 18 C10 18 2 12 2 7 C2 4 4 2 7 2 C8.5 2 10 3.5 10 5 C10 3.5 11.5 2 13 2 C16 2 18 4 18 7 C18 12 10 18 10 18Z"
          fill={quartersFilled === 0 ? PALETTE.bgDark : 'none'}
          stroke={PALETTE.accentMagenta}
          strokeWidth={1}
          opacity={quartersFilled === 0 ? 0.3 : 1}
        />
        {/* Filled portion */}
        {quartersFilled > 0 && (
          <clipPath id={`heart-clip-${uid}-${i}`}>
            <rect x={0} y={20 - (quartersFilled / 4) * 20} width={20} height={(quartersFilled / 4) * 20} />
          </clipPath>
        )}
        {quartersFilled > 0 && (
          <path
            d="M10 18 C10 18 2 12 2 7 C2 4 4 2 7 2 C8.5 2 10 3.5 10 5 C10 3.5 11.5 2 13 2 C16 2 18 4 18 7 C18 12 10 18 10 18Z"
            fill={PALETTE.accentMagenta}
            clipPath={`url(#heart-clip-${uid}-${i})`}
          />
        )}
      </g>,
    );
  }

  return <g>{heartElements}</g>;
});
