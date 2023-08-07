import React, { useEffect } from 'react'
import {notification} from 'antd'

export default function MyNotification({notiMsg}) {
  const [api, contextHolder] = notification.useNotification()
  // const openNotificationWithIcon = (type) => {
  //   api[type]({
  //     message,
  //     description
  //   })
  // };
  useEffect(() => {
    if(notiMsg.type){
      api[notiMsg.type]({
        message:'系统提示',
        description:notiMsg.description,
        duration:2,
        placement:'top'
      })
    }
  },[notiMsg]
  )
  return (
    <div>
      {contextHolder}
    </div>
  )
}

