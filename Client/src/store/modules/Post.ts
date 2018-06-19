import { handleActions, Action, createAction } from 'redux-actions'
import produce from 'immer'
import axios from 'axios'

// Bring Category & SubTitle of Posts & type
// Type is the mark that can Recognize the api caller
export interface GetPostBringAPIInterface {
  category?: string
  title?: string
  type?: number
}
function getPostAPI(value: GetPostBringAPIInterface) {
  return axios.get(`/api/${value.category}/${value.title}?type=${value.type}`)
}

// interface of postPostAPI fun's parameter
export interface PostAddAPIInterface {
  category?: string
  title?: string
  subTitle?: string
  mainText?: string
}
// API of Adding Post
function postPostAddAPI(value: PostAddAPIInterface) {
  return axios.post(
    `/api/${value.category}/${value.title}`,
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
  oldCategory?: string
  newCategory?: string
  oldTitle?: string
  newTitle?: string
  newSubTitle?: string
  newMainText?: string
}
// API of Changing Post
function putPostChangeAPI(value: PutChangeAPIInterface) {
  return axios.put(
    `/api/${value.oldCategory}/${value.oldTitle}`,
    {
      changeCategory: value.newCategory,
      changeTitle: value.newTitle,
      changeSubTitle: value.newSubTitle,
      changeMainText: value.newMainText
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
  category?: string
  title?: string
}
// API of Deleting Post
function deletePostDeleteAPI(value: DeleteDeleteAPIInterface) {
  return axios.delete(`/api/${value.category}/${value.title}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
    }
  })
}

// Bring All info of Post
const GET_BRING_POST_INFO = 'GET_BRING_POST_INFO'
const GET_BRING_POST_INFO_PENDING = 'GET_BRING_POST_INFO_PENDING'
const GET_BRING_POST_INFO_SUCCESS = 'GET_BRING_POST_INFO_SUCCESS'
const GET_BRING_POST_INFO_FAILURE = 'GET_BRING_POST_INFO_FAILURE'
// Adding Post
const POST_ADD_POST_CATEGORY_CHANGE = 'POST_ADD_POST_CATEGORY_CHANGE'
const POST_ADD_POST_TITLE_CHANGE = 'POST_ADD_POST_TITLE_CHANGE'
const POST_ADD_POST_SUBTITLE_CHANGE = 'POST_ADD_POST_SUB_TITLE_CHANGE'
const POST_ADD_POST_MAINTEXT_CHANGE = 'POST_ADD_POST_MAINTEXT_CHANGE'
const POST_ADD_POST_ERROR_DATA_NONE = 'POST_ADD_POST_ERROR_TITLE_NONE'
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
const PUT_CHANGE_POST_CATEGORY_CHANGE = 'PUT_CHANGE_POST_CATEGORY_CHANGE'
const PUT_CHANGE_POST_TITLE_CHANGE = 'PUT_CHANGE_POST_TITLE_CHANGE'
const PUT_CHANGE_POST_SUBTITLE_CHANGE = 'PUT_CHANGE_POST_SUBTITLE_CHANGE'
const PUT_CHANGE_POST_MAINTEXT_CHANGE = 'PUT_CHANGE_POST_MAINTEXT_CHANGE'
const PUT_CHANGE_POST_ERROR_DATA_NONE = 'PUT_CHANGE_POST_ERROR_TITLE_NONE'
// api
const PUT_CHANGE_POST = 'PUT_CHANGE_POST'
const PUT_CHANGE_POST_PENDING = 'PUT_CHANGE_POST_PENDING'
const PUT_CHANGE_POST_SUCCESS = 'PUT_CHANGE_POST_SUCCESS'
const PUT_CHANGE_POST_FAILURE = 'PUT_CHANGE_POST_FAILURE'
// Deleting Post
// dropdonw of delete Post
const DELETE_DELETE_CATEGORY_SELECT_CHANGE = 'DELETE_CHANGE_CATEGORY_SELECT_CHANGE'
const DELETE_DELETE_POST_SELECT_CHANGE = 'DELETE_CHANGE_POST_SELECT_CHANGE'
// api
const DELETE_DELETE_POST = 'DELETE_DELETE_POST'
const DELETE_DELETE_POST_PENDING = 'DELETE_DELETE_POST_PENDING'
const DELETE_DELETE_POST_SUCCESS = 'DELETE_DELETE_POST_SUCCESS'
const DELETE_DELETE_POST_FAILURE = 'DELETE_DELETE_POST_FAILURE'

const POST_DONE = 'POST_DONE'

type APIPayload = any
export const PostActions = {
  // get Specific post's information
  getPost: createAction<any, GetPostBringAPIInterface>(GET_BRING_POST_INFO, getPostAPI),

  // Method of Adding Post
  addPostCategoryChange: createAction<string, string>(POST_ADD_POST_CATEGORY_CHANGE, value => value),
  addPostPostTitleChange: createAction<string, string>(POST_ADD_POST_TITLE_CHANGE, value => value),
  addPostPostSubTitleChange: createAction<string, string>(POST_ADD_POST_SUBTITLE_CHANGE, value => value),
  addPostPostMainTextChange: createAction<string, string>(POST_ADD_POST_MAINTEXT_CHANGE, value => value),
  addPostPostError: createAction<string, string>(POST_ADD_POST_ERROR_DATA_NONE, value => value),
  addPostPost: createAction<any, PostAddAPIInterface>(POST_ADD_POST, postPostAddAPI),

  // Method of Changing Post
  changePutPostCategorySelectChange: createAction<string, string>(PUT_CHANGE_CATEGORY_SELECT_CHANGE, value => value),
  changePutPostCategoryChange: createAction<string, string>(PUT_CHANGE_POST_CATEGORY_CHANGE, value => value),
  changePutPostTitleSelectChange: createAction<string, string>(PUT_CHANGE_POST_SELECT_CHANGE, value => value),
  changePutPostTitleChange: createAction<string, string>(PUT_CHANGE_POST_TITLE_CHANGE, value => value),
  changePutPostSubTitleChange: createAction<string, string>(PUT_CHANGE_POST_SUBTITLE_CHANGE, value => value),
  changePutPostMainTextChange: createAction<string, string>(PUT_CHANGE_POST_MAINTEXT_CHANGE, value => value),
  changePutPostError: createAction<string, string>(PUT_CHANGE_POST_ERROR_DATA_NONE, value => value),
  changePutPost: createAction<any, PutChangeAPIInterface>(PUT_CHANGE_POST, putPostChangeAPI),

  // Method of Deleting Post
  deleteDeleteCategorySelectChange: createAction<string, string>(DELETE_DELETE_CATEGORY_SELECT_CHANGE, value => value),
  deleteDeletePostTitleSelectChange: createAction<string, string>(DELETE_DELETE_POST_SELECT_CHANGE, value => value),
  deleteDeletePost: createAction<any, DeleteDeleteAPIInterface>(DELETE_DELETE_POST, deletePostDeleteAPI),

  // Everything is Gone
  postDone: createAction(POST_DONE)
}

// state of handle loading
export interface LoadPostState {
  pending: boolean
  error: boolean
}
// state of show Post
export interface ShowPostState {
  category: string
  title: string
  subTitle: string
  mainText: string
  date: number
}
// state of add Post
export interface AddPostState {
  pending: boolean
  error: boolean
  category: string
  title: string
  subTitle: string
  mainText: string
  date: number
  failedWithNoDataTitle: boolean
  failedWithNoDataSubTitle: boolean
  failedWithNoDataMainText: boolean
}
// state of change Post
export interface ChangePostState {
  pending: boolean
  error: boolean
  selectCategory: string
  selectTitle: string
  category: string
  title: string
  subTitle: string
  mainText: string
  date: number
  failedWithNoDataTitle: boolean
  failedWithNoDataSubTitle: boolean
  failedWithNoDataMainText: boolean
}
// state of delete Post
export interface DeletePostState {
  pending: boolean
  error: boolean
  category: string
  title: string
  showTitle: string
  subTitle: string
  mainText: string
  date: number
}
// Post basic state
export interface PostState {
  load: LoadPostState
  show: ShowPostState
  add: AddPostState
  change: ChangePostState
  delete: DeletePostState
}
const initialState: PostState = {
  load: { pending: false, error: false },
  show: { category: '', title: '', subTitle: '', mainText: '', date: 0 },
  add: {
    pending: false,
    error: false,
    category: '카테고리 선택',
    title: '',
    subTitle: '',
    mainText: '',
    date: 0,
    failedWithNoDataTitle: false,
    failedWithNoDataSubTitle: false,
    failedWithNoDataMainText: false
  },
  change: {
    pending: false,
    error: false,
    selectCategory: '카테고리 선택',
    selectTitle: '변경할 포스트 선택',
    category: '카테고리 선택',
    title: '',
    subTitle: '',
    mainText: '',
    date: 0,
    failedWithNoDataTitle: false,
    failedWithNoDataSubTitle: false,
    failedWithNoDataMainText: false
  },
  delete: {
    pending: false,
    error: false,
    category: '카테고리 선택',
    title: '삭제할 포스트 선택',
    showTitle: '',
    subTitle: '',
    mainText: '',
    date: 0
  }
}

// return Types
// add
type AddPostCategoryPayload = ReturnType<typeof PostActions.addPostCategoryChange>
type AddPostPostTitlePayload = ReturnType<typeof PostActions.addPostPostTitleChange>
type AddPostPostSubTitlePayload = ReturnType<typeof PostActions.addPostPostSubTitleChange>
type AddPostPostMainTextPayload = ReturnType<typeof PostActions.addPostPostMainTextChange>
type AddPostPostError = ReturnType<typeof PostActions.addPostPostError>
// change
// select category, post
type ChangePutCategorySelectPayload = ReturnType<typeof PostActions.changePutPostCategorySelectChange>
type ChangePutCategoryPayload = ReturnType<typeof PostActions.changePutPostCategoryChange>
// real change return type
type ChangePutPostSelectPayload = ReturnType<typeof PostActions.changePutPostTitleSelectChange>
type ChangePutPostTitlePayload = ReturnType<typeof PostActions.changePutPostTitleChange>
type ChangePutPostSubTilePayload = ReturnType<typeof PostActions.changePutPostSubTitleChange>
type ChangePutPostMainTextPayload = ReturnType<typeof PostActions.changePutPostMainTextChange>
type ChangePutPostError = ReturnType<typeof PostActions.changePutPostError>

type DeleteDeleteCategorySelectPayload = ReturnType<typeof PostActions.deleteDeleteCategorySelectChange>
type DeleteDeletePostSelectPayload = ReturnType<typeof PostActions.deleteDeletePostTitleSelectChange>

// reducer
const reducer = handleActions<PostState, any>(
  {
    // call certain post's all Information
    [GET_BRING_POST_INFO_PENDING]: state =>
      produce(state, draft => {
        draft.load.pending = true
        draft.load.error = false

        // clean post show data
        draft.show.category = ''
        draft.show.title = ''
        draft.show.subTitle = ''
        draft.show.mainText = ''
        draft.show.date = Date.now()
      }),
    [GET_BRING_POST_INFO_SUCCESS]: (state, action: Action<APIPayload>) => {
      if (action.payload.data.value.type * 1 === 0) {
        // call info for show Post
        return produce(state, draft => {
          draft.load.pending = false
          draft.load.error = false
          // post show data
          draft.show.category = action.payload.data.value.post.category.category
          draft.show.title = action.payload.data.value.post.title
          draft.show.subTitle = action.payload.data.value.post.subTitle
          draft.show.mainText = action.payload.data.value.post.mainText
          draft.show.date = action.payload.data.value.post.date
        })
      } else if (action.payload.data.value.type * 1 === 1) {
        // call info for change Post
        return produce(state, draft => {
          draft.load.pending = false
          draft.load.error = false
          // post change data
          draft.change.category = action.payload.data.value.post.category.category
          draft.change.title = action.payload.data.value.post.title
          draft.change.subTitle = action.payload.data.value.post.subTitle
          draft.change.mainText = action.payload.data.value.post.mainText
          draft.change.date = action.payload.data.value.post.date
        })
      } else if (action.payload.data.value.type * 1 === 2) {
        // call info for delete post
        return produce(state, draft => {
          draft.load.pending = false
          draft.load.error = false
          // post delete data
          draft.delete.category = action.payload.data.value.post.category.category
          draft.delete.showTitle = action.payload.data.value.post.title
          draft.delete.subTitle = action.payload.data.value.post.subTitle
          draft.delete.mainText = action.payload.data.value.post.mainText
          draft.delete.date = action.payload.data.value.post.date
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
        draft.add.category = action.payload || ''
      }),
    [POST_ADD_POST_TITLE_CHANGE]: (state, action: AddPostPostTitlePayload) =>
      produce(state, draft => {
        draft.add.title = action.payload || ''
      }),
    [POST_ADD_POST_SUBTITLE_CHANGE]: (state, action: AddPostPostSubTitlePayload) =>
      produce(state, draft => {
        draft.add.subTitle = action.payload || ''
      }),
    [POST_ADD_POST_MAINTEXT_CHANGE]: (state, action: AddPostPostMainTextPayload) =>
      produce(state, draft => {
        draft.add.mainText = action.payload || ''
      }),
    [POST_ADD_POST_ERROR_DATA_NONE]: (state, action: AddPostPostError) => {
      if (action.payload === 'title') {
        return produce(state, draft => {
          draft.add.failedWithNoDataTitle = true
        })
      } else if (action.payload === 'subTitle') {
        return produce(state, draft => {
          draft.add.failedWithNoDataSubTitle = true
        })
      } else if (action.payload === 'mainText') {
        return produce(state, draft => {
          draft.add.failedWithNoDataMainText = true
        })
      } else if (action.payload === 'clear') {
        return produce(state, draft => {
          draft.add.failedWithNoDataMainText = false
          draft.add.failedWithNoDataSubTitle = false
          draft.add.failedWithNoDataTitle = false
        })
      }
      return produce(state, draft => {
        // Error, not matched error type
      })
    },
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

    // CHANGE
    [PUT_CHANGE_CATEGORY_SELECT_CHANGE]: (state, action: ChangePutCategorySelectPayload) =>
      produce(state, draft => {
        draft.change.selectCategory = action.payload || ''
        draft.change.category = '카테고리 선택'
        draft.change.selectTitle = '변경할 포스트 선택'
        draft.change.title = ''
        draft.change.subTitle = ''
        draft.change.mainText = ''
        draft.change.date = 1111111111
      }),
    [PUT_CHANGE_POST_CATEGORY_CHANGE]: (state, action: ChangePutCategoryPayload) =>
      produce(state, draft => {
        draft.change.category = action.payload || ''
      }),
    [PUT_CHANGE_POST_SELECT_CHANGE]: (state, action: ChangePutPostSelectPayload) =>
      produce(state, draft => {
        draft.change.selectTitle = action.payload || ''
      }),
    [PUT_CHANGE_POST_TITLE_CHANGE]: (state, action: ChangePutPostTitlePayload) =>
      produce(state, draft => {
        draft.change.title = action.payload || ''
      }),
    [PUT_CHANGE_POST_SUBTITLE_CHANGE]: (state, action: ChangePutPostSubTilePayload) =>
      produce(state, draft => {
        draft.change.subTitle = action.payload || ''
      }),
    [PUT_CHANGE_POST_MAINTEXT_CHANGE]: (state, action: ChangePutPostMainTextPayload) =>
      produce(state, draft => {
        draft.change.mainText = action.payload || ''
      }),
    [PUT_CHANGE_POST_ERROR_DATA_NONE]: (state, action: ChangePutPostError) => {
      if (action.payload === 'title') {
        return produce(state, draft => {
          draft.change.failedWithNoDataTitle = true
        })
      } else if (action.payload === 'subTitle') {
        return produce(state, draft => {
          draft.change.failedWithNoDataSubTitle = true
        })
      } else if (action.payload === 'mainText') {
        return produce(state, draft => {
          draft.change.failedWithNoDataMainText = true
        })
      } else if (action.payload === 'clear') {
        return produce(state, draft => {
          draft.change.failedWithNoDataMainText = false
          draft.change.failedWithNoDataSubTitle = false
          draft.change.failedWithNoDataTitle = false
        })
      }
      return produce(state, draft => {
        // Error, not matched error type
      })
    },
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

    // DELETE
    [DELETE_DELETE_CATEGORY_SELECT_CHANGE]: (state, action: DeleteDeleteCategorySelectPayload) =>
      produce(state, draft => {
        draft.delete.category = action.payload || ''
        draft.delete.title = '삭제할 포스트 선택'
        draft.delete.showTitle = ''
        draft.delete.subTitle = ''
        draft.delete.mainText = ''
      }),
    [DELETE_DELETE_POST_SELECT_CHANGE]: (state, action: DeleteDeletePostSelectPayload) =>
      produce(state, draft => {
        draft.delete.title = action.payload || ''
      }),
    [DELETE_DELETE_POST_PENDING]: (state, action) =>
      produce(state, draft => {
        draft.delete.pending = true
        draft.delete.error = false
      }),
    [DELETE_DELETE_POST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.delete.pending = false
        draft.delete.error = false
      }),
    [DELETE_DELETE_POST_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.delete.pending = false
        draft.delete.error = true
      }),

    // when the task is done, this is will be excute
    [POST_DONE]: state =>
      produce(state, draft => {
        draft.load.pending = false
        draft.load.error = false

        draft.show.category = ''
        draft.show.title = ''
        draft.show.subTitle = ''
        draft.show.mainText = ''
        draft.show.date = Date.now()

        // add state
        draft.add.category = '카테고리 선택'
        draft.add.title = ''
        draft.add.subTitle = ''
        draft.add.mainText = ''
        draft.add.date = Date.now()
        draft.add.failedWithNoDataMainText = false
        draft.add.failedWithNoDataSubTitle = false
        draft.add.failedWithNoDataMainText = false

        // change state
        draft.change.selectCategory = '카테고리 선택'
        draft.change.selectTitle = '변경할 포스트 선택'
        draft.change.category = '카테고리 선택'
        draft.change.title = ''
        draft.change.subTitle = ''
        draft.change.mainText = ''
        draft.change.date = Date.now()
        draft.change.failedWithNoDataMainText = false
        draft.change.failedWithNoDataSubTitle = false
        draft.change.failedWithNoDataMainText = false

        // delete state
        draft.delete.category = '삭제할 카테고리 선택'
        draft.delete.title = '삭제할 포스트 선택'
        draft.delete.showTitle = ''
        draft.delete.subTitle = ''
        draft.delete.mainText = ''
        draft.delete.date = Date.now()
      })
  },
  initialState
)

export default reducer
