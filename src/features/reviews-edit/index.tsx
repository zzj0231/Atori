import { Label } from '@/components/Label'
import { COUNTRIES, RE_CUSTOME_TYPE, RE_THEME_TYPE } from '@/const/reviews'
import { useCallback, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { DeleteIcon } from '@/icon/delete'
import { SaveButton } from '@/components/SaveButton'
import { message } from '@/components/Message'
import './index.css'
import { formatCurrentTime, getCurrentTime } from '@/utils/common'
import { postNewReviews } from '@/server/reviews'
import { ReviewProps } from '@/types/schema'
import { useRouter } from 'next/navigation'

export const ReviewsEditArea = () => {
  const labelRecordRef = useRef<string>('')
  const reviewsTextRef = useRef<string>('')
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [coverFileName, setCoverFileName] = useState<string | null>(null) // 保存 OSS 文件名用于删除
  const [coverDataUrl, setCoverDataUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const countrySelectRef = useRef<HTMLSelectElement>(null)
  const authorInputRef = useRef<HTMLInputElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleLabelClick = useCallback(
    (params: { label: string; active: boolean }) => {
      if (params?.active) {
        // 如果当前标签不在字符串中，则添加
        if (!labelRecordRef.current.includes(params.label)) {
          labelRecordRef.current = labelRecordRef.current
            ? `${labelRecordRef.current},${params.label}`
            : params.label
        }
      } else {
        // 移除标签
        const labels = labelRecordRef.current
          .split(',')
          .filter(label => label !== params.label)
        labelRecordRef.current = labels.join(',')
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

  // 上传图片到 OSS
  const uploadImageToOSS = useCallback(
    async (file: File): Promise<{ imageUrl: string; fileName: string }> => {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload-image-oss', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '上传失败')
      }

      return {
        imageUrl: result.imageUrl,
        fileName: result.fileName, // 返回 OSS 中的文件名
      }
    },
    []
  )

  // 删除 OSS 中的图片
  const deleteImageFromOSS = useCallback(
    async (fileName: string): Promise<void> => {
      const response = await fetch('/api/delete-image-oss', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '删除失败')
      }
    },
    []
  )

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
          message.error('请选择图片文件')
          return
        }

        // 验证文件大小 (限制为5MB)
        if (file.size > 5 * 1024 * 1024) {
          message.error('图片大小不能超过5MB')
          return
        }

        setIsLoading(true)
        try {
          // 如果有旧图片，先删除
          if (coverFileName) {
            try {
              await deleteImageFromOSS(coverFileName)
            } catch (error) {
              console.error('删除旧图片失败:', error)
              // 继续上传新图片，不阻止流程
            }
          }

          // 上传到 OSS
          const { imageUrl, fileName } = await uploadImageToOSS(file)
          setCoverDataUrl(URL.createObjectURL(file))
          setCoverImage(imageUrl)
          setCoverFileName(fileName) // 保存 OSS 文件名
          message.success('图片上传成功')
        } catch (error) {
          console.error('图片上传失败:', error)
          message.error('图片上传失败，请重试')
        } finally {
          setIsLoading(false)
        }
      }
    },
    [uploadImageToOSS, coverFileName, deleteImageFromOSS]
  )

  const handleRemoveCover = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation()

      // 如果有 OSS 文件名，先删除 OSS 中的文件
      if (coverFileName) {
        try {
          await deleteImageFromOSS(coverFileName)
          message.success('图片删除成功')
        } catch (error) {
          console.error('删除 OSS 图片失败:', error)
          message.error('删除图片失败，但已从界面移除')
        }
      }

      // 清除本地状态
      setCoverDataUrl(null)
      setCoverImage(null)
      setCoverFileName(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [coverFileName, deleteImageFromOSS]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const files = e.dataTransfer.files
      if (files.length > 0) {
        const file = files[0]
        if (file.type.startsWith('image/')) {
          if (file.size > 5 * 1024 * 1024) {
            message.error('图片大小不能超过5MB')
            return
          }

          setIsLoading(true)
          try {
            // 如果有旧图片，先删除
            if (coverFileName) {
              try {
                await deleteImageFromOSS(coverFileName)
              } catch (error) {
                console.error('删除旧图片失败:', error)
                // 继续上传新图片，不阻止流程
              }
            }

            // 上传到 OSS
            const { imageUrl, fileName } = await uploadImageToOSS(file)
            setCoverImage(imageUrl)
            setCoverFileName(fileName) // 保存 OSS 文件名
            message.success('图片上传成功')
          } catch (error) {
            console.error('图片上传失败:', error)
            message.error('图片上传失败，请重试')
          } finally {
            setIsLoading(false)
          }
        } else {
          message.error('请选择图片文件')
        }
      }
    },
    [uploadImageToOSS, coverFileName, deleteImageFromOSS]
  )

  // 获取封面数据，用于保存
  const getCoverData = useCallback(() => {
    return {
      imageUrl: coverImage,
      fileName: coverFileName,
    }
  }, [coverImage, coverFileName])

  // 获取表单数据
  const getFormData = useCallback(() => {
    return {
      cover: coverImage || '',
      coverFileName: coverFileName || '',
      labels: labelRecordRef.current,
      content: reviewsTextRef.current,
      country: countrySelectRef.current?.value || '',
      author: authorInputRef.current?.value || '',
      title: titleInputRef.current?.value || '',
    }
  }, [coverImage, coverFileName])

  const validateFormData = useCallback(
    (formData: {
      content: string
      title: string
      author: string
      country: string
    }) => {
      if (!formData.content.trim()) {
        message.error('请输入评论内容')
        return false
      }
      if (!formData.title.trim()) {
        message.error('请输入作品名称')
        return false
      }
      if (!formData.author.trim()) {
        message.error('请输入作者姓名')
        return false
      }
      if (!formData.country) {
        message.error('请选择国家/地区')
        return false
      }
      return true
    },
    []
  )

  // 保存表单数据
  const handleSave = useCallback(async () => {
    const formData = getFormData()
    // 验证必填字段
    if (!validateFormData(formData)) {
      return
    }
    const currentTime = getCurrentTime()
    const params = {
      ...formData,
      date: currentTime,
      private: false,
    } as ReviewProps
    const { code } = await postNewReviews(params)
    if (code === 2000) {
      message.success('保存成功！')
      router.replace('/reviews')
    } else {
      message.error('保存失败！')
    }
  }, [getFormData, validateFormData, router])

  const labelItems = useMemo(() => {
    const labelTypes = [...RE_THEME_TYPE, ...RE_CUSTOME_TYPE]
    return labelTypes.map(item => {
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
              <span className="text-sm text-gray-500">上传中...</span>
            </div>
          ) : coverImage ? (
            <>
              <Image
                src={coverDataUrl || ''}
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
        <SaveButton handleOk={handleSave} />

        {/* 作品名称输入框 */}
        <div className="flex flex-col gap-2">
          <input
            ref={titleInputRef}
            type="text"
            placeholder="请输入作品名称"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

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
