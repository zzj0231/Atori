import { TweetsProps, UsersProps } from '@/types/schema'
import { VercelPoolClient } from '@vercel/postgres'

export const getUsers = async (db: VercelPoolClient) => {
  const res = { result: {}, error: '', isFinish: false }
  try {
    const result = await db.sql`select * from users`
    res.result = { data: result.rows, total: result.rowCount }
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const getTweets = async (db: VercelPoolClient) => {
  const res = { result: {}, error: '', isFinish: false }
  try {
    const result = await db.sql`select * from tweets`
    res.result = { data: result.rows, total: result.rowCount }
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const postUsers = async (data: UsersProps, db: VercelPoolClient) => {
  const res = { result: {}, error: '', isFinish: false }
  try {
    const result = await db.sql`
      INSERT INTO users (name,email,password) 
      VALUES (${data?.name},${data?.email},${data?.password}) 
      ON CONFLICT (id) DO NOTHING;`
    res.result = result
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const postTweets = async (data: TweetsProps, db: VercelPoolClient) => {
  const res = { result: {}, error: '', isFinish: false }
  try {
    const result = await db.sql`
      INSERT INTO tweets (note, author, date, img, private)
      VALUES (${data?.note}, ${data?.author}, ${data?.date}, ${data?.img}, ${data?.private});
      `
    res.result = result
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const updateUser = async (data: UsersProps, db: VercelPoolClient) => {
  const res = { result: {}, error: '', isFinish: false }
  const { id, name, ...rest } = data
  const keys = Object.keys(rest)
  const values = Object.values(rest)
  const upString = keys?.map((k, index) => `${k}=${values[index]}`).join(',')
  try {
    const result = await db.sql`UPDATE users 
    SET password=${rest?.password}, email=${rest?.email}
    WHERE name=${name};`
    res.result = result
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const updateTweetNote = async (
  data: { id: string } & { note: string },
  db: VercelPoolClient
) => {
  const res = { result: {}, error: '', isFinish: false }
  const { id } = data
  try {
    const result = await db.sql`UPDATE tweets 
    SET note=${data?.note} 
    WHERE id=${id};`
    res.result = result
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const deleteUserByName = async (name: string, db: VercelPoolClient) => {
  const res = { result: {}, error: '', isFinish: false }
  try {
    const result = await db.sql`DELETE FROM users WHERE name=${name};`
    res.result = result
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const deleteTweetById = async (id: string, db: VercelPoolClient) => {
  const res = { result: {}, error: '', isFinish: false }
  try {
    const result = await db.sql`DELETE FROM tweets WHERE id=${id};`
    res.result = result
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}
