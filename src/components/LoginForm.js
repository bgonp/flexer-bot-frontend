import React, { useState, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Alert, Input, Button, Form, Spin, Space } from 'antd'
import { RobotOutlined, LockOutlined } from '@ant-design/icons'

import AuthContext from 'context/AuthContext'

export const LoginForm = () => {
  const { login } = useContext(AuthContext)

  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { control, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = useCallback(
    async ({ username, password }) => {
      setLoading(true)
      setError(false)

      const { success, error } = await login(username, password)

      if (!success) {
        setLoading(false)
        setError(error)
      }
    },
    [login, setLoading]
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
          name="password"
          control={control}
          rules={{
            required: 'Password required',
            minLength: { value: 6, message: 'Min 6 characters' },
          }}
          as={
            <Form.Item
              validateStatus={errors.password && 'error'}
              help={errors.password && errors.password.message}
              label="Password"
            >
              <Input.Password disabled={loading} prefix={<LockOutlined />} />
            </Form.Item>
          }
        />

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Space>
            <Button shape="round" type="primary" htmlType="submit" disabled={loading}>
              Log in
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
