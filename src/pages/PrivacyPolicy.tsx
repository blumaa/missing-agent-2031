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
  meta: {
    fontSize: 12,
    color: PALETTE.textSecondary,
    marginBottom: 24,
  },
} as const

export function PrivacyPolicy() {
  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Privacy Policy</h1>
      <p style={styles.meta}>Effective date: March 20, 2026</p>

      <h2 style={styles.h2}>Overview</h2>
      <p style={styles.p}>
        Missing Agent 2031 does not collect any personal data. The game runs
        entirely on your device with no server-side processing, accounts, or
        tracking.
      </p>

      <h2 style={styles.h2}>Data Storage</h2>
      <p style={styles.p}>
        Game progress is saved locally on your device using on-device storage.
        This data never leaves your device and is not accessible to us or any
        third party.
      </p>

      <h2 style={styles.h2}>Analytics &amp; Tracking</h2>
      <p style={styles.p}>
        Missing Agent 2031 does not use analytics, advertising SDKs, or any
        form of user tracking.
      </p>

      <h2 style={styles.h2}>Third-Party Services</h2>
      <p style={styles.p}>
        The app does not integrate with any third-party services that collect
        user data.
      </p>

      <h2 style={styles.h2}>Children&apos;s Privacy</h2>
      <p style={styles.p}>
        Because we do not collect any data, no special provisions for
        children&apos;s data are necessary.
      </p>

      <h2 style={styles.h2}>Changes</h2>
      <p style={styles.p}>
        If this policy changes, we will update it on this page with a new
        effective date.
      </p>

      <h2 style={styles.h2}>Contact</h2>
      <p style={styles.p}>
        Questions about this policy? Reach us at{' '}
        <a
          href="mailto:blumaa@gmail.com"
          style={{ color: PALETTE.accentCyan }}
        >
          blumaa@gmail.com
        </a>
      </p>
    </div>
  )
}
