import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PrivacyPolicy } from './PrivacyPolicy'

describe('PrivacyPolicy', () => {
  it('renders the privacy policy heading', () => {
    render(<PrivacyPolicy />)
    expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument()
  })

  it('states no personal data is collected', () => {
    render(<PrivacyPolicy />)
    expect(screen.getByText(/does not collect.*personal data/i)).toBeInTheDocument()
  })

  it('includes the app name', () => {
    render(<PrivacyPolicy />)
    expect(screen.getAllByText(/missing agent 2031/i).length).toBeGreaterThan(0)
  })

  it('includes the effective date', () => {
    render(<PrivacyPolicy />)
    expect(screen.getByText(/effective date: march 20, 2026/i)).toBeInTheDocument()
  })
})
