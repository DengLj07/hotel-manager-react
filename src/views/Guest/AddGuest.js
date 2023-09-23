import React, { Children, useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Select, DatePicker } from 'antd';
import { $add, $getOne } from '../../api/guestApi';
import { $list as $typeList} from '../../api/typeApi';
import { $list as $roomList } from '../../api/roomApi';
import MyNotification from '../../components/MyNotification/MyNotification';
import dayjs from 'dayjs';

export default function AddGuest({ open, setOpen, loadList, guestId, setGuestId }) {

  // 定义表单实例
  let [form] = Form.useForm()

  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })

  // 房间类型列表
  let [roomTypeList, setRoomTypeList] = useState([])
  let [roomList, setRoomList] = useState([])


  // 加载房间类型列表方法
  const loadRoomTypeList = () => {
    $typeList().then(({data}) => {
      data = data.map((r) => { return { value:r.roomTypeId, label:r.roomTypeName} })
      setRoomTypeList(data)
    })
  }
  // 加载房间列表方法
  const loadRoomList = (roomTypeId) => {
    $roomList({roomTypeId,pageSize:10,pageIndex:1}).then(({data}) => {
      data = data.map((r) => { return { value:r.roomId, label:r.roomId} })
      setRoomList(data)
    })
  }
  // 关闭抽屉的方法
  const onClose = () => {
    clear()
    setGuestId(0)  // 取消编辑状态
    setOpen(false)
  }

  // 表单提交的方法
  const onFinish = async (values) => {
    if(guestId){
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
      values = {guestId,r}
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
    if(guestId!==0){
      $getOne({guestId}).then(({code,msg,data}) => {
        data.resideDate = dayjs(data.resideDate)
        data.roomTypeId = data.room.roomType.roomTypeId
        if(code===200){
          form.setFieldsValue(data)
        }else{
          setNotiMsg({ type: 'error', description: msg })
        }
      })
    }
  }, [guestId])

  return (
    <div>
      <Drawer title={guestId === 0 ? '添加顾客' : '修改顾客'} placement='right' width={500} onClose={onClose} open={open}>
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
            label="顾客编号"
            name="guestId"
            hidden={true}
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
            label="顾客姓名"
            name="guestName"
            rules={[
              {
                required: true,
                message: '请选择顾客姓名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="身份证号"
            name="identityId"
            rules={[
              {
                required: true,
                message: '请输入身份证号',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号码"
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="房型"
            name="roomTypeId"
            rules={[
              {
                required: true,
                message: '请选择房型',
              },
            ]}
          >
            <Select size='small' style={{width:'200px'}} options={roomTypeList} 
            onSelect={(roomTypeId) => {loadRoomList(roomTypeId); form.setFieldValue('roomId', '')}}/>
          </Form.Item>
          <Form.Item
            label="房间"
            name="roomId"
            rules={[
              {
                required: true,
                message: '请选择房间',
              },
            ]}
          >
            <Select size='small' style={{width:'200px'}} options={roomList}/>
          </Form.Item>
          <Form.Item
            label="入住日期"
            name="resideDate"
            rules={[
              {
                required: true,
                message: '请输入押金',
              },
            ]}
          >
            <DatePicker showTime placeholder='请输入入住时间' />
          </Form.Item>
          <Form.Item
            label="押金"
            name="deposit"
            rules={[
              {
                required: true,
                message: '请输入押金',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="入住人数"
            name="guestNum"
            rules={[
              {
                required: true,
                message: '请输入入住人数',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {guestId === 0 ? '添加' : '确认'}
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
