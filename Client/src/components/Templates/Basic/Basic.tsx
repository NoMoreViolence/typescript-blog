import * as React from 'react'

import { toast } from 'react-toastify'

import { AutoLoginInterface } from 'store/modules/Login'

interface Props {
  loginLogined: boolean
  getLogin: (value: AutoLoginInterface) => any
  loadCategory: () => void
}

interface ClientAutoLoginInterface {
  loginLogined: boolean
  token: string | null
}

class Basic extends React.Component<Props> {
  // auto login & bring category data
  public componentDidMount(): void {
    const { loadCategory, getLogin, loginLogined } = this.props

    // loading Category => basic data
    loadCategory()

    // check user is logined or not
    const checkLoginLogined = (data: ClientAutoLoginInterface): Promise<object> => {
      if (data.loginLogined !== true) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('User_Already_Logined'))
    }

    // check token is exist or not
    const checkTokenExist = (data: ClientAutoLoginInterface): Promise<object> => {
      if (data.token !== null) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('None_Token_Data'))
    }

    // request auto login
    const autoLogin = async (data: ClientAutoLoginInterface): Promise<void> => {
      await getLogin({ token: data.token })
        .then((res: any) => {
          toast('관리자님 환영합니다 !')
        })
        .catch((err: any) => {
          sessionStorage.clear()
          toast('이런.. 토큰값이 손상되었네요.. 재 로그인해 주세요 !')
        })
    }

    // error handler
    const onError = (err: Error): void => {
      toast('환영합니다 !')
    }

    // Promise
    checkLoginLogined({ loginLogined, token: sessionStorage.getItem('token') })
      .then(checkTokenExist)
      .then(autoLogin)
      .catch(onError)
  }
  public render(): JSX.Element {
    return <React.Fragment />
  }
}

export default Basic
