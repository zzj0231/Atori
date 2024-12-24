import { VercelPoolClient } from '@/db'

export enum AtroiSchema {
  USERS = 'users',
  TWEETS = 'tweets',
}

export const createUsers = async (db: VercelPoolClient) => {
  const res = { isFinish: false, result: {}, error: '' }
  try {
    await db.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const result = await db.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        )`
    res.isFinish = true
    res.result = result
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'create-fail'
  }
  return res
}

export const createTweets = async (db: VercelPoolClient) => {
  const res = { isFinish: false, result: {}, error: '' }
  try {
    await db.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const result = await db.sql`
        CREATE TABLE IF NOT EXISTS tweets (
        id SERIAL PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        note TEXT NOT NULL,
        img TEXT NOT NULL,
        private BOOLEAN NOT NULL DEFAULT FALSE
        )`
    res.isFinish = true
    res.result = { data: result.rows, total: result.rowCount }
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'create-fail'
  }
  return res
}

export const deleteTable = async (name: string, db: VercelPoolClient) => {
  const res = { isFinish: false, result: {}, error: '' }
  try {
    if (name === AtroiSchema.USERS) {
      await db.sql`DROP TABLE IF EXISTS users;`
    } else if (name === AtroiSchema.TWEETS) {
      await db.sql`DROP TABLE IF EXISTS tweets;`
    }
    res.isFinish = true
  } catch (e) {
    res.error = typeof e === 'string' ? e : 'delete-fail'
  }
  return res
}
