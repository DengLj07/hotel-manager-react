import React, { useEffect, useState }from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { $add, $getOne, $update, RoomTypeList } from '../../api/typeApi';
import MyNotification from '../../components/MyNotification/MyNotification';

export default function AddType({open, setOpen, loadList, roomTypeId, setRoomTypeId}) {

  // 定义表单实例
  let [form] = Form.useForm()

  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })

  useEffect(() => {
    if(roomTypeId!==0){
      // 编辑房型
      $getOne(roomTypeId).then(({code,msg,data}) => {
        if(code===200){
          form.setFieldsValue(data)
        }else{
          setNotiMsg({ type: 'error', description: msg })
        }
      })
    }
  },[roomTypeId])
  // 关闭抽屉的方法
  const onClose = () => {
    clear()
    setOpen(false)
    setRoomTypeId(0)  // 取消编辑状态
  }

  // 表单提交的方法
  const onFinish = async (values) => {
    if(roomTypeId){
      // 编辑房型
      await $update(values).then(({code,msg}) => {
        if (code === 200) {
          setNotiMsg({ type: 'success', description: msg })
          clear()
          setOpen(false)
          loadList()
          setRoomTypeId(0)
        } else {
          setNotiMsg({ type: 'error', description: msg })
        }
      })
    }else{
      // 添加房型
      const roomObj = { ...values, roomTypeId: RoomTypeList.length + 1 }
      await $add(roomObj).then(({code,msg}) => {
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
      <Drawer title={roomTypeId===0?'添加房型':'编辑房型'} placement='right' width={600} onClose={onClose} open={open}>
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
            label="房型id"
            name="roomTypeId"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="房型名称"
            name="roomTypeName"
            rules={[
              {
                required: true,
                message: '请输入房型名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="房型价格"
            name="roomTypePrice"
            rules={[
              {
                required: true,
                message: '请输入房型价格',
              },
            ]}
          >
            <Input />
          </Form.Item>
            <Form.Item
            label="床位数量"
            name="bedNum"
            rules={[
              {
                required: true,
                message: '请输入床位数量',
              },
            ]}
          >
            <Input />
          </Form.Item>
            <Form.Item
            label="房型描述"
            name="typeDescription"
            rules={[
              {
                required: true,
                message: '请输入房型描述',
              },
            ]}
          >
            <ReactQuill className='publish-quill' placeholder='请输入房型描述' theme='snow'/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {roomTypeId===0?'添加':'确认'}
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