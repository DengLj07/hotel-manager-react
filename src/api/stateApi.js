import axios from '../utils/request';

export const stateList = [
  {
    roomStateId: 1,
    roomStateName: '空闲'
  },
  {
    roomStateId: 2,
    roomStateName: '入住'
  },
  {
    roomStateId: 3,
    roomStateName: '维修'
  }
]

// 房间状态
export const $stateList = async () => {
  // let {data} = await axios.get('Room/state/List',{params})
  return {
    code:200,
    msg:'获取房间状态成功',
    data:stateList
  }
}