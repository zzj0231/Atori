'use client'

import { NAV_MENU } from '@/const/nav'
import { setTheme, updateAppearance } from '@/utils/theme'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
// import Image from 'next/image'
import { GithubIcon } from '@/icon/github'
import { HomeIcon } from '@/icon/home'
import { LightIcon } from '@/icon/light'
import { MoonIcon } from '@/icon/moon'
import { SettingIcon } from '@/icon/setting'
import { CameraIcon } from '@/icon/camera'
import { autoUpdateRootFontSize } from '@/utils/window'
import { SettingDrawer } from './setting-drawer'
import { ResponseDrop } from '@/components'

import './index.css'

export const NavHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // 监听滚动事件，实现 Headroom 效果
  useEffect(() => {
    const scrollTarget = document.querySelector('body') as Element
    const handleScroll = () => {
      const currentScrollY = scrollTarget.scrollTop
      // 滚动距离小于一定阈值时始终显示
      if (currentScrollY < 50) {
        setIsVisible(true)
        setLastScrollY(currentScrollY)
        return
      }
      // 向下滚动时隐藏，向上滚动时显示
      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    // 使用节流优化性能
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    scrollTarget.addEventListener('scroll', scrollListener, { passive: true })
    return () => {
      scrollTarget.removeEventListener('scroll', scrollListener)
    }
  }, [lastScrollY])

  // 菜单项
  const options = useMemo(() => {
    const menus = NAV_MENU
    return menus.map(item => {
      return (
        <Link key={item?.key} href={item?.url}>
          <span className="menu-item">{item.label}</span>
        </Link>
      )
    })
  }, [])

  const mobileOptions = useMemo(() => {
    const menus = NAV_MENU
    return menus.map(item => {
      return (
        <Link key={item?.key} href={item?.url}>
          <span className="menu-item mobile">{item.label}</span>
        </Link>
      )
    })
  }, [])

  const handleDarkTheme = useCallback(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      setTheme('dark')
    }
  }, [])

  const handleMoonTheme = useCallback(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      setTheme('light')
    }
  }, [])

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    updateAppearance()
  }

  useEffect(() => {
    window.addEventListener('storage', updateAppearance)
    return () => {
      window.removeEventListener('storage', updateAppearance)
    }
  }, [])

  useLayoutEffect(() => {
    const clear = autoUpdateRootFontSize()
    return () => {
      clear?.()
    }
  }, [])

  return (
    <>
      <div className={'atori-nav-wrapper'}>
        <div className={'atori-nav'}>
          <div className={'atori-nav-favicon'}>
            <Link href={'/'}>
              {/* <Image alt="home" src={AtoriSvg} width={16} /> */}
              <HomeIcon />
            </Link>
          </div>
          {/* <div className={'flex-1'}></div> */}
          <div
            className={`atori-nav-operation ${isVisible ? 'visible' : 'hidden'} ${lastScrollY < 180 ? '' : 'card'}`}
          >
            <div className={'atori-nav-menu'}>
              <ResponseDrop
                align="right"
                desktopContent={<>{options}</>}
                mobileContent={<>{mobileOptions}</>}
              />
            </div>

            <div className={'atori-nav-extra'}>
              <div className="atroi-nav-icon camera">
                <Link href={'/photo-wall'}>
                  <CameraIcon />
                </Link>
              </div>
              <a
                className="atroi-nav-icon"
                href={'https://github.com/zzj0231'}
                target="_blank"
              >
                <GithubIcon />
              </a>
              <div className="atroi-nav-icon light" onClick={handleDarkTheme}>
                <LightIcon />
              </div>
              <div className="atroi-nav-icon moon" onClick={handleMoonTheme}>
                <MoonIcon />
              </div>
              <div className="atroi-nav-icon" onClick={() => setIsOpen(true)}>
                <SettingIcon />
              </div>
            </div>
          </div>
          <SettingDrawer visible={isOpen} handleVisible={setIsOpen} />
        </div>
      </div>
    </>
  )
}
