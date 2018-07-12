import * as React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { StoreState } from 'store/modules'
import {
  RippleActions,
  TopOrChildRippleState,
  TopLoadState,
  ChildLoadState,
  GetTopRipples,
  GetChildRipples,
  PostTopRipple,
  PostChildRipple,
  ChangeChildMode
} from 'store/modules/Ripple'

import Ripple from 'components/Templates/Ripple'

interface Props {
  showRipple: TopOrChildRippleState[]
  topRipple: TopOrChildRippleState[]
  topLoadState: TopLoadState
  childRipple: TopOrChildRippleState[]
  childLoadState: ChildLoadState
  rippleClear: () => never
  getTopRipples: (value: GetTopRipples) => never
  getChildRipples: (value: GetChildRipples) => never
  postTopRipple: (value: PostTopRipple) => never
  postChildRipple: (value: PostChildRipple) => never
  // top
  changeTopAddMode: (value: number) => never
  changeTopShowChildMode: (value: number) => never
  changeTopChangeMode: (value: number) => never
  changeTopDeleteMode: (value: number) => never
  changeTopMoreViewMode: (value: number) => never
  // child
  changeChildChangeMode: (value: ChangeChildMode) => never
  changeChildDeleteMode: (value: ChangeChildMode) => never
  changeChildMoreViewMode: (value: ChangeChildMode) => never
  // submit ripple state
  addRippleStatePending: boolean
  submitChildRipple: (value: PostChildRipple) => never
}

const RippleContainer: React.SFC<Props> = Props => (
  <Ripple
    topRipple={Props.topRipple}
    topLoadState={Props.topLoadState}
    childRipple={Props.childRipple}
    childLoadState={Props.childLoadState}
    rippleClear={Props.rippleClear}
    topRippleLoad={Props.getTopRipples}
    childRippleLoad={Props.getChildRipples}
    postTopRipple={Props.postTopRipple}
    postChildRipple={Props.postChildRipple}
    changeTopAddMode={Props.changeTopAddMode}
    changeTopShowChildMode={Props.changeTopShowChildMode}
    changeTopChangeMode={Props.changeTopChangeMode}
    changeTopDeleteMode={Props.changeTopDeleteMode}
    changeTopMoreViewMode={Props.changeTopMoreViewMode}
    changeChildChangeMode={Props.changeChildChangeMode}
    changeChildDeleteMode={Props.changeChildDeleteMode}
    changeChildMoreViewMode={Props.changeChildMoreViewMode}
    submitChildRipple={Props.submitChildRipple}
    addRippleStatePending={Props.addRippleStatePending}
  />
)

export default connect(
  ({ Ripple }: StoreState) => ({
    topRipple: Ripple.topRipple,
    topLoadState: Ripple.topLoad,
    childRipple: Ripple.childRipple,
    childLoadState: Ripple.childLoad,
    addRippleStatePending: Ripple.addRippleState.pending
  }),
  dispatch => ({
    rippleClear: bindActionCreators(RippleActions.rippleClear, dispatch),
    getTopRipples: bindActionCreators(RippleActions.getTopRipples, dispatch),
    getChildRipples: bindActionCreators(RippleActions.getChildRipples, dispatch),
    postTopRipple: bindActionCreators(RippleActions.postTopRipple, dispatch),
    postChildRipple: bindActionCreators(RippleActions.postChildRipple, dispatch),
    changeTopAddMode: bindActionCreators(RippleActions.changeTopAddMode, dispatch),
    changeTopShowChildMode: bindActionCreators(RippleActions.changeTopShowChildMode, dispatch),
    changeTopChangeMode: bindActionCreators(RippleActions.changeTopChangeMode, dispatch),
    changeTopDeleteMode: bindActionCreators(RippleActions.changeTopDeleteMode, dispatch),
    changeTopMoreViewMode: bindActionCreators(RippleActions.changeTopMoreShowMode, dispatch),
    changeChildChangeMode: bindActionCreators(RippleActions.changeChildChangeMode, dispatch),
    changeChildDeleteMode: bindActionCreators(RippleActions.changeChildDeleteMode, dispatch),
    changeChildMoreViewMode: bindActionCreators(RippleActions.changeChildMoreShowMode, dispatch),
    submitChildRipple: bindActionCreators(RippleActions.postChildRipple, dispatch)
  })
)(RippleContainer)
