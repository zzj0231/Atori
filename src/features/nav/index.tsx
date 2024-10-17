'use client'

import { useCallback, useEffect, useMemo } from 'react'
import './index.css'
import { NAV_MENU } from '@/const/nav'
import Link from 'next/link'
import { setTheme, updateAppearance } from '@/utils/theme'

export const NavHeader = () => {
  const options = useMemo(() => {
    const menus = NAV_MENU
    return menus.map(item => {
      return (
        <Link key={item?.key} href={item?.url}>
          {item.label}
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

  return (
    <div className={'atori-nav'}>
      <div className={'atori-nav-favicon'}>
        <Link href={'/'}>Home</Link>
      </div>
      <div className={'atori-nav-menu'}>{options}</div>
      <div className={'atori-nav-extra'}>
        <div className="atroi-nav-icon-light" onClick={handleDarkTheme}></div>
        <div className="atroi-nav-icon-moon" onClick={handleMoonTheme}></div>
      </div>
    </div>
  )
}
