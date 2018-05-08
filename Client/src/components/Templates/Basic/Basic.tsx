import * as React from 'react'
import { toast } from 'react-toastify'

interface Props {
  loginLogined: boolean
  getLogin: () => any
  loadCategory: () => void
}

class Basic extends React.Component<Props> {
  // 사이트 초기 로딩 시 토큰 자동 로그인 & 카테고리 데이터 불러오기
  public componentDidMount() {
    const { loadCategory, getLogin, loginLogined } = this.props

    if (loginLogined !== true && sessionStorage.getItem('token') !== null) {
      getLogin()
        .then((res: any) => {
          // 자동 로그인 성공
          toast('관리자님 환영합니다 !')
        })
        .catch((err: any) => {
          // 에러 상황일 경우
          toast(err.response.data.message)
          sessionStorage.clear()
        })
    } else {
      toast('환영합니다 !')
    }

    // 카테고리 로딩
    loadCategory()
  }
  public render() {
    return <div />
  }
}

export default Basic
