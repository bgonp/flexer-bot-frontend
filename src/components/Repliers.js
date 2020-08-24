import React from 'react'
import { BackTop } from 'antd'
import { UpCircleFilled } from '@ant-design/icons'
import { purple } from '@ant-design/colors'

export const Repliers = () => {
  return (
    <>
      <BackTop>
        <UpCircleFilled style={{ color: purple[9] }} />
      </BackTop>
      repliers
    </>
  )
}
