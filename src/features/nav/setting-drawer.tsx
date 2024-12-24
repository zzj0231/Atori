'use client'

import { Drawer } from '@/components/Drawer'
import { authEdit } from '@/server/auth'
import { useGlobSettingState } from '@/store/setting'
import { useCallback } from 'react'
import { useSetState } from 'react-use'

interface SettingDrawerProps {
  visible: boolean
  handleVisible: (open: boolean) => void
}

export const SettingDrawer = (props: SettingDrawerProps) => {
  const { visible, handleVisible } = props
  const [user, setUser] = useSetState<{ name: string; password: string }>({
    name: '',
    password: '',
  })

  const setIsEdit = useGlobSettingState(state => state.setIsEdit)

  const handleClose = useCallback(() => {
    handleVisible(false)
  }, [handleVisible])

  const handleName = useCallback((e: { target: { value: string } }) => {
    setUser({ name: e.target.value })
  }, [])

  const handlePassword = useCallback((e: { target: { value: string } }) => {
    setUser({ password: e.target.value })
  }, [])

  const handleSave = useCallback(async () => {
    const { name, password } = user
    const isAuth = await authEdit({ name, password })
    setIsEdit(isAuth)
  }, [user])

  return (
    <>
      <Drawer visible={visible} onClose={handleClose} placement="right">
        <div className="nav-setting-form-list">
          <div className="nav-setting-form-field">
            <span className="field-label">用户名</span>
            <input
              className="field-value"
              placeholder="用户名"
              onChange={handleName}
            />
          </div>
          <div className="nav-setting-form-field">
            <span className="field-label">密码</span>
            <input
              className="field-value"
              placeholder="密码"
              onChange={handlePassword}
            />
          </div>
        </div>
        <div className="nav-setting-save" onClick={handleSave}>
          <div className="btn-save">保存</div>
        </div>
      </Drawer>
    </>
  )
}
