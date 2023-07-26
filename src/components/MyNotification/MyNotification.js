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
  console.log(notiMsg)
  useEffect(() => {
    if(notiMsg.type){
      api[notiMsg.type]({
        message:'系统提示',
        description:notiMsg.description,
        duration:2
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

