import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Popconfirm } from 'antd';
import { $list, $add, $del, $getOne,srcRoleList } from '../../api/roleApi';
import AddRole from './addRole';
import MyNotification from '../../components/MyNotification/MyNotification';

export default function Role() {
  let [roleId, setRoleId] = useState(0)
  let [roleList, setRoleList] = useState([])
  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
  // 是否打开抽屉
  const [open, setOpen] = useState(false)
  // 加载列表数据方法
  const loadList = () => {
    $list().then((data) => {
      data = data.map((r) => { return { ...r, key: r.roleId } })
      setRoleList(data)
    })
  }
  // 删除角色
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
  const edit = (id) => {
    // 打开抽屉，设置为编辑状态
    setOpen(true)
    setRoleId(id)
  }
  useEffect(() => {
    loadList()
  }, [])

  const columns = [
    {
      title: '角色编号',
      dataIndex: 'roleId',
      width: '100px',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      width: '200px',
    },
    {
      title: '操作',
      key: 'action',
      width: '500px',
      render: (ret) => (
        <>
          <Button size='small' style={{borderColor:'orange',color:'orange', marginRight:'10px'}} 
          onClick={() => {
            edit(ret.roleId)
          }}
          >
            编辑
          </Button>
          <Popconfirm
            title="系统提示"
            description="确认删除角色?"
            onConfirm={() => { del(ret.roleId) }}
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
      <Table dataSource={roleList} columns={columns} />
      <AddRole open={open} setOpen={setOpen} loadList={loadList} roleId={roleId} setRoleId={setRoleId}/>
      <MyNotification notiMsg={notiMsg} />
    </>
  )
}
