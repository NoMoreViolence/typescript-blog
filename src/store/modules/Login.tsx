import { handleActions, Action, createAction } from 'redux-actions';
import produce from 'immer';

// 로그인
const POST_LOGIN = 'POST_LOGIN';
const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE';
// 세션 jwt 토큰으로 로그인 체크
const GET_LOGIN_CHECK = 'GET_LOGIN_CHECK';
// 로그아웃
const LOGOUT = 'LOGOUT';
// 인풋 변경, ID와 패스워드
const HANDLE_CHANGE_USERNAME = 'HANDLE_CHANGE_USERNAME';
const HANDLE_CHANGE_PASSWORD = 'HANDLE_CHANGE_PASSWORD';
type ChangeInputPayload = string;

// 로그인 액션 함수 추출
export const LoginActions = {
  // 로그인 성공
  postLogined: createAction<ChangeInputPayload>(POST_LOGIN),
  // 로그인 실패 시
  postLoginFailed: createAction(POST_LOGIN_FAILURE),
  // 토큰만을 이용해서 로그인 체크할 때
  getLoginCheck: createAction(GET_LOGIN_CHECK),
  // Username, Password도 제대로 안켜져
  handleChangeUsername: createAction<ChangeInputPayload>(
    HANDLE_CHANGE_USERNAME
  ),

  handleChangePassword: createAction<ChangeInputPayload>(
    HANDLE_CHANGE_PASSWORD
  ),
  logout: createAction(LOGOUT)
};

//  기본 State 타입 정의
export interface LoginState {
  loginLogined: boolean;
  loginUsername: string | undefined;
  loginPassword: string | undefined;
}
// 초기 상태
const initialState: LoginState = {
  loginLogined: false,
  loginUsername: '',
  loginPassword: ''
};

// 액션 상태
export default handleActions(
  {
    // 로그인 시 상태변화 3가지
    [POST_LOGIN]: (state, action: Action<ChangeInputPayload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginLogined = true;
      }),
    [POST_LOGIN_FAILURE]: state =>
      produce(state, (draft: LoginState) => {
        (draft.loginUsername = ''), (draft.loginPassword = '');
      }),
    // 토큰이 존재할 시 로그인 토큰값 조회후 로그인 조회 값
    [GET_LOGIN_CHECK]: state =>
      produce(state, (draft: LoginState) => {
        // 로그인 성공 시
        draft.loginLogined = true;
      }),
    // UserName 인풋 값 변경
    [HANDLE_CHANGE_USERNAME]: (state, action: Action<ChangeInputPayload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginUsername = action.payload;
      }),
    // Password 인풋 값 변경
    [HANDLE_CHANGE_PASSWORD]: (state, action: Action<ChangeInputPayload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginPassword = action.payload;
      }),
    // 로그아웃
    [LOGOUT]: (state, action: Action<ChangeInputPayload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginLogined = false;
      })
  },
  initialState
);
