import { useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { Game } from './Game'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PALETTE } from './utils/constants'

function App() {
  const [ready, setReady] = useState(!Capacitor.isNativePlatform())

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return

    async function setup() {
      try {
        await Promise.allSettled([
          ScreenOrientation.lock({ orientation: 'portrait' }),
          StatusBar.setStyle({ style: Style.Dark }).then(() => StatusBar.hide()),
        ])
      } catch {
        // Non-critical — continue even if orientation/statusbar fail (e.g. iPad)
      }
      try {
        await SplashScreen.hide()
      } catch {
        // Splash screen hide can fail but app must still render
      }
      setReady(true)
    }
    setup()
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 'env(safe-area-inset-top)',
        bottom: 'env(safe-area-inset-bottom)',
        left: 0,
        right: 0,
        overflow: 'hidden',
        backgroundColor: PALETTE.bgDarkest,
      }}
    >
      {ready && <ErrorBoundary><Game /></ErrorBoundary>}
    </div>
  )
}

export default App
