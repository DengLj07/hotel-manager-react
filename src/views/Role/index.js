import React, { useEffect, useState } from 'react';
import { Table, Drawer, Form, Input, Button } from 'antd';
import MyNotification from '../../components/MyNotification/MyNotification';
import { $list, $add, srcRoleList } from '../../api/roleApi';


export default function Role() {

  // 定义表单实例
  let [form] = Form.useForm()

  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })

  let [roleList, setRoleList] = useState([])

  // 表单提交的方法
  const onFinish = async (values) => {
    const roleObj = { ...values, roleId: srcRoleList.length + 1 }
    let { code, msg } = await $add(roleObj)
    if (code === 200) {
      setNotiMsg({ type: 'success', description: msg })
      clear()
      setOpen(false)
      loadList()
    } else {
      setNotiMsg({ type: 'error', description: msg })
    }
  }
  // 清空表单的方法
  const clear = () => {
    form.setFieldsValue({ roleName: '' })
  }
  // 加载列表数据方法
  const loadList = () => {
    $list().then((data) => {
      data = data.map((r) => { return { ...r, key: r.roleId } })
      setRoleList(data)
    })
  }
  // 是否打开抽屉
  const [open, setOpen] = useState(false)
  // 关闭抽屉的方法
  const onClose = () => {
    clear()
    setOpen(false)
  }
  useEffect(() => {
    loadList()
  }, [])

  const columns = [
    {
      title: '角色编号',
      dataIndex: 'roleId',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    }
  ];
  return (
    <>
      <div className='search'>
        <button size='small' onClick={() => { setOpen(true) }}>添加</button>
      </div>
      <Table dataSource={roleList} columns={columns} />
      <Drawer title='添加角色' placement='right' width={500} onClose={onClose} open={open}>
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
          initialValues={{
            remember: true,
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
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              添加
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={() => { onClose() }}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <MyNotification notiMsg={notiMsg} />
    </>
  )
}
