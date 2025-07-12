/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from 'next/server'
import {
  generateFileName,
  validateImageFile,
  validateFileSize,
} from '@/lib/oss'

// 动态导入 OSS SDK
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let OSS: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  OSS = require('ali-oss')
} catch (error) {
  console.warn('ali-oss 未安装，OSS 功能将不可用')
}

// 验证 bucket 名称是否符合阿里云 OSS 规范
const validateBucketName = (bucketName: string): boolean => {
  // 阿里云 OSS bucket 命名规范：
  // 1. 长度：3-63 个字符
  // 2. 只能包含小写字母、数字和连字符（-）
  // 3. 不能以连字符开头或结尾
  // 4. 不能包含大写字母、下划线或其他特殊字符

  if (!bucketName || bucketName.length < 3 || bucketName.length > 63) {
    return false
  }

  // 检查是否以连字符开头或结尾
  if (bucketName.startsWith('-') || bucketName.endsWith('-')) {
    return false
  }

  // 检查是否只包含小写字母、数字和连字符
  const validPattern = /^[a-z0-9-]+$/
  if (!validPattern.test(bucketName)) {
    return false
  }

  // 检查是否包含连续连字符
  if (bucketName.includes('--')) {
    return false
  }

  return true
}

// 创建 OSS 客户端
const createOSSClient = () => {
  if (!OSS) {
    throw new Error('OSS SDK 未安装')
  }

  const bucketName = process.env.ALIYUN_OSS_BUCKET!

  // 验证 bucket 名称
  if (!validateBucketName(bucketName)) {
    throw new Error(`Bucket 名称 "${bucketName}" 不符合阿里云 OSS 规范。请确保：
    1. 长度在 3-63 个字符之间
    2. 只包含小写字母、数字和连字符（-）
    3. 不能以连字符开头或结尾
    4. 不能包含大写字母、下划线或其他特殊字符`)
  }

  const config = {
    accessKeyId: process.env.ALIYUN_OSS_ACCESS_KEY_ID!,
    accessKeySecret: process.env.ALIYUN_OSS_ACCESS_KEY_SECRET!,
    bucket: bucketName,
    endpoint: process.env.ALIYUN_OSS_ENDPOINT!,
  }

  return new OSS(config)
}

// 上传到 OSS
const uploadToOSS = async (
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> => {
  const client = createOSSClient()

  const result = await client.put(fileName, file, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'max-age=31536000',
    },
  })

  const config = {
    bucket: process.env.ALIYUN_OSS_BUCKET!,
    endpoint: process.env.ALIYUN_OSS_ENDPOINT!,
  }

  return `https://${config.bucket}.${config.endpoint}/${fileName}`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ error: '没有找到图片文件' }, { status: 400 })
    }

    // 验证文件类型
    if (!validateImageFile(file)) {
      return NextResponse.json({ error: '只支持图片文件' }, { status: 400 })
    }

    // 验证文件大小 (5MB)
    if (!validateFileSize(file, 5)) {
      return NextResponse.json(
        { error: '图片大小不能超过5MB' },
        { status: 400 }
      )
    }

    // 生成唯一文件名
    const fileName = generateFileName(file.name)

    // 转换文件为 Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 上传到阿里云 OSS
    const imageUrl = await uploadToOSS(buffer, fileName, file.type)

    return NextResponse.json({
      success: true,
      imageUrl,
      fileName, // 保存文件名用于后续删除
      message: '图片上传成功',
    })
  } catch (error) {
    console.error('图片上传错误:', error)
    return NextResponse.json({ error: '图片上传失败' }, { status: 500 })
  }
}
