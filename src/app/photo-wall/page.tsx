import BounceCards from '@/components/BounceCard'
import { photoClPre } from '@/const/style'
import { getAllPhotos } from '@/lib/photos'
import { PhotoWallGroup } from '@/types/photo-wall'
import { SiderNav } from '@/components/SiderNav'

import './index.css'

export default function PhotoWall() {
  // 服务端执行 - 获取照片数据
  const photos = getAllPhotos()

  // 按年份分组照片，并按年份降序排列（最新的在上面）
  const photosByYear: PhotoWallGroup[] = photos
    .reduce((acc, photo) => {
      const existingYear = acc.find(group => group.year === photo.year)
      if (existingYear) {
        existingYear.photos.push(photo)
      } else {
        acc.push({ year: photo.year, photos: [photo] })
      }
      return acc
    }, [] as PhotoWallGroup[])
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))

  // 生成动态的 transform styles
  const generateTransformStyles = (count: number) => {
    const styles = []
    for (let i = 0; i < count; i++) {
      const angle = 0 // -10deg 到 10deg 随机角度
      const translateX = i * 0 // 水平分布
      const translateY = 0 // -20px 到 20px 随机垂直偏移
      styles.push(
        `rotate(${angle.toFixed(1)}deg) translate(${translateX}px, ${translateY}px)`
      )
    }
    return styles
  }

  const sideYearList = photosByYear.map(yearGroup => yearGroup.year)

  return (
    <div className={`${photoClPre}-wall flex justify-between`}>
      <div className="flex-1">
        {photosByYear.map(yearGroup => {
          const images = yearGroup.photos.map(photo => photo.image)
          const transformStyles = generateTransformStyles(images.length)

          const photosData = yearGroup.photos.map(photo => ({
            src: photo.image,
            year: photo.year,
            date: photo.date,
            description: photo.description,
          }))

          return (
            <div key={yearGroup.year} className="mb-4" id={yearGroup.year}>
              <div className="year-title font-bold text-[2.5rem] mb-4">
                {yearGroup.year}
              </div>
              <BounceCards
                className="custom-bounceCards"
                images={images}
                photosData={photosData}
                containerWidth={300}
                containerHeight={250}
                animationDelay={1}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.5)"
                transformStyles={transformStyles}
                enableHover={true}
              />
            </div>
          )
        })}
      </div>
      <div className="w-[4rem]" />
      {sideYearList.length > 0 && (
        <SiderNav
          content={sideYearList.map(year => ({ name: year, id: year }))}
        />
      )}
    </div>
  )
}
