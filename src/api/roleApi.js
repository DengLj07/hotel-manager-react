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
  return {code:200, msg:'添加角色成功'}
}

// 删除角色
export const $del = async(roleId) => {
  const newRoleList = srcRoleList.filter((roleObj) => {return roleObj.roleId!==roleId})
  console.log('new',newRoleList)
  srcRoleList = newRoleList
  console.log(srcRoleList)
  return {code:200, msg:'删除角色成功'}
}

// 根据roleId获取角色信息
export const $getOne = async(params) => {
  // let {data} = await axios.get('Role/GetOne',{params})
  const roleObj = srcRoleList.filter(r => r.roleId===params)
  return {code:200,msg:'获取角色信息成功',data:roleObj[0]}
}

// 编辑角色信息
export const $update = async(params) => {
  // let {data} = await axios.get('Role/update',{params})
  const {roleId,roleName} = params
  srcRoleList.map((roleObj) => {
    if(roleObj.roleId===roleId){
      roleObj.roleName=roleName
    }
  })
  console.log('src',srcRoleList)
  return {code:200,msg:'编辑角色信息成功'}
}