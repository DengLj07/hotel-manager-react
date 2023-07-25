import React,{useEffect,useState} from 'react';
import { Table } from 'antd';
import md5 from 'md5';
import { $list } from '../../api/roleApi';


export default function Role() {
  let [roleList,setRoleList] = useState([])
  useEffect(() => { 
    $list().then((data) => {
      data = data.map((r) => { return {...r, key:r.roleId} })
      setRoleList(data)
    })
   },[])
  
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
      <Table dataSource={roleList} columns={columns} />;
    </>
  )
}
