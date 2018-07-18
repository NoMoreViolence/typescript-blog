import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import {
  TopOrChildRippleState,
  TopLoadState,
  ChildLoadState,
  GetTopRipples,
  GetChildRipples,
  PostTopRipple,
  PostChildRipple,
  PatchChildRipple,
  ChildMode
} from 'store/modules/Ripple'

import RippleTopInput from 'lib/RippleTopInput'
import RippleTopRipple from 'lib/RippleTopRipple'

import './Ripple.css'
import { toast } from 'react-toastify'

interface Props {
  // Ripple data
  topRipple: TopOrChildRippleState[]
  topLoadState: TopLoadState
  childRipple: TopOrChildRippleState[]
  childLoadState: ChildLoadState
  // Ripple http fun
  rippleClear: () => Promise<object>
  topRippleLoad: (value: GetTopRipples) => Promise<object>
  childRippleLoad: (value: GetChildRipples) => Promise<object>
  postTopRipple: (value: PostTopRipple) => Promise<object>
  postChildRipple: (value: PostChildRipple) => Promise<object>
  // Ripple state fun: top
  changeTopAddMode: (value: number) => Promise<object>
  changeTopShowChildMode: (value: number) => Promise<object>
  changeTopChangeMode: (value: number) => Promise<object>
  changeTopDeleteMode: (value: number) => Promise<object>
  changeTopMoreViewMode: (value: number) => Promise<object>
  // Ripple staet fun: child
  changeChildChangeMode: (value: ChildMode) => Promise<object>
  changeChildRipple: (value: PatchChildRipple) => Promise<object>
  changeChildDeleteMode: (value: ChildMode) => Promise<object>
  changeChildMoreViewMode: (value: ChildMode) => Promise<object>
  // Submit ripple state
  addRippleStatePending: boolean
  changeRippleStatePending: boolean
}

interface State {
  topRippleLoaded: object
}

class Ripple extends React.Component<Props & RouteComponentProps<any>, State> {
  public state = {
    topRippleLoaded: {}
  }

  // First: reset the top ripple data
  // Second: call top ripple
  public componentDidMount() {
    // Url split
    const urlParams = this.props.match.url.split('/')
    const category = urlParams[1]
    const title = urlParams[2]

    // Ripple data clear
    this.props.rippleClear()
    // Load top ripples
    this.props.topRippleLoad({ category, title }).catch((err: any) => {
      toast(err.response.data.message)
    })
  }

  // Optimization rendering problem
  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true
    }
    return false
  }

  public render(): JSX.Element {
    // Show Top Ripple
    const showTopRipple = (data: TopOrChildRippleState[]) => {
      return data.map((object: TopOrChildRippleState, i: number) => {
        // const keyProp = i
        return (
          <React.Fragment key={i}>
            <RippleTopRipple
              // Ripple basic stuff
              writer={object.writer}
              text={object.text}
              date={object.date}
              // Top ripple number
              topNumber={i}
              rippleID={object._id}
              childRippleLoaded={object.childRippleLoaded}
              childRipple={object.childRipple}
              // Ripple Loading
              topRippleLoad={this.props.topRippleLoad}
              childRippleLoad={this.props.childRippleLoad}
              // URL
              category={this.props.match.url.split('/')[1]}
              title={this.props.match.url.split('/')[2]}
              // Ripple state
              topAddMode={object.addMode}
              topShowChildMode={object.showChildMode}
              topChangeMode={object.changeMode}
              topDeleteMode={object.deleteMode}
              topMoreRippleView={object.moreRippleView}
              topMoreRippleViewMessage={object.moreRippleViewMessage}
              // Ripple state change
              changeTopAddMode={this.props.changeTopAddMode}
              changeTopShowChildMode={this.props.changeTopShowChildMode}
              changeTopChangeMode={this.props.changeTopChangeMode}
              changeTopDeleteMode={this.props.changeTopDeleteMode}
              changeTopMoreViewMode={this.props.changeTopMoreViewMode}
              // Ripple state change
              changeChildChangeMode={this.props.changeChildChangeMode}
              changeChildRipple={this.props.changeChildRipple}
              changeRippleStatePending={this.props.changeRippleStatePending}
              changeChildDeleteMode={this.props.changeChildDeleteMode}
              changeChildMoreViewMode={this.props.changeChildMoreViewMode}
              // Submit child ripple
              postChildRipple={this.props.postChildRipple}
              addRippleStatePending={this.props.addRippleStatePending}
            />
          </React.Fragment>
        )
      })
    }
    return (
      <React.Fragment>
        <RippleTopInput
          postTopRipple={this.props.postTopRipple}
          addRippleStatePending={this.props.addRippleStatePending}
        />
        <div className="ripple-unit-container">{showTopRipple(this.props.topRipple)}</div>
      </React.Fragment>
    )
  }
}

export default withRouter(Ripple)
