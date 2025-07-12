import { ReviewProps, TweetsProps, UsersProps } from '@/types/schema'
import { VercelPoolClient } from '@vercel/postgres'

// Reviews 类型定义

export const getUsers = async (db: VercelPoolClient) => {
  const res = {
    result: {} as { data: UsersProps[]; total: number | null },
    error: '',
    isFinish: false,
  }
  try {
    const result = await db.sql`select * from users`
    res.result = { data: result.rows as UsersProps[], total: result.rowCount }
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const getTweets = async (db: VercelPoolClient) => {
  const res = {
    result: {} as { data: TweetsProps[]; total: number | null },
    error: '',
    isFinish: false,
  }
  try {
    const result = await db.sql`select * from tweets`
    res.result = { data: result.rows as TweetsProps[], total: result.rowCount }
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

export const deleteTweetById = async (
  id: string | number,
  db: VercelPoolClient
) => {
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

// Reviews 相关查询函数
export const getReviews = async (db: VercelPoolClient) => {
  const res = {
    result: {} as { data: ReviewProps[]; total: number | null },
    error: '',
    isFinish: false,
  }
  try {
    const result = await db.sql`SELECT * FROM reviews ORDER BY date DESC`
    res.result = { data: result.rows as ReviewProps[], total: result.rowCount }
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const postReview = async (data: ReviewProps, db: VercelPoolClient) => {
  const res = { result: {}, error: '', isFinish: false }
  try {
    const result = await db.sql`
      INSERT INTO reviews (author, labels, content, title, country, cover, coverFileName, private, date)
      VALUES (${data.author}, ${data.labels}, ${data.content}, ${data.title || ''}, ${data.country}, ${data.cover}, ${data.coverFileName}, ${data.private || false}, ${data.date});
    `
    res.result = result
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const updateReview = async (
  data: {
    id: number
    author?: string
    labels?: string
    content?: string
    title?: string
    country?: string
    cover?: string
    coverFileName?: string
    private?: boolean
  },
  db: VercelPoolClient
) => {
  const res = { result: {}, error: '', isFinish: false }
  try {
    const result = await db.sql`
      UPDATE reviews 
      SET 
        author = COALESCE(${data.author}, author),
        labels = COALESCE(${data.labels}, labels),
        content = COALESCE(${data.content}, content),
        title = COALESCE(${data.title}, title),
        country = COALESCE(${data.country}, country),
        cover = COALESCE(${data.cover}, cover),
        coverFileName = COALESCE(${data.coverFileName}, coverFileName),
        private = COALESCE(${data.private}, private)
      WHERE id = ${data.id};
    `
    res.result = result
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}

export const deleteReviewById = async (
  id: number | string,
  db: VercelPoolClient
) => {
  const res = { result: {}, error: '', isFinish: false }
  try {
    const result = await db.sql`DELETE FROM reviews WHERE id=${id};`
    res.result = result
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'unkonw-error'
  }
  return res
}
