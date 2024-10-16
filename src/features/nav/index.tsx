import { useMemo } from 'react'
import styles from './index.module.css'
import { NAV_MENU } from '@/const/nav'
import Link from 'next/link'

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

  return (
    <div className={styles['nav']}>
      <div className={styles['nav-icon']}>
        <Link href={'/'}>Home</Link>
      </div>
      <div className={styles['nav-menu']}>{options}</div>
      <div className={styles['nav-extra']}></div>
    </div>
  )
}
