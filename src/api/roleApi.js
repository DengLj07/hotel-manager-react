import axios from '../utils/request';

// 角色列表接口
export const $list = async () => {
  // let {data} = await axios.get('Role/List')
  const data = [
    {
      roleId:1,
      roleName:'系统管理员',
    },
    {
      roleId:2,
      roleName:'普通管理员',
    },
    {
      roleId:3,
      roleName:'Vip用户',
    },
  ]
  return data
}



