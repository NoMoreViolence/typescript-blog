import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import {
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

import RippleInputTop from 'lib/RippleInputTop'
import RippleTopRipple from 'lib/RippleTopRipple'

import './Ripple.css'
import { toast } from 'react-toastify'
import { AxiosPromise } from 'axios'

interface Props {
  // Ripple data
  topRipple: TopOrChildRippleState[]
  // Submit ripple state
  addRippleStatePending: boolean
  changeRippleStatePending: boolean
  deleteRippleStatePending: boolean
}

interface Method {
  // Ripple http fun
  rippleClear: () => void
  topRippleLoad: (value: GetTopRipples) => AxiosPromise<object>
  childRippleLoad: (value: GetChildRipples) => AxiosPromise<object>
  postTopRipple: (value: PostTopRipple) => AxiosPromise<object>
  postChildRipple: (value: PostChildRipple) => AxiosPromise<object>
  changeTopRipple: (value: PatchTopRipple) => AxiosPromise<object>
  changeChildRipple: (value: PatchChildRipple) => AxiosPromise<object>
  deleteTopRipple: (value: DeleteTopRipple) => AxiosPromise<object>
  deleteChildRipple: (value: DeleteChildRipple) => AxiosPromise<object>
  // Ripple state fun: top
  changeTopAddMode: (value: number) => void
  changeTopShowChildMode: (value: number) => void
  changeTopChangeMode: (value: number) => void
  changeTopDeleteMode: (value: number) => void
  changeTopMoreViewMode: (value: number) => void
  // Ripple staet fun: child
  changeChildChangeMode: (value: ChildMode) => void
  changeChildDeleteMode: (value: ChildMode) => void
  changeChildMoreViewMode: (value: ChildMode) => void
}

interface State {
  topRippleLoaded: object
}

class Ripple extends React.Component<Props & Method & RouteComponentProps<any>, State> {
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
              changeTopRipple={this.props.changeTopRipple}
              changeTopDeleteMode={this.props.changeTopDeleteMode}
              deleteTopRipple={this.props.deleteTopRipple}
              changeTopMoreViewMode={this.props.changeTopMoreViewMode}
              // Ripple state change
              postChildRipple={this.props.postChildRipple}
              changeChildChangeMode={this.props.changeChildChangeMode}
              changeChildRipple={this.props.changeChildRipple}
              changeChildDeleteMode={this.props.changeChildDeleteMode}
              deleteChildRipple={this.props.deleteChildRipple}
              changeChildMoreViewMode={this.props.changeChildMoreViewMode}
              // State
              addRippleStatePending={this.props.addRippleStatePending}
              changeRippleStatePending={this.props.changeRippleStatePending}
              deleteRippleStatePending={this.props.deleteRippleStatePending}
            />
          </React.Fragment>
        )
      })
    }
    return (
      <React.Fragment>
        <RippleInputTop
          postTopRipple={this.props.postTopRipple}
          addRippleStatePending={this.props.addRippleStatePending}
        />
        <div className="ripple-unit-container">{showTopRipple(this.props.topRipple)}</div>
      </React.Fragment>
    )
  }
}

export default withRouter(Ripple)
