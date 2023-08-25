import React,{useEffect, useState} from 'react'
import {Table, Button, Popconfirm, Pagination, Select, Tag} from 'antd'
import MyNotification from '../../components/MyNotification/MyNotification'
import AddRoom from './AddRoom'
import { $list } from '../../api/roomApi'
import { $stateList } from '../../api/stateApi'
import { $list as $typeList } from '../../api/typeApi'

export default function Room() {
  // 房间类型列表
  let [typeList, setTypeList] = useState([])
  // 房间状态列表
  let [stateList, setStateList] = useState([])
  let [open, setOpen] = useState(false)
  // 编辑房间状态id
  let [roomId, setRoomId] = useState(0)
  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
  let [pageIndex, setPageIndex] = useState(1)
  let [count, setCount] = useState(0)
  // 客房列表
  let [roomList, setRoomList] = useState([])
  
  // 用于筛选列表数据，类型和状态
  let [roomTypeId, setRoomTypeId] = useState(0)
  let [roomStateId, setRoomStateId] = useState(0)

  const loadList = () => {
    $list({pageSize:8,pageIndex,roomStateId,roomTypeId}).then(({data,count}) => {
      data = data.map((r) => { return {
         roomId:r.roomId,
         key: r.roomId, 
         roomTypeName:r.roomType.roomTypeName,
         roomStateName:r.roomState.roomStateName,
         roomTypePrice:r.roomType.roomTypePrice,
         bedNum:r.roomType.bedNum,
         typeDescription:r.roomType.typeDescription
        } })
      setRoomList(data)
      setCount(count)
    })
  }
  // 加载房间类型
  const loadTypeList = () => {
    $typeList().then(({data}) => {
      data = data.map((r) => { return {value: r.roomTypeId, label:r.roomTypeName} })
      data.unshift({label:'请选择房间类型', value:0})
      setTypeList(data)
    })
  }
  // 加载房间状态
  const loadStateList = () => {
    $stateList().then(({data}) => {
      data = data.map((r) => { return {value: r.roomStateId, label:r.roomStateName} })
      data.unshift({label:'请选择房间状态', value:0})
      setStateList(data)
    })
  }

  useEffect(() => {
    loadTypeList()
    loadStateList()
    loadList()
  },[pageIndex])

  const edit = (loginId) => {
    // 打开抽屉，设置为编辑状态
    setOpen(true)
    setLoginId(loginId)
  }

  const del = (loginId) => {
    $del(loginId).then((r) => {
      let { code, msg } = r
      if (code === 200) {
        setNotiMsg({ type: 'success', description: msg })
        loadList()
      } else {
        setNotiMsg({ type: 'error', description: msg })
      }
    })
  }
  const columns = [
    {
      title: '房间编号',
      dataIndex: 'roomId',
      width: '80px',
    },
    {
      title: '房间类型',
      dataIndex: 'roomTypeName',
      width: '150px',
    },
    {
      title: '房间价格',
      dataIndex: 'roomTypePrice',
      width: '200px',
    },
    {
      title: '床位数量',
      dataIndex: 'bedNum',
      width: '250px',
    },
    {
      title: '房间状态',
      dataIndex: 'roomStateName',
      width: '250px',
      key: 'tags',
      render: (roomStateName) => (
        <Tag color={roomStateName==='空闲'?'lightgreen':(roomStateName==='维修'?'lightsalmon':'lightpink')} >
          {roomStateName}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: '500px',
      render: (ret) => (
        <>
          <Button size='small' style={{borderColor:'orange',color:'orange', marginRight:'10px'}} 
          onClick={() => {
            edit(ret.loginId)
          }}
          >
            编辑
          </Button>
          <Popconfirm
            title="系统提示"
            description="确认删除角色?"
            onConfirm={() => { del(ret.loginId) }}
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
      <span>类型：</span>
      <Select size='small' style={{width:'200px'}} options={typeList} defaultValue={0} 
      onSelect={(value) => {setRoomTypeId(value)}} ></Select>
      <span style={{marginLeft:'5px'}}>状态：</span>
      <Select size='small' style={{width:'200px'}} options={stateList} defaultValue={0} 
      onSelect={(value) => {setRoomStateId(value)}} ></Select>
      <Button size='small' style={{marginLeft:'5px'}} onClick={loadList} type='primary'>查询</Button>
      <Button size='small' style={{marginLeft:'5px'}} onClick={() => { setOpen(true) }}>添加</Button>
      <Table dataSource={roomList} columns={columns} pagination={false}/>
      <Pagination style={{display:'flex', justifyContent:'flex-end'}} 
      defaultCurrent={1} current={pageIndex} total={count} pageSize={8} size='small' onChange={(page) => {setPageIndex(page)}}/>
      <AddRoom open={open} setOpen={setOpen} loadList={loadList} roomId={roomId} setRoomId={setRoomId}></AddRoom>
      <MyNotification notiMsg={notiMsg}/>
    </>
    
  )
}
