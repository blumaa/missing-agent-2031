import { PALETTE } from '../utils/constants'

const styles = {
  container: {
    maxWidth: 640,
    margin: '0 auto',
    padding: '48px 24px',
    fontFamily: "'Share Tech Mono', monospace",
    color: PALETTE.textPrimary,
    backgroundColor: PALETTE.bgDarkest,
    minHeight: '100vh',
  },
  h1: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: 18,
    color: PALETTE.accentCyan,
    marginBottom: 32,
  },
  h2: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: 12,
    color: PALETTE.accentCyan,
    marginTop: 32,
    marginBottom: 12,
  },
  p: {
    fontSize: 14,
    lineHeight: 1.8,
    color: PALETTE.textPrimary,
    marginBottom: 16,
  },
  link: {
    color: PALETTE.accentCyan,
  },
} as const

export function Support() {
  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Support</h1>

      <h2 style={styles.h2}>Missing Agent 2031</h2>
      <p style={styles.p}>
        Need help or want to report a bug? We&apos;re here to help.
      </p>

      <h2 style={styles.h2}>Contact</h2>
      <p style={styles.p}>
        <a href="mailto:blumaa@gmail.com" style={styles.link}>
          Email
        </a>
        {' '}us at blumaa@gmail.com
      </p>

      <h2 style={styles.h2}>Common Issues</h2>
      <p style={styles.p}>
        <strong style={{ color: PALETTE.accentAmber }}>Game progress lost:</strong>{' '}
        Progress is saved locally on your device. Uninstalling the app or
        clearing app data will erase your save.
      </p>
      <p style={styles.p}>
        <strong style={{ color: PALETTE.accentAmber }}>App won&apos;t start:</strong>{' '}
        Try force-closing and reopening the app. If the issue persists, try
        reinstalling.
      </p>
    </div>
  )
}
