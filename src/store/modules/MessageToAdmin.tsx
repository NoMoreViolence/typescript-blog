import { handleActions, Action, createAction } from 'redux-actions';
import produce from 'immer';

import axios from 'axios';

function postMessageAPI(message: string) {
  return axios.post('/api/ripple/talk', {
    message
  });
}

// 서버에 메시지 보내는
const POST_MESSAGE_TO_ADMIN = 'POST_MESSAGE_TO_ADMIN';
const POST_MESSAGE_TO_ADMIN_PENDING = 'POST_MESSAGE_TO_ADMIN_PENDING';
const POST_MESSAGE_TO_ADMIN_SUCCESS = 'POST_MESSAGE_TO_ADMIN_SUCCESS';
const POST_MESSAGE_TO_ADMIN_FAILURE = 'POST_MESSAGE_TO_ADMIN_FAILURE';
// 인풋 변경
const HANDLE_CHANGE = 'HANDLE_CHANGE';
type ChangeInputPayload = string;

// 이런식으로 하는 것도 방법
export const MessageToAdminActions = {
  postMessage: createAction(POST_MESSAGE_TO_ADMIN, postMessageAPI),
  handleChange: createAction<ChangeInputPayload>(HANDLE_CHANGE)
};

//  기본 State 타입 정의
export interface AdminRippleState {
  MessageToAdminPending: boolean;
  MessageToAdminError: boolean;
  MessageToAdminMessage: string | undefined;
}
// 초기 상태
const initialState: AdminRippleState = {
  MessageToAdminPending: false,
  MessageToAdminError: false,
  MessageToAdminMessage: ''
};

// 액션 상태
export default handleActions(
  {
    [POST_MESSAGE_TO_ADMIN_PENDING]: state => ({
      ...state,
      MessageToAdminPending: true,
      MessageToAdminError: false
    }),
    [POST_MESSAGE_TO_ADMIN_SUCCESS]: state => ({
      ...state,
      MessageToAdminPending: false,
      MessageToAdminError: false,
      MessageToAdminMessage: ''
    }),
    [POST_MESSAGE_TO_ADMIN_FAILURE]: state => ({
      ...state,
      MessageToAdminPending: false,
      MessageToAdminError: true
    }),
    [HANDLE_CHANGE]: (state, action: Action<ChangeInputPayload>) => {
      return produce(state, (draft: AdminRippleState) => {
        // tslint:disable-next-line:no-unused-expression
        draft.MessageToAdminMessage = action.payload;
      });
    }
  },
  initialState
);
