import md5 from 'md5';


// 登陆方法
export const $login = async (params) => {
  if (params.loginPwd === '123456' && params.loginId === 'admin'){
    const token = md5(params.loginPwd)
    sessionStorage.setItem('token', token)
    return {
      "message": "登陆成功",
      "code": 200,
      token
    }
  }else{
    return {
      "message": "账号密码错误",
      "code": 500,
      "token": ''
    }
  }
}


