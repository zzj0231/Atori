export interface PhotoPost {
  image: string
  year: string
  description: string
  date: string
}

export interface PhotoWallGroup {
  year: string
  photos: PhotoPost[]
}
