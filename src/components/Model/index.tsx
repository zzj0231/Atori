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
import { CSSProperties, ReactNode } from 'react'

export interface ModelProps {
  afterClose: () => void
  bodyStyle: CSSProperties
  cancelText: string
  centered: boolean
  closeable: boolean
  closeIcon: ReactNode
  destoryOnClose: boolean
  footer: null | ReactNode
  keyboard: boolean
  mask: boolean
  maskcloseable: boolean
  maskStyle: CSSProperties
  okText: string
  title: string
  visible: boolean
  width: number
  onCancel: () => void
  onOk: () => void
}

export const Model = (props: ModelProps) => {
  const {
    afterClose,
    bodyStyle,
    cancelText,
    centered,
    closeable,
    closeIcon,
    destoryOnClose,
    footer,
    keyboard,
    mask,
    maskcloseable,
    maskStyle,
    okText,
    title,
    visible,
    width,
    onCancel,
    onOk,
  } = props

  return (
    <div className={`${siteClassPrefix}-modal`}>
      <div className={`${siteClassPrefix}-modal-header`}></div>
      <div className={`${siteClassPrefix}-modal-content`}></div>
      <div className={`${siteClassPrefix}-modal-footer`}></div>
    </div>
  )
}
