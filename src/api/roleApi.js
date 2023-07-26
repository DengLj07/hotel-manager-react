import axios from '../utils/request';
export let srcRoleList = [
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
  }
]
// 角色列表接口
export const $list = async () => {
  // let {data} = await axios.get('Role/List')
  return srcRoleList
}

// 添加角色接口
export const $add = async (params) => {
  srcRoleList = [...srcRoleList, params]
  console.log(srcRoleList)
  return {code:200, msg:'添加角色成功'}
}

