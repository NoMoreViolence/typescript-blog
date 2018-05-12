import { handleActions, Action, createAction } from 'redux-actions'
import produce from 'immer'
import axios from 'axios'

// 모든 카테고리 불러오는 함수
function getCategorysAPI() {
  return axios.get('/api/categories')
}

// 카테고리를 추가하는 API
function postCategoryAddAPI(newCategory: string) {
  return axios.post(
    `/api/${newCategory}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token')
      }
    }
  )
}

// 카테고리를 변경하는 API
function patchCategoryChangeAPI(oldCategory: string, newCategory: string) {
  return axios.patch(
    `/api/${oldCategory}`,
    { changeCategory: newCategory },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token')
      }
    }
  )
}

// 카테고리를 삭제하는 API
function deleteCategoryDeleteAPI(Category: string) {
  return axios.delete(`/api/${Category}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
    }
  })
}

// 카테고리 불러오기
const GET_BRING_CATEGORYS = 'GET_BRING_CATEGORYS'
const GET_BRING_CATEGORYS_PENDING = 'GET_BRING_CATEGORYS_PENDING'
const GET_BRING_CATEGORYS_SUCCESS = 'GET_BRING_CATEGORYS_SUCCESS'
const GET_BRING_CATEGORYS_FAILURE = 'GET_BRING_CATEGORYS_FAILURE'
// 카테고리 추가
const POST_ADD_CATEGORY_INPUT_CHANGE = 'POST_ADD_CATEGORY_INPUT_CHANGE'
const POST_ADD_CATEGORY = 'POST_ADD_CATEGORY'
const POST_ADD_CATEGORY_PENDING = 'POST_ADD_CATEGORY_PENDING'
const POST_ADD_CATEGORY_SUCCESS = 'POST_ADD_CATEGORY_SUCCESS'
const POST_ADD_CATEGORY_FAILURE = 'POST_ADD_CATEGORY_FAILURE'
// 카테고리 변경
const PATCH_CHANGE_CATEGORY_INPUT_CHANGE = 'PATCH_CHANGE_CATEGORY_INPUT_CHANGE'
const PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE = 'PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE'
const PATCH_CHANGE_CATEGORY = 'PATCH_CHANGE_CATEGORY'
const PATCH_CHANGE_CATEGORY_PENDING = 'PATCH_CHANGE_CATEGORY_PENDING'
const PATCH_CHANGE_CATEGORY_SUCCESS = 'PATCH_CHANGE_CATEGORY_SUCCESS'
const PATCH_CHANGE_CATEGORY_FAILURE = 'PATCH_CHANGE_CATEGORY_FAILURE'
// 카테고리 삭제
const DELETE_DELETE_CATEGORY_INPUT_CHANGE = 'DELETE_DELETE_CATEGORY_INPUT_CHANGE'
const DELETE_DELETE_CATEGORY_CATEGORY_CHANGE = 'DELETE_DELETE_CATEGORY-CATEGORY_CHANGE'
const DELETE_DELETE_CATEGORY = 'DELETE_DELETE_CATEGORY'
const DELETE_DELETE_CATEGORY_PENDING = 'DELETE_DELETE_CATEGORY_PENDING'
const DELETE_DELETE_CATEGORY_SUCCESS = 'DELETE_DELETE_CATEGORY_SUCCESS'
const DELETE_DELETE_CATEGORY_FAILURE = 'DELETE_DELETE_CATEGORY_FAILURE'
// 모든 작업이 끝났을 때 실행해주는 초기화 변수
const CATEGORY_DONE = 'CATEGORY_DONE'

// 카테고리 페이로드 정의 근데 내 실력이 부족해서 명확하게 쓸 부분만 정의할 수가 없었다, 그래서 any값을 우겨넣었다
type CategoryPayload = any
type CategoryInputPayload = string

// 카테고리 가져오는 액션 방출
export const CategoryActions = {
  // 카테고리 로딩하는 API
  getCategory: createAction(GET_BRING_CATEGORYS, getCategorysAPI),

  // 카테고리 추가
  addCategoryInputChange: createAction<CategoryInputPayload>(POST_ADD_CATEGORY_INPUT_CHANGE),
  addCategory: createAction(POST_ADD_CATEGORY, postCategoryAddAPI),

  // 카테고리 변경
  changeCategoryInputChange: createAction<CategoryInputPayload>(PATCH_CHANGE_CATEGORY_INPUT_CHANGE),
  changeCategoryCategoryChange: createAction<CategoryInputPayload>(PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE),
  changeCategory: createAction(PATCH_CHANGE_CATEGORY, patchCategoryChangeAPI),

  // 카테고리 삭제
  deleteCategoryInputChange: createAction<CategoryInputPayload>(DELETE_DELETE_CATEGORY_INPUT_CHANGE),
  deleteCategoryCategoryChange: createAction<CategoryInputPayload>(DELETE_DELETE_CATEGORY_CATEGORY_CHANGE),
  deleteCategory: createAction(DELETE_DELETE_CATEGORY, deleteCategoryDeleteAPI),

  // 모든 작업이 끝났을 때 실행해주는 초기화 변수
  categoryDone: createAction(CATEGORY_DONE)
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

  addCategoryPending: boolean
  addCategoryInputValue: string | undefined

  changeCategoryPending: boolean
  changeCategoryCategoryValue: string | undefined
  changeCategoryInputValue: string | undefined

  deleteCategoryPending: boolean
  deleteCategoryCategoryValue: string | undefined
  deleteCategoryInputValue: string | undefined
}
// 초기 상태
const initialState: CategoryState = {
  categoryPending: false,
  categoryError: false,
  categoryCategory: [{ posts: [''], _id: '', category: '', __v: 0 }],

  addCategoryPending: false,
  addCategoryInputValue: '',

  changeCategoryPending: false,
  changeCategoryCategoryValue: '변경할 카테고리 선택',
  changeCategoryInputValue: '',

  deleteCategoryPending: false,
  deleteCategoryCategoryValue: '삭제할 카테고리 선택',
  deleteCategoryInputValue: ''
}

// 액션 상태
export default handleActions(
  {
    // 카테고리 가져오기 대기 중...
    [GET_BRING_CATEGORYS_PENDING]: state =>
      produce(state, (draft: CategoryState) => {
        draft.categoryPending = true
        draft.categoryError = false
      }),
    // 카테고리 가져오기 성공
    [GET_BRING_CATEGORYS_SUCCESS]: (state, action: Action<CategoryPayload>) =>
      produce(state, (draft: CategoryState) => {
        draft.categoryPending = false
        draft.categoryError = false
        draft.categoryCategory = action.payload.data.category
      }),
    // 카테고리 가져오기 실패
    [GET_BRING_CATEGORYS_FAILURE]: state =>
      produce(state, (draft: CategoryState) => {
        draft.categoryPending = false
        draft.categoryError = true
        draft.categoryCategory = [{ posts: [''], _id: '', category: '', __v: 0 }]
      }),

    // 추가할 카테고리 인풋값 변경
    [POST_ADD_CATEGORY_INPUT_CHANGE]: (state, action: Action<CategoryInputPayload>) =>
      produce(state, (draft: CategoryState) => {
        draft.addCategoryInputValue = action.payload
      }),
    // 카테고리 추가 작업 시작
    [POST_ADD_CATEGORY_PENDING]: state =>
      produce(state, (draft: CategoryState) => {
        draft.addCategoryPending = true
      }),
    // 카테고리 추가 성공
    [POST_ADD_CATEGORY_SUCCESS]: state =>
      produce(state, (draft: CategoryState) => {
        draft.addCategoryPending = false
      }),
    // 카테고리 추가 실패
    [POST_ADD_CATEGORY_FAILURE]: state =>
      produce(state, (draft: CategoryState) => {
        draft.addCategoryPending = false
      }),

    // 변경할 카테고리 인풋값 변경
    [PATCH_CHANGE_CATEGORY_INPUT_CHANGE]: (state, action: Action<CategoryInputPayload>) =>
      produce(state, (draft: CategoryState) => {
        draft.changeCategoryInputValue = action.payload
      }),
    // 변경할 카테고리 셀렉트값 변경
    [PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE]: (state, action: Action<CategoryInputPayload>) =>
      produce(state, (draft: CategoryState) => {
        draft.changeCategoryCategoryValue = action.payload
      }),
    // 특정 카테고리 변경 작업 시작
    [PATCH_CHANGE_CATEGORY_PENDING]: state =>
      produce(state, (draft: CategoryState) => {
        draft.changeCategoryPending = true
      }),
    // 특정 카테고리 변경 성공
    [PATCH_CHANGE_CATEGORY_SUCCESS]: state =>
      produce(state, (draft: CategoryState) => {
        draft.changeCategoryPending = false
      }),
    // 특정 카테고리 변경 실패
    [PATCH_CHANGE_CATEGORY_FAILURE]: state =>
      produce(state, (draft: CategoryState) => {
        draft.changeCategoryPending = false
      }),

    // 삭제할 카테고리 인풋값 변경
    [DELETE_DELETE_CATEGORY_INPUT_CHANGE]: (state, action: Action<CategoryInputPayload>) =>
      produce(state, (draft: CategoryState) => {
        draft.deleteCategoryInputValue = action.payload
      }),
    // 삭제할 카테고리 셀렉트값 변경
    [DELETE_DELETE_CATEGORY_CATEGORY_CHANGE]: (state, action: Action<CategoryInputPayload>) =>
      produce(state, (draft: CategoryState) => {
        draft.deleteCategoryCategoryValue = action.payload
      }),
    // 특정 카테고리 삭제 시작
    [DELETE_DELETE_CATEGORY_PENDING]: state =>
      produce(state, (draft: CategoryState) => {
        draft.deleteCategoryPending = true
      }),
    // 특정 카테고리 삭제 성공
    [DELETE_DELETE_CATEGORY_SUCCESS]: state =>
      produce(state, (draft: CategoryState) => {
        draft.deleteCategoryPending = false
      }),
    // 특정 카테고리 삭제 실패
    [DELETE_DELETE_CATEGORY_FAILURE]: state =>
      produce(state, (draft: CategoryState) => {
        draft.deleteCategoryPending = false
      }),

    // 카테고리 추가, 변경, 삭제 작업이 완료되었을 때
    [CATEGORY_DONE]: state =>
      produce(state, (draft: CategoryState) => {
        draft.addCategoryInputValue = ''
        draft.changeCategoryInputValue = ''
        draft.deleteCategoryInputValue = ''
        draft.changeCategoryCategoryValue = '변경할 카테고리 선택'
        draft.deleteCategoryCategoryValue = '삭제할 카테고리 선택'
      })
  },
  initialState
)
