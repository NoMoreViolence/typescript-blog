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
// Change one of top ripples action state
const CHANGE_TOP_ADD_MODE = 'CHANGE_TOP_ADD_MODE'
const CHANGE_TOP_SHOW_CHILD_MODE = 'CHANGE_TOP_SHOW_CHILD_MODE'
const CHANGE_TOP_CHANGE_MODE = 'CHANGE_TOP_CHANGE_MODE'
const CHANGE_TOP_DELETE_MODE = 'CHANGE_TOP_DELETE_MODE'
const CHANGE_TOP_MORE_SHOW_MODE = 'CHANGE_TOP_MORE_SHOW_MODE'
// Change one of child ripples action state
const CHANGE_CHILD_CHANGE_MODE = 'CHANGE_CHILD_CHANGE_MODE'
const CHANGE_CHILD_DELETE_MODE = 'CHANGE_CHILD_DELETE_MODE'
const CHANGE_CHILD_MORE_SHOW_MODE = 'CHANGE_CHILD_MORE_SHOW_MODE'
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

export interface ChangeChildMode {
  top: number
  child: number
}

type APIPayload = any
type changeChildMode = ChangeChildMode

export const RippleActions = {
  // Reset Stat
  rippleClear: createAction(RIPPLE_CLEAR),
  // Change one of top ripples change mode
  changeTopAddMode: createAction<number, number>(CHANGE_TOP_ADD_MODE, value => value),
  changeTopShowChildMode: createAction<number, number>(CHANGE_TOP_SHOW_CHILD_MODE, value => value),
  changeTopChangeMode: createAction<number, number>(CHANGE_TOP_CHANGE_MODE, value => value),
  changeTopDeleteMode: createAction<number, number>(CHANGE_TOP_DELETE_MODE, value => value),
  changeTopMoreShowMode: createAction<number, number>(CHANGE_TOP_MORE_SHOW_MODE, value => value),
  // Change one of child ripples change mode
  changeChildChangeMode: createAction<changeChildMode, changeChildMode>(CHANGE_CHILD_CHANGE_MODE, value => value),
  changeChildDeleteMode: createAction<changeChildMode, changeChildMode>(CHANGE_CHILD_DELETE_MODE, value => value),
  changeChildMoreShowMode: createAction<changeChildMode, changeChildMode>(CHANGE_CHILD_MORE_SHOW_MODE, value => value),
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
  childRipple: TopOrChildRippleState[]
  date: number
  _id: string
  text: string
  writer: string
  categoryID: string
  postID: string
  top: boolean
  __v: number
  addMode: boolean
  showChildMode: boolean
  changeMode: boolean
  deleteMode: boolean
  moreRippleView: boolean
}

export interface RippleState {
  topLoad: TopLoadState
  childLoad: ChildLoadState
  topRipple: TopOrChildRippleState[]
  childRipple: TopOrChildRippleState[]
  addRippleState: AddRippleState
}

const initialState: RippleState = {
  topLoad: { pending: false, error: false },
  childLoad: { pending: false, error: false },
  topRipple: [],
  childRipple: [],
  addRippleState: { pending: false, error: false }
}

type TopChangeAddModePayload = ReturnType<typeof RippleActions.changeTopAddMode>
type TopChangeShowChildPayload = ReturnType<typeof RippleActions.changeTopShowChildMode>
type TopChangeChangeModePayload = ReturnType<typeof RippleActions.changeTopChangeMode>
type TopChangeDeleteModePayload = ReturnType<typeof RippleActions.changeTopDeleteMode>
type TopMoreShowPayload = ReturnType<typeof RippleActions.changeTopMoreShowMode>
type ChildChangeChangeModePayload = ReturnType<typeof RippleActions.changeChildChangeMode>
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
        draft.topRipple = []
      }),
    // Change one of top ripples action state
    [CHANGE_TOP_ADD_MODE]: (state, action: TopChangeAddModePayload) => {
      // If current state is not add mode
      if (state.topRipple[action.payload || 0].addMode === false) {
        return produce(state, draft => {
          draft.topRipple[action.payload || 0].addMode = true
          draft.topRipple[action.payload || 0].changeMode = false
          draft.topRipple[action.payload || 0].deleteMode = false
        })
      }
      // Return to normal mode
      return produce(state, draft => {
        draft.topRipple[action.payload || 0].addMode = false
      })
    },
    [CHANGE_TOP_SHOW_CHILD_MODE]: (state, action: TopChangeShowChildPayload) =>
      // Show child mode
      produce(state, draft => {
        draft.topRipple[action.payload || 0].showChildMode = !draft.topRipple[action.payload || 0].showChildMode
      }),
    [CHANGE_TOP_CHANGE_MODE]: (state, action: TopChangeChangeModePayload) => {
      // If current state is not change mode
      if (state.topRipple[action.payload || 0].changeMode === false) {
        return produce(state, draft => {
          draft.topRipple[action.payload || 0].changeMode = true
          draft.topRipple[action.payload || 0].addMode = false
          draft.topRipple[action.payload || 0].deleteMode = false
        })
      }
      return produce(state, draft => {
        draft.topRipple[action.payload || 0].changeMode = false
      })
    },
    [CHANGE_TOP_DELETE_MODE]: (state, action: TopChangeDeleteModePayload) => {
      // If current state is not change mode
      if (state.topRipple[action.payload || 0].deleteMode === false) {
        return produce(state, draft => {
          draft.topRipple[action.payload || 0].deleteMode = true
          draft.topRipple[action.payload || 0].changeMode = false
          draft.topRipple[action.payload || 0].addMode = false
        })
      }
      return produce(state, draft => {
        draft.topRipple[action.payload || 0].deleteMode = false
      })
    },
    [CHANGE_TOP_MORE_SHOW_MODE]: (state, action: TopMoreShowPayload) =>
      produce(state, draft => {
        draft.topRipple[action.payload || 0].moreRippleView = !draft.topRipple[action.payload || 0].moreRippleView
      }),
    // Change one of child ripples action state
    [CHANGE_CHILD_CHANGE_MODE]: (state, action: ChildChangeChangeModePayload) => {
      // tslint:disable-next-line:no-console
      console.log(action)
      return produce(state, draft => {
        //
      })
      // produce(state, draft => {
      //   draft.topRipple[act || 0].childRipple[ || 0].changeMode = !draft.topRipple[
      //     || 0
      //  ].childRipple[ || 0].changeMode
      // }),
    },
    [CHANGE_CHILD_DELETE_MODE]: (state, action: any) =>
      produce(state, draft => {
        draft.topRipple[action.payload.top || 0].childRipple[action.payload.child || 0].deleteMode = !draft.topRipple[
          action.payload.top || 0
        ].childRipple[action.payload.child || 0].deleteMode
      }),
    [CHANGE_CHILD_MORE_SHOW_MODE]: (state, action: any) =>
      produce(state, draft => {
        draft.topRipple[action.payload.top || 0].childRipple[action.payload.child || 0].moreRippleView = !draft
          .topRipple[action.payload.top || 0].childRipple[action.payload.child || 0].moreRippleView
      }),
    [GET_BRING_TOP_RIPPLE_INFO_PENDING]: state =>
      produce(state, draft => {
        draft.topLoad.pending = true
        draft.topLoad.error = false
      }),
    [GET_BRING_TOP_RIPPLE_INFO_SUCCESS]: (state, action: Action<APIPayload>) => {
      const topRipple = action.payload.data.value.ripples.map((object: TopOrChildRippleState, i: number) => {
        return {
          ...object,
          addMode: false,
          showChildMode: false,
          changeMode: false,
          deleteMode: false,
          moreRippleView: false
        }
      })
      // Return data
      return produce(state, draft => {
        draft.topLoad.pending = false
        draft.topLoad.error = false
        draft.topRipple = topRipple
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
      // Merge show ripple and child ripple
      const childRippleData = state.topRipple.map((object: TopOrChildRippleState, i) => {
        if (object._id === action.payload.data.value.topID) {
          return { ...object, childRipple: action.payload.data.value.ripples }
        }
        return object
      })
      // Return data
      return produce(state, draft => {
        draft.topRipple = childRippleData
        draft.childLoad.pending = false
        draft.childLoad.error = false
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
    [POST_ADD_TOP_RIPPLE_SUCCESS]: (state, action: Action<APIPayload>) => {
      // Show ripple state merge
      const topRipple: TopOrChildRippleState[] = Array.prototype.concat(
        action.payload.data.value.addedRipple,
        state.topRipple
      )

      // Change state
      return produce(state, draft => {
        draft.addRippleState.pending = false
        draft.addRippleState.error = false
        draft.topRipple = topRipple
      })
    },
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
