import { Drawer } from '@/components/Drawer'
import { useCallback } from 'react'

interface SettingDrawerProps {
  visible: boolean
  handleVisible: (open: boolean) => void
}

export const SettingDrawer = (props: SettingDrawerProps) => {
  const { visible, handleVisible } = props

  const handleClose = useCallback(() => {
    handleVisible(false)
  }, [handleVisible])

  return (
    <>
      <Drawer visible={visible} onClose={handleClose} placement="right">
        <div className="nav-setting-form-list">
          <div className="nav-setting-form-field">
            <span className="field-label">用户名</span>
            <input className="field-value" placeholder="用户名" />
          </div>
          <div className="nav-setting-form-field">
            <span className="field-label">密码</span>
            <input className="field-value" placeholder="密码" type="password" />
          </div>
        </div>
      </Drawer>
    </>
  )
}
