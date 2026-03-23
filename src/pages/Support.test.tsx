import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Support } from './Support'

describe('Support', () => {
  it('renders the support heading', () => {
    render(<Support />)
    expect(screen.getByRole('heading', { name: /support/i })).toBeInTheDocument()
  })

  it('includes the app name', () => {
    render(<Support />)
    expect(screen.getByText(/missing agent 2031/i)).toBeInTheDocument()
  })

  it('includes contact email', () => {
    render(<Support />)
    expect(screen.getByRole('link', { name: /email/i })).toBeInTheDocument()
  })
})
