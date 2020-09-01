import React, { useContext, useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Alert, Input, Button, Form, Spin, Space } from 'antd'
import { RobotOutlined, LockOutlined, VideoCameraOutlined } from '@ant-design/icons'

import AuthContext from 'context/AuthContext'

export const CreateForm = () => {
  const { create } = useContext(AuthContext)

  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { control, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: { username: '', token: '', channel: '' },
  })

  const onSubmit = useCallback(
    async ({ username, token, channel }) => {
      setLoading(true)
      setError(false)

      const { success, error } = await create({ username, token, channel })

      if (!success) {
        setLoading(false)
        setError(error)
      }
    },
    [create]
  )

  return (
    <Spin size="large" spinning={loading}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={handleSubmit(onSubmit)}
      >
        {error && (
          <Alert message={error} type="error" style={{ marginBottom: '1rem' }} showIcon />
        )}

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
              <Input disabled={loading} prefix={<RobotOutlined />} />
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
              <Input disabled={loading} prefix={<LockOutlined />} />
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
              <Input disabled={loading} prefix={<VideoCameraOutlined />} />
            </Form.Item>
          }
        />

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Space>
            <Button shape="round" type="primary" htmlType="submit" disabled={loading}>
              Create
            </Button>

            <Button
              shape="round"
              type="default"
              disabled={loading}
              onClick={() => history.goBack()}
            >
              Go back
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  )
}
