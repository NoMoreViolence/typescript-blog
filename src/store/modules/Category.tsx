import { handleActions, Action, createAction } from 'redux-actions';

import axios from 'axios';

// 모든 카테고리 불러오는 함수
function getCategoryAPI() {
  return axios.get('/api/category/all');
}

const GET_CATEGORY = 'GET_CATEGORY';
const GET_CATEGORY_PENDING = 'GET_CATEGORY_PENDING';
const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';
// 카테고리 페이로드 정의 근데 내 실력이 부족해서 명확하게 쓸 부분만 정의할 수가 없었다, 그래서 any값을 우겨넣었다
type CategoryPayload = any;

// 방출
export const CategoryActions = {
  getCategory: createAction(GET_CATEGORY, getCategoryAPI)
};

/*
redux-thunk만 사용할 때는 이렇게 해야합니다
export const getCategoryApiStart = () => (dispatch: (type: object) => void) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({ type: GET_CATEGORY_categoryPending });

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
    .catch(categoryError => {
      // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
      dispatch({
        type: GET_CATEGORY_FAILURE,
        payload: categoryError
      });
      // categoryError 를 throw 하여, 이 함수가 실행 된 다음에 다시한번 catch 를 할 수 있게 합니다.
      throw categoryError;
    });
};
*/

// 카테고리 들어있는 부분의 State 정의
export interface CategoryStateInside {
  posts: [string];
  _id: string;
  category: string;
  __v: number;
}
// 카테고리 기본 State 타입 정의
export interface CategoryState {
  categoryPending: boolean;
  categoryError: boolean;
  categoryCategory: [CategoryStateInside];
}
// 초기 상태
const initialState: CategoryState = {
  categoryPending: false,
  categoryError: false,
  categoryCategory: [{ posts: [''], _id: '', category: '', __v: 0 }]
};

// 액션 상태
export default handleActions(
  {
    [GET_CATEGORY_PENDING]: state => ({
      ...state,
      categoryPending: true,
      categoryError: false,
      categoryCategory: []
    }),
    [GET_CATEGORY_SUCCESS]: (state, action: Action<CategoryPayload>) => ({
      ...state,
      categoryPending: false,
      categoryError: false,
      categoryCategory: action.payload.data.category
    }),
    [GET_CATEGORY_FAILURE]: state => ({
      ...state,
      categoryPending: false,
      categoryError: true,
      categoryCategory: []
    })
  },
  initialState
);
