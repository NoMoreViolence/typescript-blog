import { handleActions, Action, createAction } from 'redux-actions'
import produce from 'immer'
import axios from 'axios'

// Get top ripple function
export interface GetTopRipples {
  category: string
  title: string
}
function getTopRipplesAPI(value: GetTopRipples) {
  return axios.get(`/api/${value.category}/${value.title}/ripples/top`)
}

// Get child ripple function
export interface GetChildRipples {
  category: string
  title: string
  topID: string
}
function getChildRipplesAPI(value: GetChildRipples) {
  return axios.get(`/api/${value.category}/${value.title}/ripples/child?topID=${value.topID}`)
}

// Post top ripple function
export interface PostTopRipple {
  category: string
  title: string
  writer: string
  ripple: string
  password: string
}
function postTopRippleAPI(value: PostTopRipple) {
  return axios.post(
    `/api/${value.category}/${value.title}/${value.writer}/top`,
    {
      ripple: value.ripple,
      password: value.password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

// Post child ripple function
export interface PostChildRipple {
  category: string
  title: string
  writer: string
  topID: string
  ripple: string
  password: string
}
function postChildRippleAPI(value: PostChildRipple) {
  return axios.post(
    `/api/${value.category}/${value.title}/${value.writer}/child/?topID=${value.topID}`,
    {
      ripple: value.ripple,
      password: value.password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

// Reset all state data
const RIPPLE_CLEAR = 'RIPPLE_CLEAR'
// Bring All TOP ripples from some post
const GET_BRING_TOP_RIPPLE_INFO = 'GET_BRING_TOP_RIPPLE_INFO'
const GET_BRING_TOP_RIPPLE_INFO_PENDING = 'GET_BRING_TOP_RIPPLE_INFO_PENDING'
const GET_BRING_TOP_RIPPLE_INFO_SUCCESS = 'GET_BRING_TOP_RIPPLE_INFO_SUCCESS'
const GET_BRING_TOP_RIPPLE_INFO_FAILURE = 'GET_BRING_TOP_RIPPLE_INFO_FAILURE'
// Bring All child ripples of some top ripples
const GET_BRING_CHILD_RIPPLE_INFO = 'GET_BRING_CHILD_RIPPLE_INFO'
const GET_BRING_CHILD_RIPPLE_INFO_PENDING = 'GET_BRING_CHILD_RIPPLE_INFO_PENDING'
const GET_BRING_CHILD_RIPPLE_INFO_SUCCESS = 'GET_BRING_CHILD_RIPPLE_INFO_SUCCESS'
const GET_BRING_CHILD_RIPPLE_INFO_FAILURE = 'GET_BRING_CHILD_RIPPLE_INFO_FAILURE'
// Adding ripple
// TOP
const POST_ADD_TOP_RIPPLE = 'POST_ADD_TOP_RIPPLE'
const POST_ADD_TOP_RIPPLE_PENDING = 'POST_ADD_TOP_RIPPLE_PENDING'
const POST_ADD_TOP_RIPPLE_SUCCESS = 'POST_ADD_TOP_RIPPLE_SUCCESS'
const POST_ADD_TOP_RIPPLE_FAILURE = 'POST_ADD_TOP_RIPPLE_FAILURE'
// CHILD
const POST_ADD_CHILD_RIPPLE = 'POST_ADD_CHILD_RIPPLE'
const POST_ADD_CHILD_RIPPLE_PENDING = 'POST_ADD_CHILD_RIPPLE_PENDING'
const POST_ADD_CHILD_RIPPLE_SUCCESS = 'POST_ADD_CHILD_RIPPLE_SUCCESS'
const POST_ADD_CHILD_RIPPLE_FAILURE = 'POST_ADD_CHILD_RIPPLE_FAILURE'

type APIPayload = any

export const RippleActions = {
  // Reset State
  rippleClear: createAction(RIPPLE_CLEAR),
  // Get top ripples
  getTopRipples: createAction<APIPayload, GetTopRipples>(GET_BRING_TOP_RIPPLE_INFO, getTopRipplesAPI),
  // Get child ripples
  getChildRipples: createAction<APIPayload, GetChildRipples>(GET_BRING_CHILD_RIPPLE_INFO, getChildRipplesAPI),
  // Post top ripple
  postTopRipple: createAction<APIPayload, PostTopRipple>(POST_ADD_TOP_RIPPLE, postTopRippleAPI),
  // Post child ripple
  postChildRipple: createAction<APIPayload, PostChildRipple>(POST_ADD_CHILD_RIPPLE, postChildRippleAPI)
}

export interface AddRippleState {
  pending: boolean
  error: boolean
}

export interface TopLoadState {
  pending: boolean
  error: boolean
}

export interface ChildLoadState {
  pending: boolean
  error: boolean
}

export interface TopOrChildRippleState {
  childRipple: any[]
  admin: boolean
  date: number
  _id: string
  text: string
  writer: string
  categoryID: string
  postID: string
  top: boolean
  __v: number
}

export interface RippleState {
  topLoad: TopLoadState
  childLoad: ChildLoadState
  topRipple: TopOrChildRippleState[]
  childRipple: TopOrChildRippleState[]
  showRipple: TopOrChildRippleState[]
  addRippleState: AddRippleState
}

const initialState: RippleState = {
  topLoad: { pending: false, error: false },
  childLoad: { pending: false, error: false },
  topRipple: [],
  childRipple: [],
  showRipple: [],
  addRippleState: { pending: false, error: false }
}

// Reducer
const reducer = handleActions<RippleState, any>(
  {
    [RIPPLE_CLEAR]: state =>
      produce(state, draft => {
        draft.topLoad.pending = false
        draft.topLoad.error = false
        draft.topRipple = []
        draft.childLoad.pending = false
        draft.childLoad.error = false
        draft.childRipple = []
        draft.showRipple = []
      }),
    [GET_BRING_TOP_RIPPLE_INFO_PENDING]: state =>
      produce(state, draft => {
        draft.topLoad.pending = true
        draft.topLoad.error = false
      }),
    [GET_BRING_TOP_RIPPLE_INFO_SUCCESS]: (state, action: Action<APIPayload>) => {
      // Show ripple
      // tslint:disable:no-console
      console.log(action.payload.data.value)
      const showRipple = action.payload.data.value.ripples.map((object: TopOrChildRippleState, i: number) => {
        return { ...object, childRipple: [] }
      })

      // Return data
      return produce(state, draft => {
        draft.topLoad.pending = false
        draft.topLoad.error = false
        draft.topRipple = action.payload.data.value.ripples
        draft.showRipple = showRipple
      })
    },
    [GET_BRING_TOP_RIPPLE_INFO_FAILURE]: state =>
      produce(state, draft => {
        draft.topLoad.pending = false
        draft.topLoad.error = true
      }),
    [GET_BRING_CHILD_RIPPLE_INFO_PENDING]: state =>
      produce(state, draft => {
        draft.childLoad.pending = true
        draft.childLoad.error = false
      }),
    [GET_BRING_CHILD_RIPPLE_INFO_SUCCESS]: (state, action: Action<APIPayload>) => {
      // tslint:disable:no-console
      console.log(action.payload.data.value)
      const childRippleData = state.showRipple.map((object: TopOrChildRippleState, i) => {
        if (object._id === action.payload.data.value.topID) {
          return { ...object, childRipple: action.payload.data.value.ripples }
        }
        return object
      })
      return produce(state, draft => {
        draft.showRipple = childRippleData
      })
    },
    [GET_BRING_CHILD_RIPPLE_INFO_FAILURE]: state =>
      produce(state, draft => {
        draft.childLoad.pending = false
        draft.childLoad.error = true
      }),
    [POST_ADD_TOP_RIPPLE_PENDING]: state =>
      produce(state, draft => {
        draft.addRippleState.pending = true
        draft.addRippleState.error = false
      }),
    [POST_ADD_TOP_RIPPLE_SUCCESS]: state =>
      produce(state, draft => {
        draft.addRippleState.pending = false
        draft.addRippleState.error = false
      }),
    [POST_ADD_TOP_RIPPLE_FAILURE]: state =>
      produce(state, draft => {
        draft.addRippleState.pending = false
        draft.addRippleState.error = true
      }),
    [POST_ADD_CHILD_RIPPLE_PENDING]: state =>
      produce(state, draft => {
        //
      }),
    [POST_ADD_CHILD_RIPPLE_SUCCESS]: state =>
      produce(state, draft => {
        //
      }),
    [POST_ADD_CHILD_RIPPLE_FAILURE]: state =>
      produce(state, draft => {
        //
      })
  },
  initialState
)

export default reducer
