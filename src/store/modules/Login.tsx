import { handleActions, Action, createAction } from 'redux-actions';
import produce from 'immer';
import axios from 'axios';

// 로그인 함수
function postLoginAPI(username: string, password: string) {
  return axios.post('/api/auth/login', {
    username,
    password
  });
}
// 토큰으로 로그인 체크하는 함수
function getLoginCheckAPI(token: string) {
  return axios.get('/api/auth/check', {
    params: {
      token
    }
  });
}

// 로그인
const POST_LOGIN = 'POST_LOGIN';
const POST_LOGIN_PENDING = 'POST_LOGIN_PENDING';
const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE';
// 세션 jwt 토큰으로 로그인 체크
const GET_LOGIN_CHECK = 'POST_LOGIN_CHECK';
const GET_LOGIN_CHECK_PENDING = 'GET_LOGIN_CHECK_PENDING';
const GET_LOGIN_CHECK_SUCCESS = 'GET_LOGIN_CHECK_SUCCESS';
const GET_LOGIN_CHECK_FAILURE = 'GET_LOGIN_CHECK_FAILURE';
// 로그아웃
const LOGOUT = 'LOGOUT';
// 인풋 변경, ID와 패스워드
const HANDLE_CHANGE_USERNAME = 'HANDLE_CHANGE_USERNAME';
const HANDLE_CHANGE_PASSWORD = 'HANDLE_CHANGE_PASSWORD';
type ChangeInputPayload = string;

// 로그인 액션 함수 추출
export const LoginActions = {
  postLogin: createAction(POST_LOGIN, postLoginAPI),
  getLoginCheck: createAction(GET_LOGIN_CHECK, getLoginCheckAPI),
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
  loginPending: boolean;
  loginError: boolean;
  loginUsername: string | undefined;
  loginPassword: string | undefined;
}
// 초기 상태
const initialState: LoginState = {
  loginLogined: false,
  loginPending: false,
  loginError: false,
  loginUsername: '',
  loginPassword: ''
};

// 액션 상태
export default handleActions(
  {
    // 로그인 시 상태변화 3가지
    [POST_LOGIN_PENDING]: state => ({
      ...state,
      loginPending: true,
      loginError: false
    }),
    [POST_LOGIN_SUCCESS]: state => ({
      ...state,
      loginLogined: true,
      loginPending: false,
      loginError: false,
      loginUsername: ''
    }),
    [POST_LOGIN_FAILURE]: state => ({
      ...state,
      loginPending: false,
      loginError: true
    }),
    // 토큰이 존재할 시 로그인 토큰값 조회할 때 사용하는 값
    [GET_LOGIN_CHECK_PENDING]: state => ({
      ...state,
      loginPending: true,
      loginError: false
    }),
    [GET_LOGIN_CHECK_SUCCESS]: state => ({
      ...state,
      loginLogined: true,
      loginPending: false,
      loginError: false
    }),
    [GET_LOGIN_CHECK_FAILURE]: state => ({
      ...state,
      loginPending: false,
      loginError: true
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
