import React from 'react'
import { GithubOutlined } from '@ant-design/icons'
import { Row, Col, Button } from 'antd'

export const Footer = () => {
  return (
    <Row justify="space-between">
      <Col>
        <Button
          href="https://github.com/bgonp/twitch-smart-bot"
          target="_blank"
          type="text"
        >
          <strong>Twitch Smart Bot</strong>
        </Button>
        <Button
          href="https://github.com/bgonp"
          target="_blank"
          type="text"
          icon={<GithubOutlined />}
        >
          by<strong> bgonp</strong>
        </Button>
      </Col>
      <Col>
        <Button
          href="https://github.com/bgonp/twitch-smart-bot/master/LICENSE"
          target="_blank"
          type="text"
        >
          GNU General Public License
        </Button>
      </Col>
    </Row>
  )
}
