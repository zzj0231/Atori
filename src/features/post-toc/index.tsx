'use client'

import { useEffect, useState } from 'react'

type Heading = {
  level: number
  text: string
  slug: string
}

interface PostTocProps {
  headings: Heading[]
}

/**
 * 博文目录（右侧侧边导航）
 * 参考 SiderNav 的滑块高亮方案，支持平滑滚动与滚动联动。
 */
export function PostToc({ headings }: PostTocProps) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (headings.length > 0) {
      setActive(headings[0].slug)
    }
  }, [headings])

  useEffect(() => {
    if (headings.length === 0) return

    const ids = headings.map(h => h.slug)
    const observer = new IntersectionObserver(
      entries => {
        // 选择进入视口且顶部最靠前的标题作为激活项
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          const id = visible[0].target.getAttribute('id')
          if (id) {
            setActive(prev => (prev === id ? prev : id))
          }
        }
      },
      {
        rootMargin: '-20% 0% -60% 0%', // 提前激活，避免滚动到顶部才切换
        threshold: [0, 0.1, 0.25],
      }
    )

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollTo = (slug: string) => {
    const el = document.getElementById(slug)
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
      setActive(slug)
    }
  }

  if (!headings.length) return null

  return (
    <aside className="hidden xl:block fixed top-[15rem] right-[2rem] mr-2 z-10">
      <div className="flex flex-col gap-2 rounded-xl bg-[var(--atori-c-bg)]/80 px-3 py-3 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-1">
          {headings.map(h => {
            const isActive = active === h.slug
            return (
              <button
                key={h.slug}
                onClick={() => scrollTo(h.slug)}
                className="group flex w-full items-center gap-2 rounded-md px-2 py-1 text-left transition-colors hover:bg-[var(--atori-c-bg-second)]"
              >
                <span
                  className={`text-[1.2rem] leading-tight ${
                    isActive
                      ? 'text-[var(--atori-c-text)] opacity-100 font-bold'
                      : 'text-[var(--atori-c-text)] opacity-70'
                  }`}
                  style={{ marginLeft: h.level > 2 ? 8 : 0 }}
                >
                  {h.text}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
