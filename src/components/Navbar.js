import React, { useContext, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Row, Col, Button, Space, Drawer } from 'antd'
import { RobotFilled } from '@ant-design/icons'
import { blue } from '@ant-design/colors'

import { TMI_STATUS } from 'services/tmi'
import AuthContext from 'context/AuthContext'
import { PasswordForm } from './PasswordForm'
import ChatContext from 'context/ChatContext'

export const Navbar = () => {
  const {
    isCreated,
    isAuthed,
    logout,
    save,
    bot: { username, avatar },
  } = useContext(AuthContext)

  const { tmiStatus } = useContext(ChatContext)

  const [drawerVisible, setDrawerVisible] = useState(false)

  const history = useHistory()

  const login = () => history.push('/login')
  const create = () => history.push('/create')
  const update = useCallback(() => {
    if (!isAuthed) {
      setDrawerVisible(true)
    } else if (tmiStatus === TMI_STATUS.VALID) {
      save()
    } else {
      // TODO
    }
  }, [isAuthed, tmiStatus, save])

  const avatarProps = avatar ? { src: avatar } : { icon: <RobotFilled /> }

  return (
    <Row justify="space-between">
      <Col>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
          <Avatar {...avatarProps} style={{ backgroundColor: blue[5] }} />
          <span style={{ color: '#FFF', marginLeft: '1rem' }}>
            {isCreated ? username : 'Twitch Smart Bot'}
          </span>
        </h2>
      </Col>
      <Col>
        <Space>
          {isCreated ? (
            <>
              <Button shape="round" type="default" onClick={logout}>
                Exit
              </Button>
              <Button shape="round" type="primary" onClick={update}>
                Save
              </Button>
              {!isAuthed && (
                <Drawer
                  title="Save your bot"
                  visible={drawerVisible}
                  onClose={() => setDrawerVisible(false)}
                  width={340}
                >
                  <PasswordForm />
                </Drawer>
              )}
            </>
          ) : (
            <>
              <Button shape="round" type="primary" onClick={login}>
                Login
              </Button>
              <Button shape="round" type="primary" onClick={create}>
                Create
              </Button>
            </>
          )}
        </Space>
      </Col>
    </Row>
  )
}
