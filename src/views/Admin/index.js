import React,{useEffect, useState} from 'react'
import {Table, Button, Popconfirm, Pagination, Select} from 'antd'
import AddAdmin from './AddAdmin'
import MyNotification from '../../components/MyNotification/MyNotification'
import { $list, $del } from '../../api/adminApi'
import { $list as $roleList } from '../../api/roleApi'

export default function Admin() {
  // 账户列表数据
  let [adminList, setAdminList] = useState([])
  let [open, setOpen] = useState(false)
  // 编辑状态id
  let [loginId, setLoginId] = useState(0)
  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
  let [pageIndex, setPageIndex] = useState(1)
  let [count, setCount] = useState(0)
  // 角色列表
  let [roleList, setRoleList] = useState([])
  let [roleId, setRoleId] = useState(0)

  const loadList = () => {
    $list({pageSize:8,pageIndex}).then(({data,count}) => {
      data = data.map((r) => { return { ...r, key: r.loginId} })
      setAdminList(data)
      setCount(count)
    })
  }

  const loadRoleList = () => {
    $roleList().then((data) => {
      data = data.map((r) => { return { ...r, key: r.roleId, value:r.roleId, label:r.roleName} })
      data.unshift({label:'全部角色', value:0, roleId:0})
      setRoleList(data)
    })
  }
  useEffect(() => {
    loadRoleList()
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
      title: '编号',
      dataIndex: 'id',
      width: '80px',
    },
    {
      title: '账号',
      dataIndex: 'loginId',
      width: '150px',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '200px',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: '250px',
    },
    {
      title: '头像',
      dataIndex: 'photo',
      width: '150px',
      render: (ret)=>(
        <div>
          <img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F3a2f9e13-ac28-467f-8ccc-e024f5e81c0a%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693905223&t=79a403b2525fc7cc7bb04d69d95ab52f'
          style={{width:'50px'}}/>
        </div>
      )
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      width: '150px',
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
      <Select size='small' style={{width:'200px'}} options={roleList} defaultValue={0} onSelect={(value) => {setRoleId(value)}} ></Select>
      <Button size='small' style={{marginLeft:'5px'}} onClick={(cur) => {console.log('角色筛选待完善：', roleId)}} type='primary'>查询</Button>
      <Button size='small' style={{marginLeft:'5px'}} onClick={() => { setOpen(true) }}>添加</Button>
      <Table dataSource={adminList} columns={columns} pagination={false}/>
      <Pagination style={{display:'flex', justifyContent:'flex-end'}} 
      defaultCurrent={1} current={pageIndex} total={count} pageSize={8} size='small' onChange={(page) => {setPageIndex(page)}}/>
      <AddAdmin 
      open={open} 
      setOpen={setOpen} 
      loadList={loadList} 
      loginId={loginId} 
      setLoginId={setLoginId}/>
      <MyNotification notiMsg={notiMsg}/>
    </>
    
  )
}
