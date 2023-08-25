import axios from '../utils/request';

export let RoomTypeList = [
  {
    bedNum:1,
    roomTypeId:1,
    roomTypeName: '标准间',
    roomTypePrice: 200,
    typeDescription: '无'
  },
  {
    bedNum:2,
    roomTypeId:2,
    roomTypeName: '双人间',
    roomTypePrice: 280,
    typeDescription: '无'
  },
  {
    bedNum:1,
    roomTypeId:3,
    roomTypeName: '大床房',
    roomTypePrice: 350,
    typeDescription: '无'
  },
  {
    bedNum:2,
    roomTypeId:4,
    roomTypeName: '豪华房',
    roomTypePrice: 500,
    typeDescription: '无'
  },
]

export const $list = async () => {
  // let data = await axios.get()
  return {code:200, msg:'获取房型成功', data:RoomTypeList}
}

export const $add = async (params) => {
  RoomTypeList = [...RoomTypeList, params]
  return {code:200, msg:'添加房型成功'}
}

export const $getOne = async (roomTypeId) => {
  const data = RoomTypeList.filter((cur) => {return cur.roomTypeId===roomTypeId})[0]
  return {
    code:200,
    msg:'获取房型信息成功',
    data
  }
}

export const $update = async (params) => {
  const {roomTypeId, roomTypeName, roomTypePrice, bedNum, typeDescription} = params
  RoomTypeList.map((roomObj) => {
    if(roomObj.roomTypeId===roomTypeId){
      roomObj.roomTypeName=roomTypeName
      roomObj.roomTypePrice=roomTypePrice
      roomObj.bedNum=bedNum
      roomObj.typeDescription=typeDescription
    }
  })
  return {code:200,msg:'编辑房型信息成功'}
}

export const $del = async (roomTypeId) => {
  const newRoomTypeList = RoomTypeList.filter((roomObj) => {return roomObj.roomTypeId!==roomTypeId})
  RoomTypeList = newRoomTypeList
  return {code:200, msg:'删除角色成功'}
}