import { env } from '@/env'
import { createClerkClient } from '@clerk/remix/api.server'

export const clerkClient = createClerkClient({
  secretKey: env.CLERK_SECRET_KEY,
})
