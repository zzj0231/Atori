import { Label } from '@/components/Label'
import { COUNTRIES, RE_THEME_TYPE } from '@/const/reviews'
import { useCallback, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { DeleteIcon } from '@/icon/delete'
import './index.css'

export const ReviewsEditArea = () => {
  const labelRecordRef = useRef<string[]>([])
  const reviewsTextRef = useRef<string>('')
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const countrySelectRef = useRef<HTMLSelectElement>(null)
  const authorInputRef = useRef<HTMLInputElement>(null)

  const handleLabelClick = useCallback(
    (params: { label: string; active: boolean }) => {
      if (params?.active) {
        labelRecordRef.current.push(params?.label)
      } else {
        labelRecordRef.current = labelRecordRef.current.filter(
          item => item !== params.label
        )
      }
    },
    []
  )

  const handleReviewsTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      reviewsTextRef.current = e.target.value
    },
    []
  )

  const handleCoverClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
          alert('请选择图片文件')
          return
        }

        // 验证文件大小 (限制为5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('图片大小不能超过5MB')
          return
        }

        setIsLoading(true)
        const reader = new FileReader()
        reader.onload = event => {
          setCoverImage(event.target?.result as string)
          setIsLoading(false)
        }
        reader.onerror = () => {
          alert('图片加载失败，请重试')
          setIsLoading(false)
        }
        reader.readAsDataURL(file)
      }
    },
    []
  )

  const handleRemoveCover = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setCoverImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          alert('图片大小不能超过5MB')
          return
        }

        setIsLoading(true)
        const reader = new FileReader()
        reader.onload = event => {
          setCoverImage(event.target?.result as string)
          setIsLoading(false)
        }
        reader.onerror = () => {
          alert('图片加载失败，请重试')
          setIsLoading(false)
        }
        // 开始读取文件，转换为 Data URL
        reader.readAsDataURL(file)
      } else {
        alert('请选择图片文件')
      }
    }
  }, [])

  // 获取封面数据，用于保存
  const getCoverData = useCallback(() => {
    return coverImage
  }, [coverImage])

  // 获取表单数据
  const getFormData = useCallback(() => {
    return {
      cover: coverImage,
      labels: labelRecordRef.current,
      content: reviewsTextRef.current,
      country: countrySelectRef.current?.value || '',
      author: authorInputRef.current?.value || '',
    }
  }, [coverImage])

  // 保存表单数据
  const handleSave = useCallback(() => {
    const formData = getFormData()

    // 验证必填字段
    if (!formData.content.trim()) {
      alert('请输入评论内容')
      return
    }

    if (!formData.author.trim()) {
      alert('请输入作者姓名')
      return
    }

    if (!formData.country) {
      alert('请选择国家/地区')
      return
    }

    // 这里可以调用API保存数据
    console.log('保存的数据:', formData)
    alert('保存成功！')

    // 可以在这里添加实际的保存逻辑
    // 例如：调用API、跳转页面等
  }, [getFormData])

  const labelItems = useMemo(() => {
    return RE_THEME_TYPE.map(item => {
      return (
        <Label name={item.label} key={item.key} onClick={handleLabelClick} />
      )
    })
  }, [handleLabelClick])

  return (
    <div className="flex gap-4 reviews-edit-wrapper">
      <div className="w-[20rem] flex flex-col gap-2 items-center">
        <div
          className={`reviews-edit-image w-[13rem] h-[18.6rem] flex items-center justify-center relative cursor-pointer hover:opacity-80 transition-opacity ${coverImage ? 'has-image' : ''}`}
          onClick={handleCoverClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto mb-2"></div>
              <span className="text-sm text-gray-500">处理中...</span>
            </div>
          ) : coverImage ? (
            <>
              <Image
                src={coverImage}
                alt="封面"
                fill
                className="object-cover rounded"
              />
              <button
                onClick={handleRemoveCover}
                className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                title="删除封面"
              >
                <DeleteIcon />
              </button>
            </>
          ) : (
            <div className="text-center">
              <span className="text-gray-500 block mb-2">+封面</span>
              <span className="text-xs text-gray-400 block">点击上传图片</span>
              <span className="text-xs text-gray-400 block">
                支持 JPG、PNG、WebP
              </span>
              <span className="text-xs text-gray-400 block">最大 5MB</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-full flex gap-2.5 flex-wrap">
          <span>标签:</span>
          <>{labelItems}</>
        </div>
      </div>
      <div className="w-[70rem] flex flex-col gap-4 relative">
        {/* 矩形保存按钮 - 绝对定位在顶部 */}
        <button
          onClick={handleSave}
          className="absolute right-0 top-[-7rem] px-3 py-1.5 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 z-50 save-button"
          title="保存评论"
        >
          保存
        </button>

        {/* 国家选择和作者输入框 - 同一行 */}
        <div className="flex gap-4">
          {/* 国家选择框 */}
          <div className="flex flex-col gap-2 flex-1">
            <select
              ref={countrySelectRef}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">国家/地区</option>
              {COUNTRIES.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* 作者输入框 */}
          <div className="flex flex-col gap-2 flex-1">
            <input
              ref={authorInputRef}
              type="text"
              placeholder="请输入作者姓名"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 评论内容输入框 */}
        <div className="flex flex-col gap-2 flex-1">
          <textarea
            placeholder="内容..."
            className="w-full flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none reviews-edit-textarea"
            style={{
              minHeight: '40rem',
            }}
            onChange={handleReviewsTextChange}
          />
        </div>
      </div>
    </div>
  )
}
