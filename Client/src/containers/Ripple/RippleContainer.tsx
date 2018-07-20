import * as React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { StoreState } from 'store/modules'
import {
  RippleActions,
  TopOrChildRippleState,
  GetTopRipples,
  GetChildRipples,
  PostTopRipple,
  PostChildRipple,
  PatchChildRipple,
  ChildMode,
  PatchTopRipple,
  DeleteTopRipple,
  DeleteChildRipple
} from 'store/modules/Ripple'

import Ripple from 'components/Templates/Ripple'

interface Props {
  topRipple: TopOrChildRippleState[]
  rippleClear: () => never
  getTopRipples: (value: GetTopRipples) => never
  getChildRipples: (value: GetChildRipples) => never
  postTopRipple: (value: PostTopRipple) => never
  postChildRipple: (value: PostChildRipple) => never
  changeTopRipple: (value: PatchTopRipple) => never
  changeChildRipple: (value: PatchChildRipple) => any
  deleteTopRipple: (value: DeleteTopRipple) => any
  deleteChildRipple: (value: DeleteChildRipple) => any
  // top
  changeTopAddMode: (value: number) => never
  changeTopShowChildMode: (value: number) => never
  changeTopChangeMode: (value: number) => never
  changeTopDeleteMode: (value: number) => never
  changeTopMoreViewMode: (value: number) => never
  // child
  changeChildChangeMode: (value: ChildMode) => never
  changeChildDeleteMode: (value: ChildMode) => never
  changeChildMoreViewMode: (value: ChildMode) => never
  // submit ripple state
  addRippleStatePending: boolean
  changeRippleStatePending: boolean
  deleteRippleStatePending: boolean
}

const RippleContainer: React.SFC<Props> = Props => (
  <Ripple
    topRipple={Props.topRipple}
    rippleClear={Props.rippleClear}
    topRippleLoad={Props.getTopRipples}
    childRippleLoad={Props.getChildRipples}
    postTopRipple={Props.postTopRipple}
    postChildRipple={Props.postChildRipple}
    changeTopRipple={Props.changeTopRipple}
    changeChildRipple={Props.changeChildRipple}
    deleteTopRipple={Props.deleteTopRipple}
    deleteChildRipple={Props.deleteChildRipple}
    changeTopAddMode={Props.changeTopAddMode}
    changeTopShowChildMode={Props.changeTopShowChildMode}
    changeTopChangeMode={Props.changeTopChangeMode}
    changeTopDeleteMode={Props.changeTopDeleteMode}
    changeTopMoreViewMode={Props.changeTopMoreViewMode}
    changeChildChangeMode={Props.changeChildChangeMode}
    changeChildDeleteMode={Props.changeChildDeleteMode}
    changeChildMoreViewMode={Props.changeChildMoreViewMode}
    addRippleStatePending={Props.addRippleStatePending}
    changeRippleStatePending={Props.changeRippleStatePending}
    deleteRippleStatePending={Props.deleteRippleStatePending}
  />
)

export default connect(
  ({ Ripple }: StoreState) => ({
    topRipple: Ripple.topRipple,
    addRippleStatePending: Ripple.addRippleState.pending,
    changeRippleStatePending: Ripple.changeRippleState.pending,
    deleteRippleStatePending: Ripple.deleteRippleState.pending
  }),
  dispatch => ({
    rippleClear: bindActionCreators(RippleActions.rippleClear, dispatch),
    getTopRipples: bindActionCreators(RippleActions.getTopRipples, dispatch),
    getChildRipples: bindActionCreators(RippleActions.getChildRipples, dispatch),
    postTopRipple: bindActionCreators(RippleActions.postTopRipple, dispatch),
    postChildRipple: bindActionCreators(RippleActions.postChildRipple, dispatch),
    changeTopRipple: bindActionCreators(RippleActions.patchChildRipple, dispatch),
    changeChildRipple: bindActionCreators(RippleActions.patchChildRipple, dispatch),
    deleteTopRipple: bindActionCreators(RippleActions.deleteTopRipple, dispatch),
    deleteChildRipple: bindActionCreators(RippleActions.deleteChildRipple, dispatch),
    changeTopAddMode: bindActionCreators(RippleActions.changeTopAddMode, dispatch),
    changeTopShowChildMode: bindActionCreators(RippleActions.changeTopShowChildMode, dispatch),
    changeTopChangeMode: bindActionCreators(RippleActions.changeTopChangeMode, dispatch),
    changeTopDeleteMode: bindActionCreators(RippleActions.changeTopDeleteMode, dispatch),
    changeTopMoreViewMode: bindActionCreators(RippleActions.changeTopMoreShowMode, dispatch),
    changeChildChangeMode: bindActionCreators(RippleActions.changeChildChangeMode, dispatch),
    changeChildDeleteMode: bindActionCreators(RippleActions.changeChildDeleteMode, dispatch),
    changeChildMoreViewMode: bindActionCreators(RippleActions.changeChildMoreShowMode, dispatch)
  })
)(RippleContainer)
