import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Row, Col, Space } from 'antd'

export const Welcome = () => {
  const history = useHistory()

  const login = () => history.push('/login')
  const create = () => history.push('/create')

  return (
    <Row justify="space-around">
      <Col>
        <Space>
          <Button shape="round" type="primary" onClick={login}>
            Load your saved bot
          </Button>
          <Button shape="round" type="primary" onClick={create}>
            Create new bot
          </Button>
        </Space>
      </Col>
    </Row>
  )
}
