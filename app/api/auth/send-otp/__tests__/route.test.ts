import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '../route'
import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// Mock auth
vi.mock('@/lib/auth', () => ({
  auth: {
    handler: vi.fn(),
  },
}))

describe('POST /api/auth/send-otp', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should send OTP successfully', async () => {
    const mockResponse = new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

    ;(auth.handler as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)

    const request = new NextRequest('http://localhost:3000/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        type: 'email-verification',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ success: true })
    expect(auth.handler).toHaveBeenCalled()
  })

  it('should return error when email is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({
        type: 'email-verification',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toEqual({ error: 'Email is required' })
  })

  it('should handle errors from Better Auth API', async () => {
    const mockResponse = new Response(JSON.stringify({ message: 'Failed to send OTP' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })

    ;(auth.handler as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)

    const request = new NextRequest('http://localhost:3000/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        type: 'email-verification',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Failed to send OTP' })
  })
})
