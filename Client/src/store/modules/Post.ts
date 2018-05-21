import { handleActions, Action, createAction } from 'redux-actions'
import produce from 'immer'
import axios from 'axios'

// Bring Category & SubTitle of Posts & type
// Type is the mark that can Recognize the api caller
function getPostAPI(type: number) {
  return axios.get(`/api/:category/:post?type=${type}`)
}

// interface of postPostAPI fun's parameter
export interface PostAddAPIInterface {
  category: string
  post: string
  subTitle: string
  mainText: string
}
// API of Adding Post
function postPostAddAPI(value: PostAddAPIInterface) {
  return axios.post(
    `/api/${value.category}/${value.post}`,
    {
      subTitle: value.subTitle,
      mainText: value.mainText
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token')
      }
    }
  )
}

// interface of putPostAPI fun's parameter
export interface PutChangeAPIInterface {
  oldCategory: string
  newCategory: string
  oldTitle: string
  newTitle: string
  subTitle: string
  mainText: string
}
// API of Changing Post
function putPostChangeAPI(value: PutChangeAPIInterface) {
  return axios.put(
    `/api/${value.oldCategory}/${value.oldTitle}`,
    {
      changeCategory: value.newCategory,
      changeTitle: value.newTitle,
      subTitle: value.subTitle,
      mainText: value.mainText
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token')
      }
    }
  )
}

// interface of deltePostAPI fun's parameter
export interface DeleteDeleteAPIInterface {
  category: string
  title: string
}
// API of Deleting Post
function deletePostDeleteAPI(category: string, title: string) {
  return axios.delete(`/api/${category}/${title}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
    }
  })
}

// Bring All info of Post
const GET_BRING_POST_INFO = 'GET_BRING_POST_ALL'
const GET_BRING_POST_INFO_PENDING = 'GET_BRING_POST_ALL_PENDING'
const GET_BRING_POST_INFO_SUCCESS = 'GET_BRING_POST_ALL_SUCCESS'
const GET_BRING_POST_INFO_FAILURE = 'GET_BRING_POST_ALL_FAILURE'
// Adding Post
const POST_ADD_POST_CATEGORY_CHANGE = 'POST_ADD_POST_CATEGORY_CHANGE'
const POST_ADD_POST_TITLE_CHANGE = 'POST_ADD_POST_TITLE_CHANGE'
const POST_ADD_POST_SUBTITLE_CHANGE = 'POST_ADD_POST_SUB_TITLE_CHANGE'
const POST_ADD_POST_MAINTEXT_CHANGE = 'POST_ADD_POST_MAINTEXT_CHANGE'
// api
const POST_ADD_POST = 'POST_ADD_POST'
const POST_ADD_POST_PENDING = 'POST_ADD_POST_PENDING'
const POST_ADD_POST_SUCCESS = 'POST_ADD_POST_SUCCESS'
const POST_ADD_POST_FAILURE = 'POST_ADD_POST_FAILURE'
// Changing Post
// dropdown of change Post
const PUT_CHANGE_CATEGORY_SELECT_CHANGE = 'PUT_CHANGE_CATEGORY_SELECT_CHANGE'
const PUT_CHANGE_POST_SELECT_CHANGE = 'PUT_CHANGE_POST_SELECT_CHANGE'
// real change part
const PUT_CHANGE_POST_CATEGORY_CHANGE = 'POST_ADD_POST_CATEGORY_CHANGE'
const PUT_CHANGE_POST_TITLE_CHANGE = 'POST_ADD_POST_TITLE_CHANGE'
const PUT_CHANGE_POST_SUBTITLE_CHANGE = 'POST_ADD_POST_SUB_TITLE_CHANGE'
const PUT_CHANGE_POST_MAINTEXT_CHANGE = 'POST_ADD_POST_MAINTEXT_CHANGE'
// api
const PUT_CHANGE_POST = 'PUT_CHANGE_POST'
const PUT_CHANGE_POST_PENDING = 'PUT_CHANGE_POST_PENDING'
const PUT_CHANGE_POST_SUCCESS = 'PUT_CHANGE_POST_SUCCESS'
const PUT_CHANGE_POST_FAILURE = 'PUT_CHANGE_POST_FAILURE'
// Deleting Post
// dropdonw of delete Post
const DELETE_CHANGE_CATEGORY_SELECT_CHANGE = 'DELETE_CHANGE_CATEGORY_SELECT_CHANGE'
const DELETE_CHANGE_POST_SELECT_CHANGE = 'DELETE_CHANGE_POST_SELECT_CHANGE'
// api
const DELETE_DELETE_POST = 'DELETE_DELETE_POST'
const DELETE_DELETE_POST_PENDING = 'DELETE_DELETE_POST_PENDING'
const DELETE_DELETE_POST_SUCCESS = 'DELETE_DELETE_POST_SUCCESS'
const DELETE_DELETE_POST_FAILURE = 'DELETE_DELETE_POST_FAILURE'

const POST_DONE = 'POST_DONE'

type APIPayload = any
export const PostActions = {
  // get Specific post's information
  getPost: createAction(GET_BRING_POST_INFO, getPostAPI),

  // Method of Adding Post
  addPostCategorySelectChange: createAction<string, string>(POST_ADD_POST_CATEGORY_CHANGE, value => value),
  addPostTitleChange: createAction<string, string>(POST_ADD_POST_TITLE_CHANGE, value => value),
  addPostSubTitleChange: createAction<string, string>(POST_ADD_POST_SUBTITLE_CHANGE, value => value),
  addPostMainTextChange: createAction<string, string>(POST_ADD_POST_MAINTEXT_CHANGE, value => value),
  addPostPost: createAction<any, PostAddAPIInterface>(POST_ADD_POST, postPostAddAPI),

  // Method of Changing Post
  changePutCategorySelectChange: createAction<string, string>(PUT_CHANGE_CATEGORY_SELECT_CHANGE, value => value),
  changePutPostSelectChange: createAction<string, string>(PUT_CHANGE_POST_SELECT_CHANGE, value => value),
  changePutPostCategoryChange: createAction<string, string>(PUT_CHANGE_POST_CATEGORY_CHANGE, value => value),
  changePutPostTitleChange: createAction<string, string>(PUT_CHANGE_POST_TITLE_CHANGE, value => value),
  changePutPostSubTitleChange: createAction<string, string>(PUT_CHANGE_POST_SUBTITLE_CHANGE, value => value),
  changePutPostMainTextChange: createAction<string, string>(PUT_CHANGE_POST_MAINTEXT_CHANGE, value => value),
  changePutPost: createAction<any, PutChangeAPIInterface>(PUT_CHANGE_POST, putPostChangeAPI),

  // Method of Deleting Post
  deletePostCategorySelectChange: createAction<string, string>(DELETE_CHANGE_CATEGORY_SELECT_CHANGE, value => value),
  deletePostPostSelectChange: createAction<string, string>(DELETE_CHANGE_POST_SELECT_CHANGE, value => value),
  deleteDeletePost: createAction<any, string, string>(DELETE_DELETE_POST, deletePostDeleteAPI),

  // Everything is Gone
  postDone: createAction<any, any>(POST_DONE, value => value)
}

// state of handle loading
export interface LoadPostState {
  pending?: boolean
  error?: boolean
}
// state of show Post
export interface ShowPostState {
  pending: boolean
  error: boolean
  category?: string
  title?: string
  subTitle?: string
  mainText?: string
  date?: number
}
// state of add Post
export interface AddPostState {
  pending: boolean
  error: boolean
  category?: string
  title?: string
  subTitle?: string
  mainText?: string
  date?: number
}
// state of change Post
export interface ChangePostState {
  pending: boolean
  error: boolean
  category?: string
  title?: string
  subTitle?: string
  mainText?: string
  date?: number
}
// Post basic state
export interface PostState {
  load: LoadPostState
  show: ShowPostState
  add: AddPostState
  change: ChangePostState
}
const initialState: PostState = {
  load: { pending: false, error: false },
  show: { pending: false, error: false },
  add: { pending: false, error: false },
  change: { pending: false, error: false }
}

// return Types
// add
type AddPostCategoryPayload = ReturnType<typeof PostActions.addPostCategoryChange>
type AddPostTitleInputPayload = ReturnType<typeof PostActions.addPostTitleChange>
type AddPostSubTitleInputPayload = ReturnType<typeof PostActions.addPostTitleChange>
type AddPostMainTextInputPayload = ReturnType<typeof PostActions.addPostMainTextChange>
// change
type ChangePostCategorySelectPayload = ReturnType<typeof PostActions.changePostCategorySelectChange>
type ChangePostCategoryPayload = ReturnType<typeof PostActions.changePostCategoryChange>
const reducer = handleActions<PostState, any>(
  {
    // call certain post's all Information
    [GET_BRING_POST_INFO_PENDING]: state =>
      produce(state, draft => {
        draft.load.pending = true
        draft.load.error = false
      }),
    [GET_BRING_POST_INFO_SUCCESS]: (state, action: Action<APIPayload>) => {
      if (action.payload.data.value.type === 0) {
        // call info for show Post
        return produce(state, draft => {
          draft.load.pending = false
          draft.load.error = false
          // post show data
          draft.show.category = action.payload.data.value.category
          draft.show.title = action.payload.data.value.posts[0].title
          draft.show.subTitle = action.payload.data.value.posts[0].subTitle
          draft.show.mainText = action.payload.data.value.posts[0].mainText
          draft.show.date = action.payload.data.value.posts[0].date
        })
      } else if (action.payload.data.value.type === 1) {
        // call info for change Post
        return produce(state, draft => {
          draft.load.pending = false
          draft.load.error = false
          // post change data
          draft.change.category = action.payload.data.value.category
          draft.change.title = action.payload.data.value.posts[0].title
          draft.change.subTitle = action.payload.data.value.posts[0].subTitle
          draft.change.mainText = action.payload.data.value.posts[0].mainText
          draft.change.date = action.payload.data.value.posts[0].date
        })
      }
      return produce(state, draft => {
        // no! there is no way to run this part, because
        draft.load.pending = false
        draft.load.error = false
      })
    },
    [GET_BRING_POST_INFO_FAILURE]: state =>
      produce(state, draft => {
        draft.load.pending = false
        draft.load.error = true
      }),

    // Post Add Action
    [POST_ADD_POST_CATEGORY_CHANGE]: (state, action: AddPostCategoryPayload) =>
      produce(state, draft => {
        draft.add.category = action.payload
      }),
    [POST_ADD_POST_TITLE_CHANGE]: (state, action: AddPostTitleInputPayload) =>
      produce(state, draft => {
        draft.add.category = action.payload
      }),
    [POST_ADD_POST_SUBTITLE_CHANGE]: (state, action: AddPostSubTitleInputPayload) =>
      produce(state, draft => {
        draft.add.category = action.payload
      }),
    [POST_ADD_POST_MAINTEXT_CHANGE]: (state, action: AddPostMainTextInputPayload) =>
      produce(state, draft => {
        draft.add.category = action.payload
      }),
    // post add api action
    [POST_ADD_POST_PENDING]: (state, action) =>
      produce(state, draft => {
        draft.add.pending = true
        draft.add.error = false
      }),
    [POST_ADD_POST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.add.pending = false
        draft.add.error = false
      }),
    [POST_ADD_POST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.add.pending = false
        draft.add.error = true
      }),

    [PUT_CHANGE_CATEGORY_SELECT_CHANGE]: (state, action: ChangePostCategorySelectPayload) =>
      produce(state, draft => {
        draft.change.category = action.payload
      }),
    [PUT_CHANGE_POST_CATEGORY_CHANGE]: (state, action: ChangePostCategoryPayload) =>
      produce(state, draft => {
        draft.change.category = action.payload
      }),
    [PUT_CHANGE_POST_SELECT_CHANGE]: (state, action: ChangePostPostSelectPayload) =>
      produce(state, draft => {
        draft.change.title = action.payload
      }),
    [PUT_CHANGE_POST_TITLE_CHANGE]: (state, action: ChangePostTitleSelectPayload) =>
      produce(state, draft => {
        draft.change.title = action.payload
      }),
    // post change event handler
    [PUT_CHANGE_POST_PENDING]: state =>
      produce(state, draft => {
        draft.change.pending = true
        draft.change.error = false
      }),
    [PUT_CHANGE_POST_SUCCESS]: state =>
      produce(state, draft => {
        draft.change.pending = false
        draft.change.error = false
      }),
    [PUT_CHANGE_POST_FAILURE]: state =>
      produce(state, draft => {
        draft.change.pending = false
        draft.change.error = true
      }),

    // when the task is done, this is will be excute
    [POST_DONE]: state =>
      produce(state, draft => {
        draft.show.category = ''
        draft.show.title = ''
        draft.show.subTitle = ''
        draft.show.mainText = ''
        draft.show.date = Date.now()
      })
  },
  initialState
)

export default reducer
