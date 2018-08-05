import { handleActions, Action, createAction } from 'redux-actions'
import axios from 'axios'
import produce from 'immer'

// Login method
export interface LoginInterface {
  username: string
  password: string
}
function login(value: LoginInterface) {
  return axios.post(
    '/api/auth/login',
    {
      username: value.username,
      password: value.password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

// Auto login
export interface AutoLoginInterface {
  token: string | null
}
function autoLogin(value: AutoLoginInterface) {
  return axios.post(
    '/api/auth/check',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': value.token
      }
    }
  )
}

// login action
const LOGIN = 'LOGIN'
const LOGIN_PENDING = 'LOGIN_PENDING'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

// auto login action
const AUTO_LOGIN_CHECK = 'AUTO_LOGIN_CHECK'
const AUTO_LOGIN_CHECK_PENDING = 'AUTO_LOGIN_CHECK_PENDING'
const AUTO_LOGIN_CHECK_SUCCESS = 'AUTO_LOGIN_CHECK_SUCCESS'
const AUTO_LOGIN_CHECK_FAILURE = 'AUTO_LOGIN_CHECK_FAILURE'

// logout action
const LOGOUT = 'LOGOUT'

// change input => username & password
const HANDLE_CHANGE_USERNAME = 'HANDLE_CHANGE_USERNAME'
const HANDLE_CHANGE_PASSWORD = 'HANDLE_CHANGE_PASSWORD'

// api payload action, I can't handle api return value
type Payload = any

// login action method export
export const LoginActions = {
  // login method
  login: createAction(LOGIN, login),
  // auto login method
  autoLogin: createAction(AUTO_LOGIN_CHECK, autoLogin),
  // change username
  handleChangeUsername: createAction<string, string>(HANDLE_CHANGE_USERNAME, value => value),
  // change password
  handleChangePassword: createAction<string, string>(HANDLE_CHANGE_PASSWORD, value => value),
  // logout method
  logout: createAction(LOGOUT)
}

//  basic login state
export interface LoginState {
  loginType: string
  loginStatusCode: number
  loginLogined: boolean
  loginUsername: string
  loginPassword: string
}
// initial state
const initialState: LoginState = {
  loginType: '',
  loginStatusCode: 0,
  loginLogined: false,
  loginUsername: '',
  loginPassword: ''
}

// adding return type
type changeUsernameInputPayloadAction = ReturnType<typeof LoginActions.handleChangeUsername>
type changePasswordInputPayloadAction = ReturnType<typeof LoginActions.handleChangePassword>

// export reducer
const reducer = handleActions<LoginState, any>(
  {
    // login pending
    [LOGIN_PENDING]: state =>
      produce(state, draft => {
        draft.loginLogined = false
        draft.loginType = 'PENDING'
        draft.loginStatusCode = 200
      }),
    // login success
    [LOGIN_SUCCESS]: (state, action: Action<Payload>) =>
      produce(state, draft => {
        draft.loginUsername = ''
        draft.loginPassword = ''
        draft.loginLogined = true
        draft.loginType = 'SUCCESS'
        draft.loginStatusCode = action.payload.status
      }),
    // login failure
    [LOGIN_FAILURE]: (state, action: Action<Payload>) =>
      produce(state, draft => {
        draft.loginUsername = ''
        draft.loginPassword = ''
        draft.loginLogined = false
        draft.loginType = 'FAILURE'
        draft.loginStatusCode = action.payload.response.status
      }),

    // auto login pending
    [AUTO_LOGIN_CHECK_PENDING]: state =>
      produce(state, draft => {
        draft.loginLogined = false
        draft.loginType = 'PENDING'
      }),
    // auto login success
    [AUTO_LOGIN_CHECK_SUCCESS]: (state, action: Action<Payload>) =>
      produce(state, draft => {
        draft.loginLogined = true
        draft.loginType = 'SUCCESS'
        draft.loginStatusCode = action.payload.status
      }),
    // auto login failure
    [AUTO_LOGIN_CHECK_FAILURE]: (state, action: Action<Payload>) =>
      produce(state, draft => {
        draft.loginLogined = false
        draft.loginType = 'FAILURE'
        draft.loginStatusCode = action.payload.response.status
      }),

    // logout
    [LOGOUT]: state => {
      sessionStorage.clear()
      return produce(state, draft => {
        draft.loginLogined = false
        draft.loginType = 'LOGOUT'
        draft.loginStatusCode = 200
      })
    },

    // change username
    [HANDLE_CHANGE_USERNAME]: (state, action: changeUsernameInputPayloadAction) =>
      produce(state, (draft: LoginState) => {
        draft.loginUsername = action.payload || ''
      }),
    // change password
    [HANDLE_CHANGE_PASSWORD]: (state, action: changePasswordInputPayloadAction) =>
      produce(state, (draft: LoginState) => {
        draft.loginPassword = action.payload || ''
      })
  },
  initialState
)

export default reducer
