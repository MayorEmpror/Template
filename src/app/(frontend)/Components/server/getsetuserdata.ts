'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

/**
 * Fetches the currently logged-in user along with their related userData
 */
export const getUserData = async () => {
  const payload = await getPayload({ config })
  const headersList = await headers()

  // Get the authenticated user
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return null
  }

  // Fetch userData linked to this user
  const userData = await payload.find({
    collection: 'UserData',
    where: {
      user: {
        equals: user.id, // relationship to Users collection
      },
    },
    limit: 1,
  })

  // Return user info + their userData
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    userData: userData.docs[0] || null,
  }
}


export const increaseUserBalance = async (userId: number, amount: number) => {
    const payload = await getPayload({ config })
  
    // Fetch current UserData
    const userDataOld = await payload.find({ 
      collection: 'UserData',
      where: {
        user: {
            equals: userId
        }
      }
    })
    const userData = await payload.update({
      collection: 'UserData',
      id: userDataOld.docs[0].id,
      data: {
        balance: amount !== undefined ? (userDataOld.docs[0].balance ?? 0) + amount : 0,
      
      },
    })

    return userData
  }