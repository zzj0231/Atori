import './index.css'

interface SaveButtonProps {
  handleOk: () => void
}

export const SaveButton = ({ handleOk }: SaveButtonProps) => {
  return (
    <button
      onClick={handleOk}
      className="absolute right-0 top-[-7rem] px-3 py-1.5 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 z-50 gb-save-button"
      title="保存评论"
    >
      保存
    </button>
  )
}
