import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.scss';
import { Button, Form, Input, notification ,} from 'antd';
import { $login } from '../../api/adminApi';
import MyNotification from '../../components/MyNotification/MyNotification';

export default function Login() {

  let [notiMsg, setNotiMsg] = useState({type:'', description:''})
  let navigate = useNavigate()
  // 判断是否已登陆
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      navigate('/layout')
    }
  },[])
  

  // 表单成功的方法
  const onFinish = async (values) => {
    let {message, code} = await $login(values)
    if (code === 200){
      // 登陆成功提示
      setNotiMsg({type:'success', description:message})
      // 跳转到首页
      navigate('/layout')
    }else{
      setNotiMsg({type:'error', description:message})
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [api, contextHolder] = notification.useNotification();
  // 打开提示框
  const openNotification = (type, description) => {
    api[type]({
      message: '系统提示',
      description
    })
  }

  return (
    <div className='login'>
      <div className='content'>
        <h2>酒店后台管理系统</h2>
        <Form
          name="basic"
          // form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            loginId: '',
            loginPwd: ''
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: '请输入账号!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
            <Button onClick={() => {

            }
            } style={{ marginLeft: '10px' }}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
      <MyNotification notiMsg={notiMsg}/>
    </div>
  )
}
