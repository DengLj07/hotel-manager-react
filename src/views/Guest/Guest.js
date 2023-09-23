import React,{useEffect, useState} from 'react'
import {Table, Button, Popconfirm, Pagination, Select, Tag, Input} from 'antd'
import AddGuest from './AddGuest'
import MyNotification from '../../components/MyNotification/MyNotification'
import { $list, $add, $checkout } from '../../api/guestApi'
import { $list as $stateList } from '../../api/resideApi'
import { $list as $typeList } from '../../api/resideApi'

export default function Guest() {
  // 顾客列表
  let [guestList, setGuestList] = useState([])
  let [open, setOpen] = useState(false)
  // 编辑顾客状态id
  let [guestId, setGuestId] = useState(0)
  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
  let [pageIndex, setPageIndex] = useState(1)
  let [count, setCount] = useState(0)

  // 房间状态列表
  let [resideList, setResideList] = useState([])
  
  // 用于筛选列表数据，类型和状态
  let [guestName, setGuestName] = useState('')
  let [resideStatusId, setResideStatusId] = useState(0)

  const loadList = () => {
    $list({pageSize:10,pageIndex,guestName,resideStatusId}).then(({data,count}) => {
      data = data.map((r) => { return {
         key: r.guestId, 
         guestId:r.guestId,
         identityId:r.identityId,
         guestName:r.guestName,
         phone:r.phone,
         roomId:r.roomId,
         roomTypeName:r.room.roomType.roomTypeName,
         bedNum:r.room.roomType.roomTypeBedNum,
         roomTypePrice:r.room.roomType.roomTypePrice,
         resideDate:r.resideDate,
         deposit:r.deposit,
         guestNum:r.guestNum,
         leaveDate:r.leaveDate,
         resideStateName:r.reside.resideStateName,
         totalMoney:r.totalMoney
        } })
      setGuestList(data)
      setCount(count)
    })
  }

  // 加载结账状态
  const loadStateList = () => {
    $stateList().then(({data}) => {
      data = data.map((r) => { return {value: r.resideId, key: r.resideId, label:r.resideStatus} })
      data.unshift({label:'请选择结账状态', value:0})
      setResideList(data)
    })
  }

  useEffect(() => {
    loadStateList()
    loadList()
  },[pageIndex])

  const edit = (guestId) => {
    // 打开抽屉，设置为编辑状态
    setOpen(true)
    setGuestId(guestId)
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
      title: '顾客姓名',
      dataIndex: 'guestName',
      width: '100px',
    },
    {
      title: '证件号码',
      dataIndex: 'identityId',
      width: '200px',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: '100px',
    },
    {
      title: '房间号',
      dataIndex: 'roomId',
      width: '100px',
    },
    {
      title: '房间类型',
      dataIndex: 'roomTypeName',
      width: '100px',
    },
    {
      title: '房间价格',
      dataIndex: 'roomTypePrice',
      width: '100px',
    },
    {
      title: '床位数',
      dataIndex: 'bedNum',
      width: '100px',
    },
    {
      title: '入住日期',
      dataIndex: 'resideDate',
      width: '120px',
    },
    {
      title: '离开日期',
      dataIndex: 'leaveDate',
      width: '120px',
    },
    {
      title: '押金',
      dataIndex: 'deposit',
      width: '80px',
    },
    {
      title: '消费金额',
      dataIndex: 'totalMoney',
      width: '100px',
    },
    {
      title: '入住人数',
      dataIndex: 'guestNum',
      width: '100px',
    },
    {
      title: '结账状态',
      dataIndex: 'resideStateName',
      width: '100px',
      key: 'tags',
      render: (resideStateName) => (
        <Tag color={resideStateName==='已结账'?'lightgreen':'lightcoral'} >
          {resideStateName}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: '200px',
      render: (ret) => {
        return (
          ret.resideStateName === '已结账'?
          <Popconfirm
          title="系统提示"
          description="确认删除角色?"
          onConfirm={() => { del(ret.loginId) }}
          okText="确认"
          cancelText="取消">
          <Button danger size='small'>删除</Button>
        </Popconfirm>
        :
        <>
          <Button size='small' style={{borderColor:'orange',color:'orange', marginRight:'10px'}} 
          onClick={() => {
            edit(ret.guestId)
          }}
          >
            编辑
          </Button>
          <Button size='small' style={{borderColor:'lightseagreen',color:'lightseagreen', marginRight:'10px'}} 
          onClick={() => {
            // 结账接口
            $checkout(ret.guestId).then(totalMoney =>{
              setNotiMsg({
                type:'success',
                description:`结账成功，消费房费为${ret.totalMoney}元`
              })
              loadList()
            })
          }}
          >
            结账
          </Button>
        </>
          

      )
    }
  }
  ];
  return (
    <>
      <span>顾客姓名：</span>
      <input size='small' style={{width:'200px'}} value={guestName} onChange={(e) => {setGuestName(e.target.value)}}></input>
      <span>结账状态：</span>
      <Select size='small' style={{width:'200px'}} options={resideList} defaultValue={0} 
      onSelect={(value) => {setResideStatusId(value)}} ></Select>
      <Button size='small' style={{marginLeft:'5px'}} onClick={loadList} type='primary'>查询</Button>
      <Button size='small' style={{marginLeft:'5px'}} onClick={() => { setOpen(true) }}>添加</Button>
      <Table dataSource={guestList} columns={columns} pagination={false}/>
      <Pagination style={{display:'flex', justifyContent:'flex-end'}} 
      defaultCurrent={1} current={pageIndex} total={count} pageSize={8} size='small' onChange={(page) => {setPageIndex(page)}}/>
      <AddGuest open={open} setOpen={setOpen} loadList={loadList} guestId={guestId} setGuestId={setGuestId}/>
      <MyNotification notiMsg={notiMsg}/>
    </>
    
  )
}
