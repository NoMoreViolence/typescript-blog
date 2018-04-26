import * as React from 'react';
import { toast } from 'react-toastify';

interface Props {
  loginLogined: boolean;
  getLoginCheck: () => void;
  loadCategory: () => void;
}

class Basic extends React.Component<Props> {
  public componentDidMount() {
    const { loginLogined, loadCategory, getLoginCheck } = this.props;
    // 자동 로그인 체크
    if (loginLogined !== true && sessionStorage.getItem('token') !== null) {
      fetch('/api/auth/check', {
        method: 'GET',
        headers: {
          'x-access-token': `${sessionStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            // tslint:disable-next-line:no-console
            console.log('현재 관리자 상태 - App.tsx');
            getLoginCheck();
            toast('관리자님 환영합니다 !');
          } else {
            // tslint:disable-next-line:no-console
            console.log('비 정상적인 토큰 감지 - App.tsx');
            toast('비정상적인 토큰 감지');
          }
        })
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.log('로그인 실패, or 인증 실패');
          // tslint:disable-next-line:no-console
          console.log(error.message);
          toast('서버의 오류로 로그인에 실패했습니다 !');
        });
    } else {
      toast('환영합니다 !');
    }
    // 카테고리 로딩
    loadCategory();
  }
  public render() {
    return <div />;
  }
}

export default Basic;
