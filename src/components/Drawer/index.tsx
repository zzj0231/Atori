/**
 *
 * Drawer 组件
 * @param {visible} boolean 抽屉是否可见
 * @param {closable} bool 是否显示右上角的关闭按钮
 * @param {destroyOnClose} bool 关闭时销毁里面的子元素
 * @param {getContainer} HTMLElement 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom
 * @param {maskClosable} bool 点击蒙层是否允许关闭抽屉
 * @param {mask} bool 是否展示遮罩
 * @param {drawerStyle} object 用来设置抽屉弹出层样式
 * @param {width} number|string 弹出层宽度
 * @param {zIndex} number 弹出层层级
 * @param {placement} string 抽屉方向
 * @param {onClose} function 点击关闭时的回调
 */

import { siteClassPrefix } from '@/const/style'
import { CloseIcon } from '@/icon/closeIcon'
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

export interface DrawerProps {
  visible: boolean
  closeable?: boolean
  destroyOnClose?: boolean
  getContainer?: HTMLElement | false
  maskClosable?: boolean
  mask?: boolean
  drawerStyle?: CSSProperties
  width?: number
  zIndex?: number
  placement?: 'left' | 'right' | 'top' | 'bottom'
  onClose?: () => void
  children: ReactNode
}

export const Drawer = (props: DrawerProps) => {
  const {
    visible,
    closeable = true,
    destroyOnClose = false,
    maskClosable = true,
    mask = true,
    drawerStyle = {},
    width = 300,
    placement = 'right',
    children = <></>,
    onClose,
    getContainer = document.body,
    zIndex = 999,
  } = props

  const [isHidden, setIsHidden] = useState(!visible)
  const [destoryChild, setDestoryChild] = useState(false)

  const handleClose = useCallback(() => {
    setIsHidden(true)
    if (destroyOnClose) {
      setDestoryChild(true)
    }
    if (getContainer !== undefined && getContainer !== false && isHidden) {
      getContainer.style.overflow = 'auto'
    }

    onClose?.()
  }, [destroyOnClose, onClose, getContainer, isHidden])

  const handleMaseClose = useCallback(() => {
    if (maskClosable) {
      handleClose()
    }
  }, [maskClosable, handleClose])

  const handleEscClose = function (event: Event | null) {
    const e = event || window?.event || arguments.callee.caller.arguments[0]
    if (e && e.keyCode === 27) {
      handleClose()
    }
  }

  console.log('isHidden', isHidden)

  useEffect(() => {
    if (visible) {
      setIsHidden(false)
      if (destroyOnClose) {
        setDestoryChild(false)
      }
      if (getContainer !== undefined && getContainer !== false) {
        getContainer.style.overflow = 'hidden'
      }
    }
  }, [visible, destroyOnClose, getContainer])

  // 监听 esc 逻辑
  useEffect(() => {
    document.addEventListener('keydown', handleEscClose, false)
    return () => {
      document.removeEventListener('keydown', handleEscClose, false)
    }
  }, [])

  const childDom = (
    <>
      <div
        className={`${siteClassPrefix}-drawer`}
        style={{
          position: getContainer === false ? 'absolute' : 'fixed',
          width: !isHidden ? '100%' : '0',
          zIndex: !isHidden ? zIndex : 0,
        }}
      >
        {mask ? (
          <div
            className={`${siteClassPrefix}-drawer-mask`}
            onClick={handleMaseClose}
          />
        ) : (
          <></>
        )}

        <div
          className={`${siteClassPrefix}-drawer-content`}
          style={{
            [placement]: isHidden ? '-100%' : 0,
            width,
            ...drawerStyle,
          }}
        >
          <div className={`${siteClassPrefix}-drawer-header`}>
            {closeable ? (
              <div
                className={`${siteClassPrefix}-drawer-closeIcon`}
                onClick={handleClose}
              >
                {<CloseIcon />}
              </div>
            ) : (
              <></>
            )}
          </div>
          <>{!destoryChild ? children : null}</>
        </div>
      </div>
    </>
  )

  // prettier-ignore
  return getContainer === false ? childDom : ReactDOM.createPortal(childDom, getContainer)
}
