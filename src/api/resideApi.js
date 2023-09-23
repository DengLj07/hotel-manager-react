import axios from '../utils/request';


export const $list = async () => {
  return {
    code:200,
    msg:'获取状态信息成功',
    data:[
      {
        resideId:1,
        resideStatus:'未结账'
      },
      {
        resideId:2,
        resideStatus:'已结账'
      }
    ]
  }
}