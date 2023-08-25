import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Select, Table, Popconfirm } from 'antd';
import AddType from './AddType';
import { $list, $del} from '../../api/typeApi';
import MyNotification from '../../components/MyNotification/MyNotification';

export default function Type() {
  let [roomTypeId, setRoomTypeId] = useState(0)
  let [typeList, setTypeList] = useState([])
  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
  // 是否打开抽屉
  const [open, setOpen] = useState(false)
  // 加载列表数据方法
  const loadList = () => {
    $list().then(({code, msg, data}) => {
      if(code===200){
        data = data.map((r) => { return { ...r, key: r.roomTypeId } })
        setTypeList(data)
      }else{
        setNotiMsg({type:'error', description:msg})
      }

    })
  }
  // 删除房型
  const del = (id) => {
    $del(id).then((r) => {
      let { code, msg } = r
      if (code === 200) {
        setNotiMsg({ type: 'success', description: msg })
        loadList()
      } else {
        setNotiMsg({ type: 'error', description: msg })
      }
    })
  }
  const edit = (roomTypeId) => {
    // 打开抽屉，设置为编辑状态
    setOpen(true)
    setRoomTypeId(roomTypeId)
  }
  useEffect(() => {
    loadList()
  }, [])

  const columns = [
    {
      title: '房型编号',
      dataIndex: 'roomTypeId',
      width: '100px',
    },
    {
      title: '房型名称',
      dataIndex: 'roomTypeName',
      width: '200px',
    },
    {
      title: '房型价格',
      dataIndex: 'roomTypePrice',
      width: '200px',
    },
    {
      title: '床位数量',
      dataIndex: 'bedNum',
      width: '100px',
    },
    {
      title: '操作',
      key: 'action',
      width: '500px',
      render: (ret) => (
        <>
          <Button size='small' style={{borderColor:'orange',color:'orange', marginRight:'10px'}} 
          onClick={() => {
            edit(ret.roomTypeId)
          }}
          >
            编辑
          </Button>
          <Popconfirm
            title="系统提示"
            description="确认删除角色?"
            onConfirm={() => { del(ret.roomTypeId) }}
            okText="确认"
            cancelText="取消">
            <Button danger size='small'>删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <div className='search'>
        <button size='small' onClick={() => { setOpen(true) }}>添加</button>
      </div>
      <Table dataSource={typeList} columns={columns} />
      <AddType open={open} setOpen={setOpen} loadList={loadList} roomTypeId={roomTypeId} setRoomTypeId={setRoomTypeId}/>
      <MyNotification notiMsg={notiMsg} />
    </>
  )
}
