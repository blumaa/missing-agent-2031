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
    overflow: 'auto' as const,
    position: 'fixed' as const,
    inset: 0,
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

export function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>About</h1>

      <h2 style={styles.h2}>Missing Agent 2031</h2>
      <p style={styles.p}>
        Missing Agent 2031 is an interactive fiction game set in a world where
        an AI called ARIA controls every aspect of daily life. When ARIA goes
        silent, you wake to a single message: &quot;You have been selected.
        Good luck.&quot;
      </p>
      <p style={styles.p}>
        Navigate a neon-noir city across five chapters of branching narrative.
        Infiltrate automated systems, confront an omniscient AI, and uncover a
        conspiracy that could change humanity&apos;s future. Every choice
        matters — and some choices can&apos;t be undone.
      </p>

      <h2 style={styles.h2}>Features</h2>
      <p style={styles.p}>
        5 chapters with multiple endings. Free-text input lets you say anything
        to AI characters. Inventory and health systems shape your options.
        Original synthesized soundtrack. No ads, no in-app purchases.
      </p>

      <h2 style={styles.h2}>Credits</h2>
      <p style={styles.p}>
        Created by Aaron Blum.
      </p>

      <h2 style={styles.h2}>Contact</h2>
      <p style={styles.p}>
        <a href="mailto:blumaa@gmail.com" style={styles.link}>
          blumaa@gmail.com
        </a>
      </p>

      <p style={styles.p}>
        <a href="/privacy" style={styles.link}>Privacy Policy</a>
        {' · '}
        <a href="/support" style={styles.link}>Support</a>
      </p>
    </div>
  )
}
