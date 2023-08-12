import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Form, Button, Input } from 'antd'
import { $resetPwd } from '../../api/adminApi'
import MyNotification from '../../components/MyNotification/MyNotification';

export default function UpdatePwd() {
  let [form] = Form.useForm()
  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
  const loginAdmin = useSelector(state=>state.loginAdmin)
  const {admin} = loginAdmin
  const onFinish = (value) => {
    // 编辑密码
    $resetPwd(value).then(({code, msg}) => {
      if(code===200){
        setNotiMsg({ type: 'success', description: msg })
        clear()
      }else{
        setNotiMsg({ type: 'error', description: msg })
      }
    })
  }

  // 清空表单的方法
  const clear = () => {
    form.resetFields()
  }
  useEffect(() => {
    form.setFieldValue('id', admin.id)
  }, [admin.id])

  return (
    <div>
      <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="编号"
            name="id"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="原始密码"
            name="OldloginPwd"
            rules={[
              {
                required: true,
                message: '请输入原始密码',
              },
            ]}
          >
            <Input.Password autoComplete='new-password' placeholder='请输入原始密码'/>
          </Form.Item>
          <Form.Item
            label="最新密码"
            name="NewloginPwd"
            rules={[
              {
                required: true,
                message: '请输入最新密码',
              },
            ]}
          >
            <Input.Password autoComplete='new-password' placeholder='请输入最新密码'/>
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="NewloginPwd2"
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('NewloginPwd') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码输入不一致!'));
                },
              })
            ]}
            dependencies={['NewloginPwd']}
          >
            <Input.Password autoComplete='new-password' placeholder='请再次输入密码'/>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={() => { clear() }}>
            取消
          </Button>
        </Form>
        <MyNotification notiMsg={notiMsg}></MyNotification>
    </div>
  )
}
 