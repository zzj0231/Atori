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
          <div className={'flex-1'}></div>
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
          <SettingDrawer visible={isOpen} handleVisible={setIsOpen} />
        </div>
      </div>
    </>
  )
}
