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
  topNumber: number
}
function postChildRippleAPI(value: PostChildRipple) {
  // tslint:disable-next-line:no-console
  console.log('topNumber: ' + value.topNumber)
  return axios.post(
    `/api/${value.category}/${value.title}/${value.writer}/child/?topID=${value.topID}`,
    {
      ripple: value.ripple,
      password: value.password,
      topNumber: value.topNumber
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
  top?: number
  child?: number
}

type APIPayload = any

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
  changeChildChangeMode: createAction<ChangeChildMode, ChangeChildMode>(CHANGE_CHILD_CHANGE_MODE, value => value),
  changeChildDeleteMode: createAction<ChangeChildMode, ChangeChildMode>(CHANGE_CHILD_DELETE_MODE, value => value),
  changeChildMoreShowMode: createAction<ChangeChildMode, ChangeChildMode>(CHANGE_CHILD_MORE_SHOW_MODE, value => value),
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
  childRippleLoaded: boolean
  date: number
  _id: string
  text: string
  writer: string
  categoryID: string
  postID: string
  top: boolean
  __v: number
  addMode: boolean
  addPending: boolean
  showChildMode: boolean
  showChildPending: boolean
  changeMode: boolean
  changePending: boolean
  deleteMode: boolean
  deletePending: boolean
  moreRippleView: boolean
  moreRippleViewMessage: string
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

type TopAddModePayload = ReturnType<typeof RippleActions.changeTopAddMode>
type TopShowChildPayload = ReturnType<typeof RippleActions.changeTopShowChildMode>
type TopChangeModePayload = ReturnType<typeof RippleActions.changeTopChangeMode>
type TopDeleteModePayload = ReturnType<typeof RippleActions.changeTopDeleteMode>
type TopMoreShowPayload = ReturnType<typeof RippleActions.changeTopMoreShowMode>

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
    [CHANGE_TOP_ADD_MODE]: (state, action: TopAddModePayload) => {
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
    [CHANGE_TOP_SHOW_CHILD_MODE]: (state, action: TopShowChildPayload) =>
      // Show child mode
      produce(state, draft => {
        draft.topRipple[action.payload || 0].showChildMode = !draft.topRipple[action.payload || 0].showChildMode
      }),
    [CHANGE_TOP_CHANGE_MODE]: (state, action: TopChangeModePayload) => {
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
    [CHANGE_TOP_DELETE_MODE]: (state, action: TopDeleteModePayload) => {
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
    [CHANGE_CHILD_CHANGE_MODE]: (state, action: any) => {
      const { top, child } = action.payload
      // tslint:disable-next-line:no-console
      console.log(state.topRipple[top || 0].childRipple[child || 0].changeMode)
      // Change
      if (state.topRipple[top || 0].childRipple[child || 0].changeMode === false) {
        return produce(state, draft => {
          draft.topRipple[top || 0].childRipple[child || 0].changeMode = true
          draft.topRipple[top || 0].childRipple[child || 0].deleteMode = false
        })
      }
      // Return to origin data
      return produce(state, draft => {
        draft.topRipple[top || 0].childRipple[child || 0].changeMode = false
      })
    },
    [CHANGE_CHILD_DELETE_MODE]: (state, action: any) => {
      const { top, child } = action.payload
      // Change
      if (state.topRipple[top || 0].childRipple[child || 0].deleteMode === false) {
        return produce(state, draft => {
          draft.topRipple[top || 0].childRipple[child || 0].deleteMode = true
          draft.topRipple[top || 0].childRipple[child || 0].changeMode = false
        })
      }
      // Return to origin data
      return produce(state, draft => {
        draft.topRipple[top || 0].childRipple[child || 0].deleteMode = false
      })
    },
    [CHANGE_CHILD_MORE_SHOW_MODE]: (state, action: any) => {
      const { top, child } = action.payload
      const currentMessage = state.topRipple[top || 0].childRipple[child || 0].moreRippleViewMessage

      if (currentMessage === '더 보기') {
        return produce(state, draft => {
          draft.topRipple[top || 0].childRipple[child || 0].moreRippleView = !draft.topRipple[top || 0].childRipple[
            child || 0
          ].moreRippleView
          draft.topRipple[top || 0].childRipple[child || 0].moreRippleViewMessage = '접기'
        })
      }
      return produce(state, draft => {
        draft.topRipple[top || 0].childRipple[child || 0].moreRippleView = !draft.topRipple[top || 0].childRipple[
          child || 0
        ].moreRippleView
        draft.topRipple[top || 0].childRipple[child || 0].moreRippleViewMessage = '더 보기'
      })
    },
    [GET_BRING_TOP_RIPPLE_INFO_PENDING]: state =>
      produce(state, draft => {
        draft.topLoad.pending = true
        draft.topLoad.error = false
      }),
    [GET_BRING_TOP_RIPPLE_INFO_SUCCESS]: (state, action: Action<APIPayload>) => {
      const topRipple = action.payload.data.value.ripples.map((object: TopOrChildRippleState, i: number) => {
        return {
          ...object,
          childRippleLoaded: false,
          addMode: false,
          addPending: false,
          showChildMode: false,
          showChildPending: false,
          changeMode: false,
          changePending: false,
          deleteMode: false,
          deletePending: false,
          moreRippleView: false,
          moreRippleViewMessage: '더 보기'
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
      // payload data
      const returnValue = action.payload.data.value

      // Merge show ripple and child ripple
      const childRippleData = state.topRipple.map(
        (object: TopOrChildRippleState, i: number): TopOrChildRippleState => {
          if (object._id === returnValue.topID) {
            return {
              ...object,
              childRippleLoaded: true,
              // Child ripple data contain with initial mode value
              // returnValue.ripples === child ripple array
              childRipple: returnValue.ripples.map((object: TopOrChildRippleState[], i: number) => {
                return {
                  ...object,
                  moreRippleView: false,
                  moreRippleViewMessage: '더 보기',
                  changeMode: false,
                  changePending: false,
                  deleteMode: false,
                  deletePending: false
                }
              })
            }
          }
          return object
        }
      )
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
        {
          ...action.payload.data.value.addedRipple,
          childRippleLoaded: false,
          addMode: false,
          addPending: false,
          showChildMode: false,
          showChildPending: false,
          changeMode: false,
          changePending: false,
          deleteMode: false,
          deletePending: false,
          moreRippleView: false,
          moreRippleViewMessage: '더 보기'
        },
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
        draft.addRippleState.pending = true
        draft.addRippleState.error = false
      }),
    [POST_ADD_CHILD_RIPPLE_SUCCESS]: (state, action: Action<APIPayload>) => {
      const addedRipple = action.payload.data.value.addedRipple

      // Show ripple state merge
      const childRipple: TopOrChildRippleState[] = Array.prototype.concat(
        state.topRipple[addedRipple.topNumber || 0].childRipple,
        {
          ...addedRipple,
          childRippleLoaded: false,
          changeMode: false,
          changePending: false,
          deleteMode: false,
          deletePending: false,
          moreRippleView: false,
          moreRippleViewMessage: '더 보기'
        }
      )

      return produce(state, draft => {
        draft.addRippleState.pending = false
        draft.addRippleState.error = false
        draft.topRipple[addedRipple.topNumber || 0].childRipple = childRipple
      })
    },
    [POST_ADD_CHILD_RIPPLE_FAILURE]: state =>
      produce(state, draft => {
        draft.addRippleState.pending = false
        draft.addRippleState.error = true
      })
  },
  initialState
)

export default reducer
