'use client'

import { MessageExampleWrapper } from '@/components/Message/example'

export default function MessageDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Message 组件演示
        </h1>
        <MessageExampleWrapper />
      </div>
    </div>
  )
}
