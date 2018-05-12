import { handleActions, Action, createAction } from 'redux-actions'
import produce from 'immer'
import axios from 'axios'

// Bring Category & SubTitle of Posts
function getALLPostsAPI() {
  return axios.get('/api/categories/posts')
}

function getCategoriesPostsAPI(category: string) {
  return axios.get(`/api/${category}/posts`)
}

// Bring Category & SubTitle of Posts
function getPostAPI() {
  return axios.get('/api/:category/:post')
}

// API of Adding Post
function postPostAddAPI(newCategory: string) {
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
function patchPostChangeAPI(oldCategory: string, newCategory: string) {
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
function deletePostDeleteAPI(Category: string) {
  return axios.delete(`/api/${Category}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
    }
  })
}

// Bring Category & SubTitle of Posts
const GET_BRING_POSTS_INFO_ALL = 'GET_BRING_POSTS_ALL_INFO'
const GET_BRING_POSTS_INFO_ALL_PENDING = 'GET_BRING_POSTS_INFO_ALL_PENDING'
const GET_BRING_POSTS_INFO_ALL_SUCCESS = 'GET_BRING_POSTS_INFO_ALL_SUCCESS'
const GET_BRING_POSTS_INFO_ALL_FAILURE = 'GET_BRING_POSTS_INFO_ALL_FAILURE'
// Bring All info of Post
const GET_BRING_POST_ALL_INFO = 'GET_BRING_POST_ALL'
const GET_BRING_POST_ALL_INFO_PENDING = 'GET_BRING_POST_ALL_PENDING'
const GET_BRING_POST_ALL_INFO_SUCCESS = 'GET_BRING_POST_ALL_SUCCESS'
const GET_BRING_POST_ALL_INFO_FAILURE = 'GET_BRING_POST_ALL_FAILURE'
// Adding Post
const POST_ADD_POST_CATEGORY_CHANGE = 'POST_ADD_POST_CATEGORY_CHANGE'
const POST_ADD_POST_TITLE_CHANGE = 'POST_ADD_POST_TITLE_CHANGE'
const POST_ADD_POST_SUB_TITLE_CHANGE = 'POST_ADD_POST_SUB_TITLE_CHANGE'
const POST_ADD_POST_CONTENT_CHANGE = 'POST_ADD_POST_CONTENT_CHANGE'
const POST_ADD_POST = 'POST_ADD_POST'
const POST_ADD_POST_PENDING = 'POST_ADD_POST_PENDING'
const POST_ADD_POST_SUCCESS = 'POST_ADD_POST_SUCCESS'
const POST_ADD_POST_FAILURE = 'POST_ADD_POST_FAILURE'
// 카테고리 변경
const PATCH_CHANGE_POST_INPUT_CHANGE = 'PATCH_CHANGE_POST_INPUT_CHANGE'
const PATCH_CHANGE_POST_SELECT_CHANGE = 'PATCH_CHANGE_POST_SELECT_CHANGE'
const PATCH_CHANGE_POST = 'PATCH_CHANGE_POST'
const PATCH_CHANGE_POST_PENDING = 'PATCH_CHANGE_POST_PENDING'
const PATCH_CHANGE_POST_SUCCESS = 'PATCH_CHANGE_POST_SUCCESS'
const PATCH_CHANGE_POST_FAILURE = 'PATCH_CHANGE_POST_FAILURE'
// 카테고리 삭제
const DELETE_DELETE_POST_INPUT_CHANGE = 'DELETE_DELETE_POST_INPUT_CHANGE'
const DELETE_DELETE_POST_SELECT_CHANGE = 'DELETE_DELETE_POST-SELECT_CHANGE'
const DELETE_DELETE_POST = 'DELETE_DELETE_POST'
const DELETE_DELETE_POST_PENDING = 'DELETE_DELETE_POST_PENDING'
const DELETE_DELETE_POST_SUCCESS = 'DELETE_DELETE_POST_SUCCESS'
const DELETE_DELETE_POST_FAILURE = 'DELETE_DELETE_POST_FAILURE'

type PostPayload = any
export const PostActions = {
  getALLPosts: createAction(GET_BRING_POSTS_INFO, getALLPostsAPI),

  getCategoriesPosts: createAction(GET_BRING_POST_)

  getPost: createAction(GET_BRING_POST_ALL_INFO, getPostAPI),

  // Method of Adding Post
  addPostTitleChange: createAction(POST_ADD_POST_TITLE_CHANGE),
  addPostCategoryChange: createAction(POST_ADD_POST_CATEGORY_CHANGE),
  addPostSubTitleChange: createAction(POST_ADD_POST_SUB_TITLE_CHANGE),
  addPostContentChange: createAction(POST_ADD_POST_CONTENT_CHANGE)
}
// 카테고리 들어있는 부분의 State 정의
export interface CategoryStateInside {
  posts: [string]
  _id: string
}
// 카테고리 기본 State 타입 정의
export interface PostState {
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
const initialState: PostState = {
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
