import { handleActions, Action, createAction } from 'redux-actions'
import produce from 'immer'
import axios from 'axios'

// 모든 카테고리 불러오는 함수
function getCategoryAPI() {
  return axios.get('/api/category/all')
}

// 카테고리 불러오기
const GET_BRING_CATEGORY = 'GET_BRING_CATEGORY'
const GET_BRING_CATEGORY_PENDING = 'GET_BRING_CATEGORY_PENDING'
const GET_BRING_CATEGORY_SUCCESS = 'GET_BRING_CATEGORY_SUCCESS'
const GET_BRING_CATEGORY_FAILURE = 'GET_BRING_CATEGORY_FAILURE'
// 카테고리 추가
const POST_ADD_CATEGORY_SUCCESS = 'POST_ADD_CATEGORY_SUCCESS'
const POST_ADD_CATEGORY_FAILURE = 'POST_ADD_CATEGORY_FAILURE'
// 카테고리 변경
const PATCH_CHANGE_CATEGORY_SELECT = 'PATCH_CHANGE_CATEGORY_SELECT'
const PATCH_CHANGE_CATEGORY_PENDING = 'PATCH_CHANGE_CATEGIRT_PENDING'
const PATCH_CHANGE_CATEGORY_SUCCESS = 'PATCH_CHANGE_CATEGORY_SUCCESS'
const PATCH_CHANGE_CATEGORY_FAILURE = 'PATCH_CHANGE_CATEGORY_FAILURE'
// 카테고리 삭제
const DELETE_CHANGE_CATEGORY_SELECT = 'DELETE_CHANGE_CATEGORY-SELECT'
const DELETE_DELETE_CATEGORY_PENDING = 'DELETE_DELETE_CATEGORY_PENDING'
const DELETE_DELETE_CATEGORY_SUCCESS = 'DELETE_DELETE_CATEGORY_SUCCESS'
const DELETE_DELETE_CATEGORY_FAILURE = 'DELETE_DELETE_CATEGORY_FAILURE'
// 카테고리 페이로드 정의 근데 내 실력이 부족해서 명확하게 쓸 부분만 정의할 수가 없었다, 그래서 any값을 우겨넣었다
type CategoryPayload = any
type CategoryInputPayload = string

// 카테고리 가져오는 액션 방출
export const CategoryActions = {
  getCategory: createAction(GET_BRING_CATEGORY, getCategoryAPI),
  // 카테고리 추가
  addCategorySuccess: createAction(POST_ADD_CATEGORY_SUCCESS),
  addCategoryFailure: createAction(POST_ADD_CATEGORY_FAILURE),
  // 카테고리 변경
  changeCategorySelect: createAction<CategoryInputPayload>(PATCH_CHANGE_CATEGORY_SELECT),
  changeCategoryPending: createAction(PATCH_CHANGE_CATEGORY_PENDING),
  changeCategorySuccess: createAction(PATCH_CHANGE_CATEGORY_SUCCESS),
  changeCategoryFailure: createAction(PATCH_CHANGE_CATEGORY_FAILURE),
  // 카테고리 삭제
  deleteCategorySelect: createAction<CategoryInputPayload>(DELETE_CHANGE_CATEGORY_SELECT),
  deleteCategoryPending: createAction(DELETE_DELETE_CATEGORY_PENDING),
  deleteCategorySuccess: createAction(DELETE_DELETE_CATEGORY_SUCCESS),
  deleteCategoryFailure: createAction(DELETE_DELETE_CATEGORY_FAILURE)
}
// 카테고리 들어있는 부분의 State 정의
export interface CategoryStateInside {
  posts: [string]
  _id: string
  category: string
  __v: number
}
// 카테고리 기본 State 타입 정의
export interface CategoryState {
  categoryPending: boolean
  categoryError: boolean
  categoryCategory: [CategoryStateInside]
  changeCategoryValue: string | undefined
  deleteCategoryValue: string | undefined
}
// 초기 상태
const initialState: CategoryState = {
  categoryPending: false,
  categoryError: false,
  categoryCategory: [{ posts: [''], _id: '', category: '', __v: 0 }],
  changeCategoryValue: '변경할 카테고리 선택',
  deleteCategoryValue: '삭제할 카테고리 선택'
}

// 액션 상태
export default handleActions(
  {
    // 카테고리 가져오기 대기 중...
    [GET_BRING_CATEGORY_PENDING]: state =>
      produce(state, (draft: CategoryState) => {
        draft.categoryPending = true
        draft.categoryError = false
      }),
    // 카테고리 가져오기 성공
    [GET_BRING_CATEGORY_SUCCESS]: (state, action: Action<CategoryPayload>) =>
      produce(state, (draft: CategoryState) => {
        draft.categoryPending = false
        draft.categoryError = false
        draft.categoryCategory = action.payload.data.category
      }),
    // 카테고리 가져오기 실패
    [GET_BRING_CATEGORY_FAILURE]: state =>
      produce(state, (draft: CategoryState) => {
        draft.categoryPending = false
        draft.categoryError = true
        draft.categoryCategory = [{ posts: [''], _id: '', category: '', __v: 0 }]
      }),
    // 카테고리 추가 성공
    [POST_ADD_CATEGORY_SUCCESS]: state =>
      produce(state, (draft: CategoryState) => {
        // 딱히 무엇을 변경하지는 않는다, Redux-Dev-Tools를 사용하기 위함
      }),
    // 카테고리 추가 실패
    [POST_ADD_CATEGORY_FAILURE]: state =>
      produce(state, (draft: CategoryState) => {
        // 딱히 무엇을 변경하지는 않는다, Redux-Dev-Tools를 사용하기 위함
      }),
    // 변경할 카테고리 셀렉트값 변경
    [PATCH_CHANGE_CATEGORY_SELECT]: (state, action: Action<CategoryInputPayload>) =>
      produce(state, (draft: CategoryState) => {
        draft.changeCategoryValue = action.payload
      }),
    // 특정 카테고리 변경 작업 시작
    [PATCH_CHANGE_CATEGORY_PENDING]: state =>
      produce(state, (draft: CategoryState) => {
        // 딱히 무엇을 변경하지는 않는다, Redux-Dev-Tools를 사용하기 위함
      }),
    // 특정 카테고리 변경 성공
    [PATCH_CHANGE_CATEGORY_SUCCESS]: state =>
      produce(state, (draft: CategoryState) => {
        // 카테고리 변경 작업이 완료되었으므로 바꾸어 준다
        draft.changeCategoryValue = '변경할 카테고리 선택'
      }),
    // 특정 카테고리 변경 실패
    [PATCH_CHANGE_CATEGORY_FAILURE]: state =>
      produce(state, (draft: CategoryState) => {
        // 딱히 무엇을 변경하지는 않는다, Redux-Dev-Tools를 사용하기 위함
      }),
    // 삭제할 카테고리 셀렉트값 변경
    [DELETE_CHANGE_CATEGORY_SELECT]: (state, action: Action<CategoryInputPayload>) =>
      produce(state, (draft: CategoryState) => {
        draft.deleteCategoryValue = action.payload
      }),
    // 특정 카테고리 삭제 시작
    [DELETE_DELETE_CATEGORY_PENDING]: state =>
      produce(state, (draft: CategoryState) => {
        // 딱히 무엇을 변경하지는 않는다, Redux-Dev-Tools를 사용하기 위함
      }),
    // 특정 카테고리 삭제 성공
    [DELETE_DELETE_CATEGORY_SUCCESS]: state =>
      produce(state, (draft: CategoryState) => {
        // 카테고리 변경 작업이 완료되었으므로 바꾸어 준다
        draft.deleteCategoryValue = '삭제할 카테고리 선택'
      }),
    // 특정 카테고리 삭제 실패
    [DELETE_DELETE_CATEGORY_FAILURE]: state =>
      produce(state, (draft: CategoryState) => {
        // 딱히 무엇을 변경하지는 않는다, Redux-Dev-Tools를 사용하기 위함
      })
  },
  initialState
)

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
