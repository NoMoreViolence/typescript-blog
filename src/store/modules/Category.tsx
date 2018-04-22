import { handleActions, Action, createAction } from 'redux-actions';

import axios from 'axios';

function getCategoryAPI() {
  return axios.get('/api/category/all');
}

const GET_CATEGORY = 'GET_CATEGORY';
const GET_CATEGORY_PENDING = 'GET_CATEGORY_PENDING';
const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';

// 이런식으로 하는 것도 방법
export const getPost = createAction(GET_CATEGORY, getCategoryAPI);

/*
export const getCategoryApiStart = () => (dispatch: (type: object) => void) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({ type: GET_CATEGORY_PENDING });

  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getCategoryAPI()
    .then(response => {
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload: response
      });
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      dispatch({
        type: GET_CATEGORY_FAILURE,
        payload: error
      });
      // error 를 throw 하여, 이 함수가 실행 된 다음에 다시한번 catch 를 할 수 있게 합니다.
      throw error;
    });
};
*/

// 초기 상태
const initialState = {
  pending: false,
  error: false,
  category: []
};

// 카테고리 페이로드 정의 근데 내 실력이 부족해서 명확하게 쓸 부분만 정의할 수가 없었다, 그래서 any값을 우겨넣었다
type CategoryPayload = any;

// 액션 상태
export default handleActions(
  {
    [GET_CATEGORY_PENDING]: state => ({
      ...state,
      pending: true,
      error: false,
      category: []
    }),
    [GET_CATEGORY_SUCCESS]: (state, action: Action<CategoryPayload>) => ({
      ...state,
      pending: false,
      error: false,
      category: action.payload.data.category
    }),
    [GET_CATEGORY_FAILURE]: state => ({
      ...state,
      pending: false,
      error: true,
      category: []
    })
  },
  initialState
);
