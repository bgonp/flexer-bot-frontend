import React, { useContext, useMemo, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Alert, Input, Button, Form, Spin, Tooltip } from 'antd'
import { RobotOutlined, LockOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { green } from '@ant-design/colors'

import AuthContext from 'context/AuthContext'
import ChatContext from 'context/ChatContext'
import { TMI_STATUS } from 'services/tmi'

const getAlert = (type, message) => (
  <Alert type={type} message={message} style={{ marginBottom: '1rem' }} showIcon />
)

export const TmiForm = () => {
  const { username, token, channel } = useContext(AuthContext).bot

  const { tmiStatus, loading, connected, connect, disconnect } = useContext(ChatContext)

  const { control, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: { token, channel },
  })

  const alert = useMemo(() => {
    if (connected) {
      return getAlert('success', 'Listening Twitch channel chat')
    }
    switch (tmiStatus) {
      case TMI_STATUS.ERROR:
        return getAlert('error', 'An error occurred')
      case TMI_STATUS.WRONG_USERNAME:
        return getAlert('error', 'Wrong username')
      case TMI_STATUS.WRONG_TOKEN:
        return getAlert('error', 'Wrong token')
      case TMI_STATUS.WRONG_CHANNEL:
        return getAlert('error', 'Wrong channel')
      default:
        return
    }
  }, [connected, tmiStatus])

  const onSubmit = useCallback(
    (data) => {
      connect({ username, token: data.token, channel: data.channel })
    },
    [connect, username]
  )

  return (
    <Spin size="large" spinning={loading}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={handleSubmit(onSubmit)}
        initialValues={{ token, channel }}
      >
        {alert}

        <Tooltip
          trigger="click"
          title="Bot username cannot be changed"
          placement="bottom"
        >
          <Form.Item label="Bot username">
            <Input disabled={true} prefix={<RobotOutlined />} value={username} />
          </Form.Item>
        </Tooltip>

        <Controller
          name="token"
          control={control}
          rules={{ required: 'Token required' }}
          as={
            <Form.Item
              validateStatus={errors.token && 'error'}
              help={errors.token && errors.token.message}
              label="Token"
            >
              <Input disabled={loading || connected} prefix={<LockOutlined />} />
            </Form.Item>
          }
        />

        <Controller
          name="channel"
          control={control}
          rules={{ required: 'Channel required' }}
          as={
            <Form.Item
              validateStatus={errors.channel && 'error'}
              help={errors.channel && errors.channel.message}
              label="Channel"
            >
              <Input disabled={loading || connected} prefix={<VideoCameraOutlined />} />
            </Form.Item>
          }
        />

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          {connected ? (
            <Button shape="round" type="default" onClick={disconnect}>
              Disconnect
            </Button>
          ) : (
            <Button shape="round" htmlType="submit" disabled={loading}>
              Connect
            </Button>
          )}
        </Form.Item>
      </Form>
    </Spin>
  )
}
