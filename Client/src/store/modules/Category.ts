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
function deleteCategoryDeleteAPI(Category: string, doubleCheck: string) {
  return axios.delete(`/api/${Category}?doubleCheck=${doubleCheck}`, {
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
// 이제 페이로드 값에 대한 것들을 정의할 수 있게 되었다
type CategoryPayload = any
type CategoryInputPayload = string

// 카테고리 가져오는 액션 방출
export const CategoryActions = {
  // 카테고리 로딩하는 API
  getCategory: createAction(GET_BRING_CATEGORYS, getCategorysAPI),

  // category Add
  // <payload, parameter>
  addCategoryInputChange: createAction<CategoryInputPayload, CategoryInputPayload>(
    POST_ADD_CATEGORY_INPUT_CHANGE,
    // parameter,             payload
    (text: string): string => text
  ),
  addCategory: createAction(POST_ADD_CATEGORY, postCategoryAddAPI),
  // category Add

  // category Change
  changeCategoryInputChange: createAction<CategoryInputPayload, CategoryInputPayload>(
    PATCH_CHANGE_CATEGORY_INPUT_CHANGE,
    (text: string): string => text
  ),
  changeCategoryCategoryChange: createAction<CategoryInputPayload, CategoryInputPayload>(
    PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE,
    (value: string): string => value
  ),
  changeCategory: createAction(PATCH_CHANGE_CATEGORY, patchCategoryChangeAPI),
  // category Change

  // category Delete
  deleteCategoryInputChange: createAction<CategoryInputPayload, CategoryInputPayload>(
    DELETE_DELETE_CATEGORY_INPUT_CHANGE,
    (text: string): string => text
  ),
  deleteCategoryCategoryChange: createAction<CategoryInputPayload, CategoryInputPayload>(
    DELETE_DELETE_CATEGORY_CATEGORY_CHANGE,
    (value: string): string => value
  ),
  deleteCategory: createAction(DELETE_DELETE_CATEGORY, deleteCategoryDeleteAPI),
  // category Delete

  // EveryThing is Gone
  categoryDone: createAction(CATEGORY_DONE)
}
// Category in Category State
export interface CategoryStateInside {
  posts: object[]
  _id: string
  category: string
  __v: number
}
// Category State
export interface CategoryState {
  categoryPending: boolean
  categoryError: boolean
  categoryCategory: CategoryStateInside[]

  addCategoryPending: boolean
  addCategoryInputValue?: string

  changeCategoryPending: boolean
  changeCategoryCategoryValue?: string
  changeCategoryInputValue?: string

  deleteCategoryPending: boolean
  deleteCategoryCategoryValue?: string
  deleteCategoryInputValue?: string
}
// origin state
const initialState: CategoryState = {
  categoryPending: false,
  categoryError: false,
  categoryCategory: [],

  addCategoryPending: false,
  addCategoryInputValue: '',

  changeCategoryPending: false,
  changeCategoryCategoryValue: '변경할 카테고리 선택',
  changeCategoryInputValue: '',

  deleteCategoryPending: false,
  deleteCategoryCategoryValue: '삭제할 카테고리 선택',
  deleteCategoryInputValue: ''
}

// Action: <CategoryPayload> 값을 직접 정해주다가 함수의 리턴타입으로 정의해서 action에 넣어준다
type AddCategoryInputPayloadAction = ReturnType<typeof CategoryActions.addCategoryInputChange>

type ChangeCategoryInputPayloadAction = ReturnType<typeof CategoryActions.changeCategoryInputChange>
type ChangeCategoryCategoryPayloadAction = ReturnType<typeof CategoryActions.changeCategoryCategoryChange>

type DeleteCategoryInputPayloadAction = ReturnType<typeof CategoryActions.deleteCategoryInputChange>
type DeleteCategoryCategoryPayloadAction = ReturnType<typeof CategoryActions.deleteCategoryCategoryChange>

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
        draft.categoryCategory = action.payload.data.value
      }),
    // 카테고리 가져오기 실패
    [GET_BRING_CATEGORYS_FAILURE]: state =>
      produce(state, (draft: CategoryState) => {
        draft.categoryPending = false
        draft.categoryError = true
        draft.categoryCategory = [{ posts: [{}], _id: '', category: '', __v: 0 }]
      }),

    // 추가할 카테고리 인풋값 변경
    [POST_ADD_CATEGORY_INPUT_CHANGE]: (state, action: AddCategoryInputPayloadAction) =>
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
    [PATCH_CHANGE_CATEGORY_INPUT_CHANGE]: (state, action: ChangeCategoryInputPayloadAction) =>
      produce(state, (draft: CategoryState) => {
        draft.changeCategoryInputValue = action.payload
      }),
    // 변경할 카테고리 셀렉트값 변경
    [PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE]: (state, action: ChangeCategoryCategoryPayloadAction) =>
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
    [DELETE_DELETE_CATEGORY_INPUT_CHANGE]: (state, action: DeleteCategoryInputPayloadAction) =>
      produce(state, (draft: CategoryState) => {
        draft.deleteCategoryInputValue = action.payload
      }),
    // 삭제할 카테고리 셀렉트값 변경
    [DELETE_DELETE_CATEGORY_CATEGORY_CHANGE]: (state, action: DeleteCategoryCategoryPayloadAction) =>
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