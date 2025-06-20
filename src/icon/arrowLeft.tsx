import React from 'react'

interface ArrowLeftProps {
  className?: string
  width?: number | string
  height?: number | string
}

export const ArrowLeft: React.FC<ArrowLeftProps> = ({
  className = '',
  width = '1em',
  height = '1em',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19 12H5M12 19L5 12L12 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
