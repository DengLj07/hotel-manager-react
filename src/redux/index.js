import { createSlice, configureStore } from "@reduxjs/toolkit";

//创建子模块
export const loginAdmin = createSlice({
  name:'loginAdmin',
  // 初始状态
  initialState:{
    admin:{
      name:'张三', 
      age:18
    }
  },
  // 整合器
  reducers:{
    setAdmin(state, action){
      state.admin = action.payload
    }
  }
})

//创建store，合并所有子模块
const store = configureStore({
  reducer:{
    loginAdmin:loginAdmin.reducer
  }
})
export default store