import { handleActions, Action, createAction } from 'redux-actions'
import produce from 'immer'
import axios from 'axios'

// bring all category api
function getCategorysAPI() {
  return axios.get('/api/categories')
}

// add category api
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

// change category api
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

// delete category api
function deleteCategoryDeleteAPI(Category: string, doubleCheck: string) {
  return axios.delete(`/api/${Category}?doubleCheck=${doubleCheck}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
    }
  })
}

// bring category
const GET_BRING_CATEGORYS = 'GET_BRING_CATEGORYS'
const GET_BRING_CATEGORYS_PENDING = 'GET_BRING_CATEGORYS_PENDING'
const GET_BRING_CATEGORYS_SUCCESS = 'GET_BRING_CATEGORYS_SUCCESS'
const GET_BRING_CATEGORYS_FAILURE = 'GET_BRING_CATEGORYS_FAILURE'
// add category
const POST_ADD_CATEGORY_INPUT_CHANGE = 'POST_ADD_CATEGORY_INPUT_CHANGE'
const POST_ADD_CATEGORY = 'POST_ADD_CATEGORY'
const POST_ADD_CATEGORY_PENDING = 'POST_ADD_CATEGORY_PENDING'
const POST_ADD_CATEGORY_SUCCESS = 'POST_ADD_CATEGORY_SUCCESS'
const POST_ADD_CATEGORY_FAILURE = 'POST_ADD_CATEGORY_FAILURE'
// change category
const PATCH_CHANGE_CATEGORY_INPUT_CHANGE = 'PATCH_CHANGE_CATEGORY_INPUT_CHANGE'
const PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE = 'PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE'
const PATCH_CHANGE_CATEGORY = 'PATCH_CHANGE_CATEGORY'
const PATCH_CHANGE_CATEGORY_PENDING = 'PATCH_CHANGE_CATEGORY_PENDING'
const PATCH_CHANGE_CATEGORY_SUCCESS = 'PATCH_CHANGE_CATEGORY_SUCCESS'
const PATCH_CHANGE_CATEGORY_FAILURE = 'PATCH_CHANGE_CATEGORY_FAILURE'
// delete category
const DELETE_DELETE_CATEGORY_INPUT_CHANGE = 'DELETE_DELETE_CATEGORY_INPUT_CHANGE'
const DELETE_DELETE_CATEGORY_CATEGORY_CHANGE = 'DELETE_DELETE_CATEGORY-CATEGORY_CHANGE'
const DELETE_DELETE_CATEGORY = 'DELETE_DELETE_CATEGORY'
const DELETE_DELETE_CATEGORY_PENDING = 'DELETE_DELETE_CATEGORY_PENDING'
const DELETE_DELETE_CATEGORY_SUCCESS = 'DELETE_DELETE_CATEGORY_SUCCESS'
const DELETE_DELETE_CATEGORY_FAILURE = 'DELETE_DELETE_CATEGORY_FAILURE'
// return to basic => all state is return to basic state
const CATEGORY_DONE = 'CATEGORY_DONE'

// export Category.actions
export const CategoryActions = {
  // category loading api
  getCategory: createAction(GET_BRING_CATEGORYS, getCategorysAPI),

  // category Add
  // <payload, parameter>                                                 // parameter,             payload
  addCategoryInputChange: createAction<string, string>(POST_ADD_CATEGORY_INPUT_CHANGE, text => text),
  addCategory: createAction<any, string>(POST_ADD_CATEGORY, postCategoryAddAPI),
  // category Add

  // category Change
  changeCategoryInputChange: createAction<string, string>(PATCH_CHANGE_CATEGORY_INPUT_CHANGE, text => text),
  changeCategoryCategoryChange: createAction<string, string>(PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE, value => value),
  changeCategory: createAction<any, string, string>(PATCH_CHANGE_CATEGORY, patchCategoryChangeAPI),
  // category Change

  // category Delete
  deleteCategoryInputChange: createAction<string, string>(DELETE_DELETE_CATEGORY_INPUT_CHANGE, text => text),
  deleteCategoryCategoryChange: createAction<string, string>(DELETE_DELETE_CATEGORY_CATEGORY_CHANGE, value => value),
  deleteCategory: createAction<any, string, string>(DELETE_DELETE_CATEGORY, deleteCategoryDeleteAPI),
  // category Delete

  // EveryThing is Gone
  categoryDone: createAction(CATEGORY_DONE)
}
export interface PostsStateInside {
  date: Date
  title: string
  subTitle: string
  category: { category: string }
}
// Category in Category State
export interface CategoryStateInside {
  posts: PostsStateInside[]
  _id: string
  category: string
  __v: number
}
// Category State
export interface CategoryState {
  categoryLoaded: boolean
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
  categoryLoaded: false,
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

/*
  in typescript 2.8.1
  ReturnType is 
*/
// acton: Action<CategoryPayload> to action: AddInputPayloadAction
type AddInputPayloadAction = ReturnType<typeof CategoryActions.addCategoryInputChange>
// acton: Action<CategoryPayload> to action: ChangeInputPayloadAction
type ChangeInputPayloadAction = ReturnType<typeof CategoryActions.changeCategoryInputChange>
type ChangeCategoryCategoryPayloadAction = ReturnType<typeof CategoryActions.changeCategoryCategoryChange>
// acton: Action<CategoryPayload> to action: DeleteInputPayloadAction
type DeleteInputPayloadAction = ReturnType<typeof CategoryActions.deleteCategoryInputChange>
type DeleteCategoryCategoryPayloadAction = ReturnType<typeof CategoryActions.deleteCategoryCategoryChange>

// reducer
const reducer = handleActions<CategoryState, any>(
  {
    // get category pending
    [GET_BRING_CATEGORYS_PENDING]: state =>
      produce(state, draft => {
        draft.categoryLoaded = false
        draft.categoryPending = true
        draft.categoryError = false
      }),
    // get category success
    [GET_BRING_CATEGORYS_SUCCESS]: (state, action: Action<any>) =>
      produce(state, draft => {
        draft.categoryLoaded = true
        draft.categoryPending = false
        draft.categoryError = false
        draft.categoryCategory = action.payload.data.value
      }),
    // get category failure
    [GET_BRING_CATEGORYS_FAILURE]: state =>
      produce(state, draft => {
        draft.categoryLoaded = true
        draft.categoryPending = false
        draft.categoryError = true
        draft.categoryCategory = [{ posts: [], _id: '', category: '', __v: 0 }]
      }),

    // change add category input
    [POST_ADD_CATEGORY_INPUT_CHANGE]: (state, action: AddInputPayloadAction) =>
      produce(state, draft => {
        draft.addCategoryInputValue = action.payload
      }),
    // add category pending
    [POST_ADD_CATEGORY_PENDING]: state =>
      produce(state, draft => {
        draft.addCategoryPending = true
      }),
    // add category success
    [POST_ADD_CATEGORY_SUCCESS]: state =>
      produce(state, draft => {
        draft.addCategoryPending = false
      }),
    // add category failure
    [POST_ADD_CATEGORY_FAILURE]: state =>
      produce(state, draft => {
        draft.addCategoryPending = false
      }),

    // change change category input
    [PATCH_CHANGE_CATEGORY_INPUT_CHANGE]: (state, action: ChangeInputPayloadAction) =>
      produce(state, draft => {
        draft.changeCategoryInputValue = action.payload
      }),
    // change change category select
    [PATCH_CHANGE_CATEGORY_CATEGORY_CHANGE]: (state, action: ChangeCategoryCategoryPayloadAction) =>
      produce(state, draft => {
        draft.changeCategoryCategoryValue = action.payload
      }),
    // change category pending
    [PATCH_CHANGE_CATEGORY_PENDING]: state =>
      produce(state, draft => {
        draft.changeCategoryPending = true
      }),
    // chagne category success
    [PATCH_CHANGE_CATEGORY_SUCCESS]: state =>
      produce(state, draft => {
        draft.changeCategoryPending = false
      }),
    // change category failure
    [PATCH_CHANGE_CATEGORY_FAILURE]: state =>
      produce(state, draft => {
        draft.changeCategoryPending = false
      }),

    // change delete category input
    [DELETE_DELETE_CATEGORY_INPUT_CHANGE]: (state, action: DeleteInputPayloadAction) =>
      produce(state, draft => {
        draft.deleteCategoryInputValue = action.payload
      }),
    // change delete category select
    [DELETE_DELETE_CATEGORY_CATEGORY_CHANGE]: (state, action: DeleteCategoryCategoryPayloadAction) =>
      produce(state, draft => {
        draft.deleteCategoryCategoryValue = action.payload
      }),
    // delete categoru pending
    [DELETE_DELETE_CATEGORY_PENDING]: state =>
      produce(state, draft => {
        draft.deleteCategoryPending = true
      }),
    // delete category success
    [DELETE_DELETE_CATEGORY_SUCCESS]: state =>
      produce(state, draft => {
        draft.deleteCategoryPending = false
      }),
    // delete category failure
    [DELETE_DELETE_CATEGORY_FAILURE]: state =>
      produce(state, draft => {
        draft.deleteCategoryPending = false
      }),

    // return to basic state
    [CATEGORY_DONE]: state =>
      produce(state, draft => {
        draft.addCategoryInputValue = ''
        draft.changeCategoryInputValue = ''
        draft.deleteCategoryInputValue = ''
        draft.changeCategoryCategoryValue = '변경할 카테고리 선택'
        draft.deleteCategoryCategoryValue = '삭제할 카테고리 선택'
      })
  },
  initialState
)

export default reducer
