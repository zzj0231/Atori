import fs from 'fs'
import { PhotoPost } from '@/types/photo-wall'
import dayjs from 'dayjs'
import path from 'path'

const photosDirectory = path.join(process.cwd(), 'public', 'photos')

export function getAllPhotos(): PhotoPost[] {
  if (!fs.existsSync(photosDirectory)) {
    return [] as PhotoPost[]
  }

  const filenames = fs.readdirSync(photosDirectory)

  const photos = filenames
    .filter(filename => filename.endsWith('.jpg'))
    .map(filename => {
      const mainInfo = filename.split('.')[0]
      const [type, date, description] = mainInfo.split('-')
      return {
        image: `/photos/${filename}`,
        year: date?.slice(0, 4),
        description,
        date: dayjs(date?.replace(/_/g, '-')).format('YYYY-MM-DD'),
      }
    })

  return photos
}
