'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react'
import Image from 'next/image'
import { NAV_MENU } from '@/const/nav'
import Link from 'next/link'
import { setTheme, updateAppearance } from '@/utils/theme'
import AtoriSvg from '../../../public/atori.svg'
// import Image from 'next/image'

import './index.css'
import { LightIcon } from '@/icon/light'
import { MoonIcon } from '@/icon/moon'
import { autoUpdateRootFontSize } from '@/utils/window'
import { GithubIcon } from '@/icon/github'
import { HomeIcon } from '@/icon/home'

export const NavHeader = () => {
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
    autoUpdateRootFontSize()
  }, [])

  return (
    <div className={'atori-nav'}>
      <div className={'atori-nav-favicon'}>
        <Link href={'/'}>
          {/* <Image alt="home" src={AtoriSvg} width={16} /> */}
          <HomeIcon />
        </Link>
      </div>
      <div className={'atori-nav-menu'}>{options}</div>
      <div className={'atori-nav-extra'}>
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
      </div>
    </div>
  )
}
