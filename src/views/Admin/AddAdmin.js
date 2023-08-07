import React, { Children, useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Select } from 'antd';
import { $add, $getOne, adminList} from '../../api/adminApi';
import { $list} from '../../api/roleApi';
import MyNotification from '../../components/MyNotification/MyNotification';
import UploadImg from './UploadImg';

export default function AddAdmin({ open, setOpen, loadList, loginId, setLoginId }) {

  // 定义表单实例
  let [form] = Form.useForm()

  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })

  // 角色列表
  let [roleList, setRoleList] = useState([])

  // 加载角色列表数据方法
  const loadRoleList = () => {
    $list().then((data) => {
      data = data.map((r) => { return { ...r, key: r.roleId, value:r.roleId, label:r.roleName} })
      setRoleList(data)
    })
  }
  // 关闭抽屉的方法
  const onClose = () => {
    clear()
    setLoginId(0)  // 取消编辑状态
    setOpen(false)
  }

  // 表单提交的方法
  const onFinish = async (values) => {
    if(loginId){
      // 编辑账号
      await $update(values).then(({code,msg}) => {
        if (code === 200) {
          setNotiMsg({ type: 'success', description: msg })
          clear()
          setOpen(false)
          loadList()
          setRoleId(0)
        } else {
          setNotiMsg({ type: 'error', description: msg })
        }
      })
    }else{
      await $add(values).then(({code,msg}) => {
        if (code === 200) {
          setNotiMsg({ type: 'success', description: msg })
          clear()
          setOpen(false)
          loadList()
        } else {
          setNotiMsg({ type: 'error', description: msg })
        }
      })
    }
  }
  // 清空表单的方法
  const clear = () => {
    form.resetFields()
  }

  useEffect(() => {
    loadRoleList()
    if(loginId!==0){
      $getOne(loginId).then(({code,msg,data}) => {
        const newdata = roleList.filter((cur) => {return cur.roleId===data.roleId*1})[0]
        data = {...data, ...newdata}
        if(code===200){
          form.setFieldsValue(data)
        }else{
          setNotiMsg({ type: 'error', description: msg })
        }
      })
    }
  }, [loginId])

  return (
    <div>
      <Drawer title={loginId === 0 ? '添加账户' : '编辑账户'} placement='right' width={500} onClose={onClose} open={open}>
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
            label="账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
            hidden={loginId}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
            hidden={loginId}
          >
            <Input.Password autoComplete='new-password' placeholder='请输入密码'/>
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="电话"
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入电话',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="头像"
            name="photo"
            rules={[
              {
                message: '请选择头像',
              },
            ]}
          >
            <UploadImg />
          </Form.Item>
          <Form.Item
            label="角色"
            name="roleId"
            rules={[
              {
                required: true,
                message: '请选择角色',
              },
            ]}
          >
            <Select
            style={{
              width: 120,
            }}
            // onChange={handleChange}
            options={roleList}
          />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {loginId === 0 ? '添加' : '确认'}
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={() => { onClose() }}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <MyNotification notiMsg={notiMsg} />
    </div>
  )
}
