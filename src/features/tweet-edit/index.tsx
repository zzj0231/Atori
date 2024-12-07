'use client'

import { Model } from '@/components/Model'
import { WeatherIcon } from '@/icon/weather'
import { useState } from 'react'

import './index.css'

export const TweetEdit = () => {
  const [visible, setVisible] = useState(false)

  const handleClose = () => {
    setVisible(false)
  }

  const handleOk = () => {
    setVisible(false)
  }

  const handleEdit = () => {
    setVisible(true)
  }
  return (
    <>
      <div onClick={handleEdit} className="tweet-edit-icon">
        <WeatherIcon />
      </div>

      <Model visible={visible} onCancel={handleClose} onOk={handleOk}>
        <></>
      </Model>
    </>
  )
}
