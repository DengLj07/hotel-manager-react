import axios from '../utils/request';


export let roomList = [
  {
    roomId:1,
    roomState:{roomStateId:1, roomStateName:'空闲'},
    roomStateId:1,
    roomType:{roomTypeId:1, roomTypeName:'标准间',bedNum:1,roomTypePrice:200,typeDescription:'无'},
    roomTypeId:1
  },
  {
    roomId:2,
    roomState:{roomStateId:1, roomStateName:'维修'},
    roomStateId:1,
    roomType:{roomTypeId:2, roomTypeName:'双人间',bedNum:2,roomTypePrice:280,typeDescription:'无'},
    roomTypeId:2
  },
  {
    roomId:3,
    roomState:{roomStateId:1, roomStateName:'入住'},
    roomStateId:1,
    roomType:{roomTypeId:3, roomTypeName:'大床房',bedNum:1,roomTypePrice:350,typeDescription:'无'},
    roomTypeId:3
  },
  {
    roomId:4,
    roomState:{roomStateId:1, roomStateName:'空闲'},
    roomStateId:1,
    roomType:{roomTypeId:4, roomTypeName:'豪华房',bedNum:2,roomTypePrice:500,typeDescription:'无'},
    roomTypeId:4
  }
]

// 客房列表
export const $list = async (params) => {
  // let {data} = await axios.get('Admin/List',{params})
  let {pageSize, pageIndex} = params 
  return {
    code:200,
    msg:'获取房间列表成功',
    count:roomList.length,
    data:roomList.slice(pageIndex>1?(pageIndex-1)*pageSize:0,pageIndex*pageSize),
    pageIndex:1,
    pageSize:10
  }
}

// 添加房间
export const $add = async (params) => {
  // let {data} = await axios.get('Admin/List',{params})
  console.log(params)
  // let {pageSize, pageIndex} = params 
  return {
    code:200,
    msg:'添加房间成功'
  }
}

