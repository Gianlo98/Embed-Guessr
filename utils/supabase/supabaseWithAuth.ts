import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

export function createUserClient(userId) {
  const options = {}

  if (userId) {
    const payload = {
      userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }

    console.log(userId)

    const token = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET)

    options.global = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  }

  return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      options
  )
}
