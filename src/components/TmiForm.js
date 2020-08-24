import React, { useContext, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Alert, Input, Button, Form, Spin } from 'antd'
import { RobotOutlined, LockOutlined, VideoCameraOutlined } from '@ant-design/icons'

import AuthContext from 'context/AuthContext'
import ChatContext from 'context/RepliersContext'
import { AUTH_STATUS } from 'services/tmi'

const getAlert = (type, message) => (
  <Alert type={type} message={message} style={{ marginBottom: '1rem' }} showIcon />
)

export const TmiForm = () => {
  const { username, token, channel } = useContext(AuthContext).bot

  const { authStatus, loading, connected, connect, disconnect } = useContext(
    ChatContext
  ).tmi

  const { control, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: { username, token, channel },
  })

  const alert = useMemo(() => {
    if (connected) {
      return getAlert('success', 'Listening Twitch channel chat')
    }
    switch (authStatus) {
      case AUTH_STATUS.ERROR:
        return getAlert('error', 'An error occurred')
      case AUTH_STATUS.WRONG_USERNAME:
        return getAlert('error', 'Wrong username')
      case AUTH_STATUS.WRONG_TOKEN:
        return getAlert('error', 'Wrong token')
      case AUTH_STATUS.WRONG_CHANNEL:
        return getAlert('error', 'Wrong channel')
      default:
        return
    }
  }, [connected, authStatus])

  return (
    <Spin size="large" spinning={loading}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={handleSubmit(connect)}
        initialValues={{ username, token, channel }}
      >
        {alert}

        <Controller
          name="username"
          control={control}
          rules={{ required: 'Bot username required' }}
          as={
            <Form.Item
              validateStatus={errors.username && 'error'}
              help={errors.username && errors.username.message}
              label="Bot username"
            >
              <Input disabled={loading || connected} prefix={<RobotOutlined />} />
            </Form.Item>
          }
        />

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
            <Button shape="round" type="primary" htmlType="submit" disabled={loading}>
              Connect
            </Button>
          )}
        </Form.Item>
      </Form>
    </Spin>
  )
}
