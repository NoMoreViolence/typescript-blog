import { handleActions, Action, createAction } from 'redux-actions'
import axios from 'axios'
import produce from 'immer'

// 로그인
function postLogin(username: string, password: string) {
  return axios.post(
    '/api/auth/login',
    {
      username,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

// 자동로그인
function getLogin() {
  return axios.get('api/auth/check', {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
    }
  })
}

// 로그인
const POST_LOGIN = 'POST_LOGIN'
const POST_LOGIN_PENDING = 'POST_LOGIN_PENDING'
const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE'

// 세션 jwt 토큰으로 로그인 체크
const GET_LOGIN_CHECK = 'GET_LOGIN_CHECK'
const GET_LOGIN_CHECK_PENDING = 'GET_LOGIN_CHECK_PENDING'
const GET_LOGIN_CHECK_SUCCESS = 'GET_LOGIN_CHECK_SUCCESS'
const GET_LOGIN_CHECK_FAILURE = 'GET_LOGIN_CHECK_FAILURE'

// 로그아웃
const LOGOUT = 'LOGOUT'

// 인풋 변경, ID와 패스워드
const HANDLE_CHANGE_USERNAME = 'HANDLE_CHANGE_USERNAME'
const HANDLE_CHANGE_PASSWORD = 'HANDLE_CHANGE_PASSWORD'

// Payload 액션 타입 any로 했다, 타입 괜히 지정해주는게 더 귀찮은 부분
type Payload = any

// 로그인 액션 함수 추출
export const LoginActions = {
  // 로그인 성공
  postLogin: createAction(POST_LOGIN, postLogin),
  // 토큰만을 이용해서 로그인 체크할 때
  getLogin: createAction(GET_LOGIN_CHECK, getLogin),
  // Username, Password도 제대로 안켜져
  handleChangeUsername: createAction<Payload>(HANDLE_CHANGE_USERNAME),

  handleChangePassword: createAction<Payload>(HANDLE_CHANGE_PASSWORD),

  logout: createAction(LOGOUT)
}

//  기본 State 타입 정의
export interface LoginState {
  loginType: string
  loginStatusCode: number
  loginLogined: boolean
  loginUsername: string | undefined
  loginPassword: string | undefined
}
// 초기 상태
const initialState: LoginState = {
  loginType: '',
  loginStatusCode: 0,
  loginLogined: false,
  loginUsername: '',
  loginPassword: ''
}

// 액션 상태
export default handleActions(
  {
    // 로그인 시작
    [POST_LOGIN_PENDING]: state =>
      produce(state, (draft: LoginState) => {
        draft.loginLogined = false
        draft.loginType = 'PENDING'
        draft.loginStatusCode = 200
      }),
    // 로그인 성공
    [POST_LOGIN_SUCCESS]: (state, action: Action<Payload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginUsername = ''
        draft.loginPassword = ''
        draft.loginLogined = true
        draft.loginType = 'SUCCESS'
        draft.loginStatusCode = action.payload.status
      }),
    // 로그인 실패
    [POST_LOGIN_FAILURE]: (state, action: Action<Payload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginUsername = ''
        draft.loginPassword = ''
        draft.loginLogined = false
        draft.loginType = 'FAILURE'
        draft.loginStatusCode = action.payload.response.status
      }),

    // 자동로그인 시작
    [GET_LOGIN_CHECK_PENDING]: state =>
      produce(state, (draft: LoginState) => {
        draft.loginLogined = false
        draft.loginType = 'PENDING'
      }),
    // 자동로그인 완료
    [GET_LOGIN_CHECK_SUCCESS]: (state, action: Action<Payload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginLogined = true
        draft.loginType = 'SUCCESS'
        draft.loginStatusCode = action.payload.status
      }),
    // 자동로그인 실패
    [GET_LOGIN_CHECK_FAILURE]: (state, action: Action<Payload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginLogined = false
        draft.loginType = 'FAILURE'
        draft.loginStatusCode = action.payload.response.status
      }),

    // 로그아웃
    [LOGOUT]: state =>
      produce(state, (draft: LoginState) => {
        draft.loginLogined = false
        draft.loginType = 'LOGOUT'
        draft.loginStatusCode = 200
      }),

    // Username 인풋 값 변경
    [HANDLE_CHANGE_USERNAME]: (state, action: Action<Payload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginUsername = action.payload
      }),
    // Password 인풋 값 변경
    [HANDLE_CHANGE_PASSWORD]: (state, action: Action<Payload>) =>
      produce(state, (draft: LoginState) => {
        draft.loginPassword = action.payload
      })
  },
  initialState
)
