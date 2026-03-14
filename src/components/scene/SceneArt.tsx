import { memo } from 'react';
import { PALETTE, VIEWBOX } from '../../utils/constants';
import type { Layout } from '../../utils/constants';

interface SceneArtProps {
  artComponent: string;
  layout: Layout;
}

function ApartmentArt() {
  return (
    <g>
      <rect x={40} y={200} width={320} height={60} fill={PALETTE.bgMid} />
      <rect x={40} y={40} width={320} height={160} fill={PALETTE.bgDark} />
      <rect x={160} y={60} width={80} height={60} fill={PALETTE.bgDarkest} stroke={PALETTE.border} strokeWidth={2} />
      <rect x={60} y={160} width={100} height={40} fill={PALETTE.bgMid} stroke={PALETTE.border} strokeWidth={2} rx={4} />
      <rect x={180} y={170} width={20} height={30} fill={PALETTE.accentCyan} opacity={0.6} rx={2} />
      <rect x={182} y={180} width={16} height={10} fill={PALETTE.bgDarkest} />
      {/* Blinking clock on nightstand */}
      <rect x={68} y={168} width={16} height={6} fill={PALETTE.accentMagenta} opacity={0.5}>
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
      </rect>
    </g>
  );
}

function StreetArt() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={160} fill={PALETTE.bgDarkest} />
      <rect x={20} y={60} width={60} height={200} fill={PALETTE.bgDark} />
      <rect x={90} y={40} width={50} height={220} fill={PALETTE.bgMid} />
      <rect x={250} y={50} width={70} height={210} fill={PALETTE.bgDark} />
      <rect x={330} y={70} width={50} height={190} fill={PALETTE.bgMid} />
      <rect x={100} y={50} width={2} height={200} fill={PALETTE.accentCyan} opacity={0.3} />
      <rect x={110} y={60} width={2} height={180} fill={PALETTE.accentCyan} opacity={0.2} />
      <rect x={260} y={55} width={2} height={195} fill={PALETTE.accentCyan} opacity={0.3} />
      <rect x={0} y={220} width={400} height={40} fill={PALETTE.bgDarkest} />
      <rect x={60} y={238} width={40} height={4} fill={PALETTE.textSecondary} opacity={0.3} />
      <rect x={160} y={238} width={40} height={4} fill={PALETTE.textSecondary} opacity={0.3} />
      <rect x={260} y={238} width={40} height={4} fill={PALETTE.textSecondary} opacity={0.3} />
      <rect x={180} y={30} width={16} height={8} fill={PALETTE.textSecondary} />
      <circle cx={188} cy={28} r={2} fill={PALETTE.accentMagenta}>
        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Neon sign flicker */}
      <rect x={95} y={55} width={30} height={6} fill={PALETTE.accentCyan} opacity={0.4}>
        <animate attributeName="opacity" values="0.4;0.1;0.4;0.4;0.15;0.4" dur="4s" repeatCount="indefinite" />
      </rect>
    </g>
  );
}

function HallwayArt() {
  return (
    <g>
      <polygon points="0,0 400,0 320,80 80,80" fill={PALETTE.bgDark} />
      <polygon points="0,0 80,80 80,200 0,260" fill={PALETTE.bgMid} />
      <polygon points="400,0 320,80 320,200 400,260" fill={PALETTE.bgMid} />
      <rect x={80} y={80} width={240} height={180} fill={PALETTE.bgDarkest} />
      <rect x={190} y={85} width={20} height={4} fill={PALETTE.accentMagenta} opacity={0.6} />
      <rect x={100} y={100} width={50} height={80} fill={PALETTE.bgDark} stroke={PALETTE.border} strokeWidth={2} rx={2} />
      <rect x={250} y={100} width={50} height={80} fill={PALETTE.bgDark} stroke={PALETTE.border} strokeWidth={2} rx={2} />
      <text x={125} y={130} fill={PALETTE.textSecondary} fontSize={8} textAnchor="middle" fontFamily="monospace">4B</text>
      <text x={275} y={130} fill={PALETTE.textSecondary} fontSize={8} textAnchor="middle" fontFamily="monospace">4C</text>
    </g>
  );
}

function MarketArt() {
  return (
    <g>
      <polygon points="20,80 180,80 170,60 30,60" fill={PALETTE.accentAmber} opacity={0.6} />
      <polygon points="220,80 380,80 370,60 230,60" fill={PALETTE.accentGreen} opacity={0.5} />
      <rect x={20} y={80} width={160} height={180} fill={PALETTE.bgDark} />
      <rect x={220} y={80} width={160} height={180} fill={PALETTE.bgDark} />
      <rect x={40} y={100} width={120} height={80} fill={PALETTE.bgMid} stroke={PALETTE.border} strokeWidth={1} />
      <rect x={60} y={140} width={20} height={30} fill={PALETTE.accentAmber} opacity={0.5} rx={2} />
      <rect x={90} y={145} width={15} height={25} fill={PALETTE.bgLight} opacity={0.4} rx={2} />
      <rect x={120} y={150} width={20} height={20} fill={PALETTE.accentCyan} opacity={0.3} rx={2} />
      <rect x={0} y={240} width={400} height={20} fill={PALETTE.bgMid} />
    </g>
  );
}

function DowntownArt() {
  return (
    <g>
      <rect x={20} y={20} width={80} height={240} fill={PALETTE.bgDark} stroke={PALETTE.accentCyan} strokeWidth={1} opacity={0.8} />
      <rect x={300} y={10} width={80} height={250} fill={PALETTE.bgDark} stroke={PALETTE.accentCyan} strokeWidth={1} opacity={0.8} />
      <rect x={120} y={40} width={60} height={220} fill={PALETTE.bgMid} stroke={PALETTE.accentCyan} strokeWidth={1} opacity={0.6} />
      {[40, 55, 70, 320, 335, 350].map(x => (
        <rect key={x} x={x} y={30} width={1} height={220} fill={PALETTE.accentCyan} opacity={0.15} />
      ))}
      <rect x={180} y={120} width={100} height={140} fill={PALETTE.bgDarkest} />
      <rect x={210} y={160} width={40} height={60} fill={PALETTE.bgDark} stroke={PALETTE.border} strokeWidth={2} />
      <circle cx={244} cy={190} r={3} fill={PALETTE.accentGreen} />
      <rect x={215} y={175} width={12} height={8} fill={PALETTE.bgDarkest} />
      <line x1={217} y1={176} x2={217} y2={182} stroke={PALETTE.textSecondary} strokeWidth={0.5} />
      <line x1={219} y1={176} x2={219} y2={182} stroke={PALETTE.textSecondary} strokeWidth={0.5} />
      <line x1={221} y1={176} x2={221} y2={182} stroke={PALETTE.textSecondary} strokeWidth={0.5} />
    </g>
  );
}

function UndergroundArt() {
  return (
    <g>
      <polygon points="100,0 300,0 250,260 150,260" fill={PALETTE.bgDarkest} />
      <rect x={150} y={200} width={100} height={60} fill={PALETTE.accentAmber} opacity={0.15} />
      {[60, 100, 140, 180, 220].map((y, i) => (
        <rect key={i} x={130 + i * 4} y={y} width={140 - i * 8} height={6} fill={PALETTE.bgMid} stroke={PALETTE.border} strokeWidth={0.5} />
      ))}
      <line x1={130} y1={40} x2={160} y2={260} stroke={PALETTE.textSecondary} strokeWidth={2} />
      <line x1={270} y1={40} x2={240} y2={260} stroke={PALETTE.textSecondary} strokeWidth={2} />
    </g>
  );
}

function PhoneArt() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={260} fill={PALETTE.bgDarkest} />
      <rect x={130} y={40} width={140} height={200} rx={12} fill={PALETTE.bgDark} stroke={PALETTE.border} strokeWidth={2} />
      <rect x={140} y={56} width={120} height={160} fill={PALETTE.bgDarkest} rx={4} />
      <text x={200} y={110} fill={PALETTE.accentCyan} fontSize={7} textAnchor="middle" fontFamily="'Share Tech Mono', monospace">YOU HAVE BEEN</text>
      <text x={200} y={125} fill={PALETTE.accentCyan} fontSize={7} textAnchor="middle" fontFamily="'Share Tech Mono', monospace">SELECTED.</text>
      <text x={200} y={150} fill={PALETTE.accentGreen} fontSize={6} textAnchor="middle" fontFamily="'Share Tech Mono', monospace">GOOD LUCK.</text>
      <circle cx={200} cy={185} r={4} fill={PALETTE.accentMagenta} opacity={0.8}>
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x={200} y={198} fill={PALETTE.textSecondary} fontSize={5} textAnchor="middle" fontFamily="monospace">1 notification</text>
    </g>
  );
}

function SecurityArt() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={260} fill={PALETTE.bgDark} />
      {[40, 120, 200, 280].map((x, i) => (
        <g key={i}>
          <rect x={x} y={40} width={60} height={45} fill={PALETTE.bgDarkest} stroke={PALETTE.border} strokeWidth={1} rx={2} />
          <rect x={x} y={100} width={60} height={45} fill={PALETTE.bgDarkest} stroke={PALETTE.border} strokeWidth={1} rx={2} />
        </g>
      ))}
      <rect x={200} y={40} width={60} height={45} fill={PALETTE.bgDarkest} stroke={PALETTE.accentMagenta} strokeWidth={1} rx={2}>
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <text x={230} y={60} fill={PALETTE.accentMagenta} fontSize={5} textAnchor="middle" fontFamily="monospace">DISCONNECT</text>
      <text x={230} y={70} fill={PALETTE.accentMagenta} fontSize={5} textAnchor="middle" fontFamily="monospace">03:47 AM</text>
      <rect x={20} y={180} width={360} height={20} fill={PALETTE.bgMid} />
      <rect x={300} y={170} width={30} height={10} fill={PALETTE.accentAmber} rx={2}>
        <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite" />
      </rect>
    </g>
  );
}

function BaseArt() {
  return (
    <g>
      {/* Tunnel ceiling */}
      <rect x={0} y={0} width={400} height={40} fill={PALETTE.bgDark} />
      <rect x={20} y={30} width={360} height={10} fill={PALETTE.bgMid} rx={5} />
      {/* Warm string lights */}
      {[60, 120, 180, 240, 300, 340].map((x, i) => (
        <circle key={x} cx={x} cy={45} r={3} fill={PALETTE.accentAmber} opacity={0.7}>
          <animate attributeName="opacity" values="0.7;0.4;0.7" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Walls */}
      <rect x={0} y={40} width={20} height={220} fill={PALETTE.bgMid} />
      <rect x={380} y={40} width={20} height={220} fill={PALETTE.bgMid} />
      {/* Floor */}
      <rect x={20} y={220} width={360} height={40} fill={PALETTE.bgDark} />
      {/* Tables/workstations */}
      <rect x={40} y={160} width={80} height={40} fill={PALETTE.bgMid} stroke={PALETTE.border} strokeWidth={1} />
      <rect x={280} y={160} width={80} height={40} fill={PALETTE.bgMid} stroke={PALETTE.border} strokeWidth={1} />
      {/* Screens on tables */}
      <rect x={55} y={140} width={30} height={20} fill={PALETTE.accentCyan} opacity={0.2} rx={2} />
      <rect x={300} y={140} width={30} height={20} fill={PALETTE.accentGreen} opacity={0.2} rx={2} />
      {/* People silhouettes */}
      <circle cx={170} cy={190} r={8} fill={PALETTE.textSecondary} opacity={0.4} />
      <rect x={164} y={198} width={12} height={20} fill={PALETTE.textSecondary} opacity={0.4} rx={2} />
      <circle cx={230} cy={185} r={8} fill={PALETTE.textSecondary} opacity={0.4} />
      <rect x={224} y={193} width={12} height={24} fill={PALETTE.textSecondary} opacity={0.4} rx={2} />
    </g>
  );
}

function ClinicArt() {
  return (
    <g>
      {/* Sterile white-blue interior */}
      <rect x={0} y={0} width={400} height={260} fill="#1a1a2e" />
      {/* Corridor */}
      <polygon points="100,0 300,0 260,260 140,260" fill="#12122a" />
      {/* Fluorescent lights */}
      <rect x={160} y={10} width={80} height={4} fill={PALETTE.bgLight} opacity={0.5} />
      <rect x={170} y={80} width={60} height={4} fill={PALETTE.bgLight} opacity={0.4} />
      {/* Med cabinets */}
      <rect x={150} y={30} width={40} height={50} fill={PALETTE.bgDark} stroke={PALETTE.accentCyan} strokeWidth={1} rx={2} />
      <rect x={210} y={30} width={40} height={50} fill={PALETTE.bgDark} stroke={PALETTE.accentCyan} strokeWidth={1} rx={2} />
      {/* Cross symbols */}
      <rect x={166} y={48} width={8} height={2} fill={PALETTE.accentMagenta} />
      <rect x={169} y={45} width={2} height={8} fill={PALETTE.accentMagenta} />
      {/* Server rack at end */}
      <rect x={180} y={140} width={40} height={80} fill={PALETTE.bgDark} stroke={PALETTE.border} strokeWidth={1} />
      <rect x={185} y={150} width={6} height={3} fill={PALETTE.accentGreen}>
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
      </rect>
      <rect x={185} y={158} width={6} height={3} fill={PALETTE.accentGreen}>
        <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
      </rect>
      <rect x={185} y={166} width={6} height={3} fill={PALETTE.accentMagenta}>
        <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
      </rect>
    </g>
  );
}

function ServerArt() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={260} fill={PALETTE.bgDarkest} />
      {/* Server racks */}
      {[40, 110, 180, 250, 320].map((x, i) => (
        <g key={i}>
          <rect x={x} y={20} width={50} height={220} fill={PALETTE.bgDark} stroke={PALETTE.border} strokeWidth={1} />
          {[40, 60, 80, 100, 120, 140, 160, 180].map(y => (
            <rect key={y} x={x + 8} y={y} width={6} height={3} fill={i % 2 === 0 ? PALETTE.accentGreen : PALETTE.accentCyan} opacity={0.6} />
          ))}
        </g>
      ))}
      {/* Cable runs on ceiling */}
      <line x1={40} y1={15} x2={370} y2={15} stroke={PALETTE.border} strokeWidth={3} />
      {/* Floor glow */}
      <rect x={0} y={240} width={400} height={20} fill={PALETTE.accentCyan} opacity={0.05} />
    </g>
  );
}

function HubArt() {
  return (
    <g>
      {/* Glass tower interior */}
      <rect x={0} y={0} width={400} height={260} fill="#0e0e20" />
      {/* Glass panels */}
      <rect x={0} y={0} width={400} height={260} fill={PALETTE.accentCyan} opacity={0.03} />
      {/* Lobby pillars */}
      <rect x={60} y={0} width={20} height={260} fill={PALETTE.bgDark} opacity={0.8} />
      <rect x={320} y={0} width={20} height={260} fill={PALETTE.bgDark} opacity={0.8} />
      {/* Floating holographic displays */}
      <rect x={120} y={40} width={70} height={40} fill={PALETTE.accentCyan} opacity={0.1} rx={4} />
      <rect x={220} y={60} width={70} height={40} fill={PALETTE.accentCyan} opacity={0.1} rx={4} />
      {/* NovaMind logo */}
      <circle cx={200} cy={100} r={20} fill="none" stroke={PALETTE.accentCyan} strokeWidth={1} opacity={0.4}>
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx={200} cy={100} r={10} fill={PALETTE.accentCyan} opacity={0.15}>
        <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2.5s" repeatCount="indefinite" />
      </circle>
      {/* Polished floor */}
      <rect x={0} y={200} width={400} height={60} fill={PALETTE.bgDark} />
      <rect x={80} y={200} width={240} height={60} fill={PALETTE.accentCyan} opacity={0.03} />
      {/* Sleepwalker silhouettes */}
      <circle cx={150} cy={180} r={6} fill={PALETTE.textSecondary} opacity={0.2} />
      <rect x={146} y={186} width={8} height={14} fill={PALETTE.textSecondary} opacity={0.2} rx={1} />
      <circle cx={260} cy={175} r={6} fill={PALETTE.textSecondary} opacity={0.2} />
      <rect x={256} y={181} width={8} height={18} fill={PALETTE.textSecondary} opacity={0.2} rx={1} />
    </g>
  );
}

function CoreArt() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={260} fill={PALETTE.bgDarkest} />
      {/* Concentric rings */}
      <circle cx={200} cy={130} r={100} fill="none" stroke={PALETTE.accentCyan} strokeWidth={0.5} opacity={0.3} />
      <circle cx={200} cy={130} r={70} fill="none" stroke={PALETTE.accentCyan} strokeWidth={0.5} opacity={0.4} />
      <circle cx={200} cy={130} r={40} fill="none" stroke={PALETTE.accentCyan} strokeWidth={1} opacity={0.5} />
      {/* Core sphere */}
      <circle cx={200} cy={130} r={20} fill={PALETTE.accentCyan} opacity={0.15}>
        <animate attributeName="r" values="20;24;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx={200} cy={130} r={8} fill={PALETTE.accentCyan} opacity={0.4}>
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Data streams radiating */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 200 + Math.cos(rad) * 25;
        const y1 = 130 + Math.sin(rad) * 25;
        const x2 = 200 + Math.cos(rad) * 110;
        const y2 = 130 + Math.sin(rad) * 110;
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={PALETTE.accentCyan} strokeWidth={0.5} opacity={0.2} />;
      })}
      {/* Floor */}
      <rect x={0} y={230} width={400} height={30} fill={PALETTE.bgDark} />
    </g>
  );
}

function EndingArt() {
  return (
    <g>
      <rect x={0} y={0} width={400} height={260} fill={PALETTE.bgDarkest} />
      {/* Horizon line */}
      <line x1={0} y1={180} x2={400} y2={180} stroke={PALETTE.border} strokeWidth={1} />
      {/* City skyline silhouette */}
      <rect x={30} y={140} width={30} height={40} fill={PALETTE.bgDark} />
      <rect x={70} y={120} width={20} height={60} fill={PALETTE.bgDark} />
      <rect x={100} y={130} width={40} height={50} fill={PALETTE.bgDark} />
      <rect x={160} y={100} width={25} height={80} fill={PALETTE.bgDark} />
      <rect x={200} y={110} width={50} height={70} fill={PALETTE.bgDark} />
      <rect x={270} y={125} width={30} height={55} fill={PALETTE.bgDark} />
      <rect x={310} y={135} width={40} height={45} fill={PALETTE.bgDark} />
      <rect x={360} y={145} width={25} height={35} fill={PALETTE.bgDark} />
      {/* Dawn glow */}
      <rect x={0} y={160} width={400} height={20} fill={PALETTE.accentAmber} opacity={0.08} />
      <rect x={0} y={170} width={400} height={10} fill={PALETTE.accentAmber} opacity={0.04} />
      {/* Stars */}
      {[50, 120, 200, 280, 350].map((x, i) => (
        <circle key={x} cx={x} cy={20 + (x % 40)} r={1} fill={PALETTE.textPrimary} opacity={0.4}>
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur={`${2 + i * 0.7}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </g>
  );
}

const ART_REGISTRY: Record<string, React.FC> = {
  apartment: ApartmentArt,
  street: StreetArt,
  hallway: HallwayArt,
  market: MarketArt,
  downtown: DowntownArt,
  underground: UndergroundArt,
  phone: PhoneArt,
  security: SecurityArt,
  base: BaseArt,
  clinic: ClinicArt,
  server: ServerArt,
  hub: HubArt,
  core: CoreArt,
  ending: EndingArt,
};

export const SceneArt = memo(function SceneArt({ artComponent, layout }: SceneArtProps) {
  const ArtComponent = ART_REGISTRY[artComponent];
  const { sceneArtY, sceneArtHeight } = layout;

  return (
    <g transform={`translate(0, ${sceneArtY})`}>
      <rect x={0} y={0} width={VIEWBOX.width} height={sceneArtHeight} fill={PALETTE.bgDarkest} />
      <g transform={`translate(${VIEWBOX.width / 2}, ${sceneArtHeight / 2}) scale(${(sceneArtHeight - 20) / 260}) translate(-200, -130)`}>
        {ArtComponent ? <ArtComponent /> : (
          <text x={200} y={130} fill={PALETTE.textSecondary} fontSize={14} textAnchor="middle" fontFamily="monospace">
            [{artComponent}]
          </text>
        )}
      </g>
    </g>
  );
});
