import React, { useEffect, useState }from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { $add, $getOne, $update, srcRoleList } from '../../api/roleApi';
import MyNotification from '../../components/MyNotification/MyNotification';

export default function AddRole({open, setOpen, loadList, roleId, setRoleId}) {

  // 定义表单实例
  let [form] = Form.useForm()

  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })

  useEffect(() => {
    if(roleId!==0){
      // 编辑角色
      $getOne(roleId).then(({code,msg,data}) => {
        if(code===200){
          form.setFieldsValue(data)
        }else{
          setNotiMsg({ type: 'error', description: msg })
        }
      })
    }
  },[roleId])
  // 关闭抽屉的方法
  const onClose = () => {
    clear()
    setOpen(false)
    setRoleId(0)  // 取消编辑状态
  }

  // 表单提交的方法
  const onFinish = async (values) => {
    if(roleId){
      // 编辑角色
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
      const roleObj = { ...values, roleId: srcRoleList.length + 1 }
      await $add(roleObj).then(({code,msg}) => {
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

  return (
    <div>
      <Drawer title={roleId===0?'添加角色':'编辑角色'} placement='right' width={500} onClose={onClose} open={open}>
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
            label="角色名称"
            name="roleName"
            rules={[
              {
                required: true,
                message: '请输入角色名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色id"
            name="roleId"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {roleId===0?'添加':'确认'}
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
