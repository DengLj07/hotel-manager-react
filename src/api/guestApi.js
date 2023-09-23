import axios from '../utils/request';

export const guestList = [
  {
    guestId: 1,
    identityId: 555,
    guestName: '张三',
    phone:'13244444444',
    roomId: 1,
    room:{roomType:{
      roomTypeName:'标准间',
      roomTypePrice: 200,
      roomTypeBedNum: 2,
      roomTypeId:1
    }},
    resideDate: '2023-09-01 10:10:10',
    deposit:'200',
    guestNum:1,
    leaveDate: '2023-09-05 10:10:10',
    reside:{resideStateName: '未结账',resideStateId:1},
    totalMoney:200
  },
  {
    guestId: 2,
    identityId: 123123123,
    guestName: '李四',
    phone:'13352125621',
    roomId: 2,
    room:{roomType:{
      roomTypeName:'大床房',
      roomTypePrice: 300,
      roomTypeBedNum: 2,
      roomTypeId:3
    }},
    resideDate: '2023-09-01 10:10:10',
    deposit:'300',
    guestNum: 2,
    leaveDate: '2023-09-02 10:10:10',
    reside:{resideStateName: '已结账',resideStateId:1},
    totalMoney:350
  }
]

// 顾客列表
export const $list = async (params) => {
  // let {data} = await axios.get('Admin/List',{params})
  let {pageSize, pageIndex} = params 
  return {
    code:200,
    msg:'获取顾客列表成功',
    count:guestList.length,
    data:guestList.slice(pageIndex>1?(pageIndex-1)*pageSize:0,pageIndex*pageSize),
    pageIndex:1,
    pageSize:10
  }
}

// 添加顾客
export const $add = async (params) => {
  // let {data} = await axios.get('Admin/List',{params})
  // let {pageSize, pageIndex} = params 
  return {
    code:200,
    msg:'添加顾客成功'
  }
}

// 删除顾客
export const $del = async (params) => {
  // let {data} = await axios.get('Admin/List',{params})
  // let {pageSize, pageIndex} = params 
  return {
    code:200,
    msg:'删除顾客成功'
  }
}

// 编辑顾客
export const $edit = async (params) => {
  // let {data} = await axios.get('Admin/List',{params})
  console.log(params)
  // let {pageSize, pageIndex} = params 
  return {
    code:200,
    msg:'编辑房间成功'
  }
}

// 获取单个顾客
export const $getOne = async (params) => {
  // let {data} = await axios.get('Admin/List',{params})
  let {guestId} = params
  const data = guestList.filter((cur) => {return cur.guestId===guestId})[0]
  return {
    code:200,
    msg:'获取顾客信息成功',
    data
  }
}

export const $checkout = async (guestId) => {
  return {
    code:200,
    msg:'结账成功',
    totalMoney: 200
  }
}