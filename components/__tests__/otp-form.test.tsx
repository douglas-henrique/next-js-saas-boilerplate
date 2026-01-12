import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OTPForm } from '../otp-form'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}))

// Mock fetch
global.fetch = vi.fn()

describe('OTPForm', () => {
  const mockPush = vi.fn()
  const mockRouter = {
    push: mockPush,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as ReturnType<typeof vi.fn>).mockReturnValue(mockRouter)
    ;(useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue({
      get: (key: string) => (key === 'email' ? 'test@example.com' : null),
    })
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    })
  })

  it('should render OTP form with verify and resend buttons', () => {
    render(<OTPForm />)

    expect(screen.getByText(/enter verification code/i)).toBeInTheDocument()
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /verify/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /resend/i })).toBeInTheDocument()
  })
})
