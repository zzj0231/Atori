import { message } from '@/components/Message'

// 生成唯一的文件名
export const generateFileName = (originalName: string): string => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const fileExtension = originalName.split('.').pop()
  return `atori/${timestamp}-${randomString}.${fileExtension}`
}

// 验证文件类型
export const validateImageFile = (file: File): boolean => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ]
  return allowedTypes.includes(file.type)
}

// 验证文件大小
export const validateFileSize = (
  file: File,
  maxSizeMB: number = 5
): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024
}

// 上传文件到 OSS（通过 API 路由）
export const uploadToOSS = async (
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('image', new Blob([file], { type: contentType }), fileName)

    const response = await fetch('/api/upload-image-oss', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || '上传失败')
    }

    return result.imageUrl
  } catch (error) {
    console.error('OSS 上传失败:', error)
    message?.error('OSS 上传失败')
    throw new Error('文件上传失败')
  }
}

// 从 OSS 删除文件（通过 API 路由）
export const deleteFromOSS = async (fileName: string): Promise<void> => {
  try {
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
    message?.success('文件删除成功')
  } catch (error) {
    console.error('OSS 删除失败:', error)
    message?.error('文件删除失败')
    throw new Error('文件删除失败')
  }
}
