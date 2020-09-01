import React from 'react'
import { Layout as AntLayout, BackTop } from 'antd'
import { purple } from '@ant-design/colors'
import { UpCircleFilled } from '@ant-design/icons'

import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <AntLayout.Header style={{ backgroundColor: purple[9] }}>
        <Navbar />
      </AntLayout.Header>
      <AntLayout.Content style={{ padding: '2rem' }}>
        {children}
        <BackTop>
          <UpCircleFilled style={{ color: purple[9] }} />
        </BackTop>
      </AntLayout.Content>
      <AntLayout.Footer style={{ textAlign: 'center' }}>
        <Footer />
      </AntLayout.Footer>
    </AntLayout>
  )
}
