/**
 * Model Model 组件
 * @param {afterClose} func Modal完全关闭后的回调
 * @param {bodyStyle} object Modal body的样式
 * @param {cancelText} string | ReactNode 取消按钮文字
 * @param {centered} bool 居中展示 Model
 * @param {closable} bool 是否展示右上角关闭按钮
 * @param {closeIcon} ReactNode 自定义关闭图标
 * @param {destoryOnClose} bool 关闭时销毁Modal里的子元素
 * @param {footer} null|ReactNode 底部内容，当不需要底部默认按钮时，可以设置footer={null}
 * @param {keyboard} bool 是否支持esc按键退出
 * @param {mask} bool 是否展示遮罩
 * @param {maskclosable} bool 点击蒙层是否允许关闭
 * @param {maskStyle} object 遮罩样式
 * @param {okText} string | ReactNode 确认按钮文本
 * @param {title} string | ReactNode 标题内容
 * @param {visible} bool Modal 是否可见
 * @param {width} number Modal 宽度
 * @param {onCancel} func 点击遮罩或者取消按钮，或者键盘esc按键时的回调
 * @param {onOk} func 点击确定的回调
 */

import { siteClassPrefix } from '@/const/style'
import { CSSProperties, ReactNode, useEffect, useState } from 'react'

import './index.css'
import { CloseIcon } from '../../icon/closeIcon'

export interface ModelProps {
  afterClose?: () => void
  bodyStyle?: CSSProperties
  cancelText?: string
  centered?: boolean
  closeable?: boolean
  closeIcon?: ReactNode
  destoryOnClose?: boolean
  footer?: null | ReactNode
  keyboard?: boolean
  mask?: boolean
  maskcloseable?: boolean
  maskStyle?: CSSProperties
  okText?: string
  title?: string
  visible: boolean
  width?: number
  onCancel: () => void
  onOk: () => void
  children: ReactNode
}

// 执行 afterclose 标志
let hiddenCount = 0

export const Model = (props: ModelProps) => {
  const {
    afterClose,
    bodyStyle = {},
    cancelText = '取消',
    centered = true,
    closeable = true,
    closeIcon,
    destoryOnClose = false,
    footer,
    keyboard = true,
    mask = true,
    maskcloseable = true,
    maskStyle = {},
    okText = '确认',
    title,
    visible,
    width = 300,
    onCancel,
    onOk,
    children,
  } = props
  const [isHidden, setHidden] = useState(!visible)
  const [destoryChild, setDestoryChild] = useState(false)

  const handleClose = () => {
    setHidden(true)
    if (destoryOnClose) {
      setDestoryChild(true)
    }
    onCancel?.()
  }

  const hanldeOk = () => {
    onOk?.()
  }

  const closeModal = function (event: Event | null) {
    const e = event || window?.event || arguments.callee.caller.arguments[0]
    if (e && e.keyCode === 27) {
      handleClose()
    }
  }

  const closeMaskAble = () => {
    if (maskcloseable) {
      handleClose()
    }
  }

  // 监听 esc 逻辑
  useEffect(() => {
    if (keyboard) {
      document.addEventListener('keydown', closeModal, false)
      return () => {
        document.removeEventListener('keydown', closeModal, false)
      }
    }
  }, [keyboard])

  // 执行 afterclose 逻辑
  useEffect(() => {
    if (isHidden && hiddenCount === 1) {
      afterClose?.()
      hiddenCount = 0
    }
    hiddenCount = 1
  }, [isHidden])

  // visible/destoryOnclose更新时，重新渲染组件
  useEffect(() => {
    if (visible) {
      if (destoryOnClose) {
        setDestoryChild(false)
      }
      setHidden(false)
    } else {
      setHidden(true)
    }
  }, [visible, destoryOnClose])

  return (
    <div
      className={`${siteClassPrefix}-modal`}
      style={{ display: isHidden ? 'none' : 'block' }}
    >
      <div className={`${siteClassPrefix}-modal-content`} style={{ width }}>
        <div className={`${siteClassPrefix}-modal-header`}>
          <div className={`${siteClassPrefix}-modal-title`}>{title}</div>
        </div>
        {closeable ? (
          <div
            className={`${siteClassPrefix}-mode-closeIcon`}
            onClick={handleClose}
          >
            {closeIcon || <CloseIcon />}
          </div>
        ) : (
          <></>
        )}
        <div className={`${siteClassPrefix}-modal-body`} style={bodyStyle}>
          {destoryChild ? <></> : children}
        </div>
        <div className={`${siteClassPrefix}-modal-footer`}>
          {footer === null ? null : (
            <>
              {footer ? (
                footer
              ) : (
                <div className={`btn-area flex gap-3 justify-self-end`}>
                  <div className="btn-cancel" onClick={handleClose}>
                    {cancelText}
                  </div>
                  <div className="btn-ok" onClick={hanldeOk}>
                    {okText}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {mask && (
        <div
          style={maskStyle}
          className={`${siteClassPrefix}-modal-mask`}
          onClick={closeMaskAble}
        ></div>
      )}
    </div>
  )
}
