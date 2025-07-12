// 云存储配置和工具类
export interface StorageConfig {
  type: 'local' | 'cloudinary' | 'aws-s3' | 'aliyun-oss'
  endpoint?: string
  apiKey?: string
  apiSecret?: string
  bucket?: string
  region?: string
}

export class CloudStorage {
  private config: StorageConfig

  constructor(config: StorageConfig) {
    this.config = config
  }

  // 上传图片到云存储
  async uploadImage(file: File): Promise<string> {
    switch (this.config.type) {
      case 'local':
        return this.uploadToLocal(file)
      case 'cloudinary':
        return this.uploadToCloudinary(file)
      case 'aws-s3':
        return this.uploadToS3(file)
      case 'aliyun-oss':
        return this.uploadToAliyunOSS(file)
      default:
        throw new Error('不支持的存储类型')
    }
  }

  // 上传到本地存储
  private async uploadToLocal(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('本地存储上传失败')
    }

    const data = await response.json()
    return data.imageUrl
  }

  // 上传到Cloudinary
  private async uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', this.config.apiKey || '')

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.config.bucket}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error('Cloudinary上传失败')
    }

    const data = await response.json()
    return data.secure_url
  }

  // 上传到AWS S3
  private async uploadToS3(file: File): Promise<string> {
    // 这里需要AWS SDK，简化实现
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', this.config.bucket || '')
    formData.append('region', this.config.region || '')

    const response = await fetch('/api/upload-s3', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('S3上传失败')
    }

    const data = await response.json()
    return data.url
  }

  // 上传到阿里云OSS
  private async uploadToAliyunOSS(file: File): Promise<string> {
    // 这里需要阿里云OSS SDK，简化实现
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', this.config.bucket || '')

    const response = await fetch('/api/upload-oss', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('阿里云OSS上传失败')
    }

    const data = await response.json()
    return data.url
  }

  // 删除图片
  async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      const response = await fetch('/api/delete-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      })

      return response.ok
    } catch (error) {
      console.error('删除图片失败:', error)
      return false
    }
  }
}

// 创建存储实例
export const createStorage = (config: StorageConfig) => {
  return new CloudStorage(config)
}

// 默认配置
export const defaultStorage = createStorage({
  type: 'local', // 默认使用本地存储
})
