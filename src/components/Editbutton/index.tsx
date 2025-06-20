import { WeatherIcon } from '@/icon/weather'
import { useGlobSettingState } from '@/store/setting'
import { useCallback } from 'react'

interface EditIconProps {
  onClick?: () => void
}

const buttonContaienr =
  'fixed bottom-20 right-20 w-16 h-16 bg-white rounded-full text-2xl justify-center items-center hover:shadow-lg hover:shadow-violet-300/60 hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 hover:border-red-200'
const iconStyle =
  'transition-transform duration-300 ease-in-out group-hover:rotate-12'

export function GlobalEditIcon({ onClick }: EditIconProps) {
  const isEditAuth = useGlobSettingState(state => state.isEdit)
  const handleClick = useCallback(() => {
    onClick?.()
  }, [onClick])

  return (
    <div
      className={`${buttonContaienr} group`}
      onClick={handleClick}
      style={{
        display: isEditAuth ? 'flex' : 'none',
      }}
    >
      <span className={iconStyle}>
        <WeatherIcon />
      </span>
    </div>
  )
}
