export interface UsersProps {
  id?: string
  name: string
  email: string
  password: string
}

export interface TweetsProps {
  id?: string
  date: string
  private: boolean
  img: string
  note: string
  author: string
}

export interface ReviewProps {
  id: number | string
  author: string
  date: string
  labels: string
  content: string
  title: string // 作品名称
  country: string
  cover: string
  coverFileName: string | null
  private?: boolean
  stars?: number
}
