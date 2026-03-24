import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: vi.fn(),
  },
}))

vi.mock('@capacitor/splash-screen', () => ({
  SplashScreen: {
    hide: vi.fn().mockResolvedValue(undefined),
  },
}))

vi.mock('@capacitor/status-bar', () => ({
  StatusBar: {
    setStyle: vi.fn().mockResolvedValue(undefined),
    hide: vi.fn().mockResolvedValue(undefined),
  },
  Style: { Dark: 'DARK' },
}))

vi.mock('@capacitor/screen-orientation', () => ({
  ScreenOrientation: {
    lock: vi.fn().mockResolvedValue(undefined),
  },
}))

vi.mock('./Game', () => ({
  Game: () => <div data-testid="game">Game</div>,
}))

import App from './App'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar } from '@capacitor/status-bar'
import { ScreenOrientation } from '@capacitor/screen-orientation'

function renderApp() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders Game immediately on web (non-native)', () => {
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false)
    renderApp()
    expect(screen.getByTestId('game')).toBeDefined()
  })

  it('renders Game after native setup completes', async () => {
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true)
    renderApp()
    await waitFor(() => {
      expect(screen.getByTestId('game')).toBeDefined()
    })
    expect(SplashScreen.hide).toHaveBeenCalled()
  })

  it('still renders Game if ScreenOrientation.lock throws (iPad)', async () => {
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true)
    vi.mocked(ScreenOrientation.lock).mockRejectedValue(
      new Error('Orientation lock not supported'),
    )
    renderApp()
    await waitFor(() => {
      expect(screen.getByTestId('game')).toBeDefined()
    })
    expect(SplashScreen.hide).toHaveBeenCalled()
  })

  it('still renders Game if StatusBar calls throw', async () => {
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true)
    vi.mocked(StatusBar.setStyle).mockRejectedValue(new Error('fail'))
    vi.mocked(StatusBar.hide).mockRejectedValue(new Error('fail'))
    renderApp()
    await waitFor(() => {
      expect(screen.getByTestId('game')).toBeDefined()
    })
    expect(SplashScreen.hide).toHaveBeenCalled()
  })

  it('still renders Game if SplashScreen.hide throws', async () => {
    vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true)
    vi.mocked(SplashScreen.hide).mockRejectedValue(new Error('fail'))
    renderApp()
    await waitFor(() => {
      expect(screen.getByTestId('game')).toBeDefined()
    })
  })
})
