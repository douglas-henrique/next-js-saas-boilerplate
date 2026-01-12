import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { emailOTP } from "better-auth/plugins"
import { Resend } from "resend"
import prisma from "./prisma"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // OTP will handle verification
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        try {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || process.env.RESEND_EMAIL_FROM || "noreply@example.com",
            to: email,
            subject: type === "email-verification" ? "Verify your account" : "Your verification code",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Verification Code</h2>
                <p>Your verification code is:</p>
                <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
                  ${otp}
                </div>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
              </div>
            `,
            text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
          })
        } catch (error) {
          console.error("Failed to send OTP email:", error)
          throw error
        }
      },
    }),
  ],
  otp: {
    enabled: true,
    sendOnSignUp: true,
    sendOnSignIn: true,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  basePath: "/api/auth",
})

export type Session = typeof auth.$Infer.Session
