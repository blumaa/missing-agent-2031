import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { PALETTE, VIEWBOX } from '../utils/constants';
import { clearSave } from '../utils/saveSystem';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Game crashed:', error, info.componentStack);
  }

  handleReset = () => {
    clearSave();
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <svg
          viewBox={`0 0 ${VIEWBOX.width} 700`}
          style={{ width: '100%', height: '100%', display: 'block', backgroundColor: PALETTE.bgDarkest }}
        >
          <text
            x={VIEWBOX.width / 2} y={280}
            fill={PALETTE.accentMagenta}
            fontSize={10}
            fontFamily="'Press Start 2P', monospace"
            textAnchor="middle"
          >
            SYSTEM ERROR
          </text>
          <text
            x={VIEWBOX.width / 2} y={320}
            fill={PALETTE.textSecondary}
            fontSize={14}
            fontFamily="'Share Tech Mono', monospace"
            textAnchor="middle"
          >
            Something went wrong.
          </text>
          <g onClick={this.handleReset} style={{ cursor: 'pointer' }}>
            <rect
              x={VIEWBOX.width / 2 - 100} y={360}
              width={200} height={50}
              rx={6}
              fill={PALETTE.buttonBg}
              stroke={PALETTE.accentMagenta}
              strokeWidth={1.5}
            />
            <text
              x={VIEWBOX.width / 2} y={392}
              fill={PALETTE.accentMagenta}
              fontSize={12}
              fontFamily="'Press Start 2P', monospace"
              textAnchor="middle"
            >
              RESTART
            </text>
          </g>
        </svg>
      );
    }

    return this.props.children;
  }
}
