'use server'

import { db } from '@/db'
import { getUsers } from '@/lib/queries'

export const authEdit = async (user: { name: string; password: string }) => {
  let isAuth = false
  if (!user || !user?.password || !user?.name) {
    return isAuth
  }
  try {
    const dBClient = await db.connect()
    const users = await getUsers(dBClient)
    const { data } = users.result
    data?.forEach(item => {
      if (item.name === user.name && item?.password === user.password) {
        isAuth = true
      }
    })
    return isAuth
  } catch (e) {
    return false
  }
  0
}
