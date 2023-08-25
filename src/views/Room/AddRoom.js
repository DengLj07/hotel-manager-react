import React, { Children, useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Select } from 'antd';
import { $add } from '../../api/roomApi';
import { $list as $typeList} from '../../api/typeApi';
import { $stateList } from '../../api/stateApi';
import MyNotification from '../../components/MyNotification/MyNotification';


export default function AddRoom({ open, setOpen, loadList, roomId, setRoomId }) {

  // 定义表单实例
  let [form] = Form.useForm()

  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })

  // 房间类型列表
  let [roomTypeList, setRoomTypeList] = useState([])
  // 房间状态列表
  let [roomStateList, setRoomStateList] = useState([])

  // 加载房间类型列表方法
  const loadRoomTypeList = () => {
    $typeList().then(({data}) => {
      data = data.map((r) => { return { value:r.roomTypeId, label:r.roomTypeName} })
      setRoomTypeList(data)
    })
  }
  // 加载房间状态列表方法
  const loadRoomStateList = () => {
    $stateList().then(({data}) => {
      data = data.map((r) => { return { value:r.roomStateId, label:r.roomStateName} })
      setRoomStateList(data)
    })
  }
  // 关闭抽屉的方法
  const onClose = () => {
    clear()
    setRoomId(0)  // 取消编辑状态
    setOpen(false)
  }

  // 表单提交的方法
  const onFinish = async (values) => {
    if(roomId){
      // 编辑房间
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
      // 添加房间
      values = {roomId,r}
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
    loadRoomTypeList()
    loadRoomStateList()
    if(roomId!==0){
      $getOne(roomId).then(({code,msg,data}) => {
        const newdata = roleList.filter((cur) => {return cur.roleId===data.roleId*1})[0]
        data = {...data, ...newdata}
        if(code===200){
          form.setFieldsValue(data)
        }else{
          setNotiMsg({ type: 'error', description: msg })
        }
      })
    }
  }, [roomId])

  return (
    <div>
      <Drawer title={roomId === 0 ? '添加客房' : '修改客房'} placement='right' width={500} onClose={onClose} open={open}>
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
            label="房间编号"
            name="roomId"
            rules={[
              {
                required: true,
                message: '请输入房间号',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="房间类型"
            name="roomTypeId"
            rules={[
              {
                required: true,
                message: '请选择房间类型',
              },
            ]}
          >
            <Select style={{width: 120}} options={roomTypeList} />
          </Form.Item>
          <Form.Item
            label="房间状态"
            name="roomStateId"
            rules={[
              {
                required: true,
                message: '请选择房间状态',
              },
            ]}
          >
            <Select style={{width: 120}} options={roomStateList} />
          </Form.Item>
          <Form.Item
            label="房间描述"
            name="typeDescription"
            rules={[
              {
                required: true,
                message: '请输入房间描述',
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
              {roomId === 0 ? '添加' : '确认'}
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
