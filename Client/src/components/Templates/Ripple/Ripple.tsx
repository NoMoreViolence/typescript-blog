import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import {
  TopOrChildRippleState,
  TopLoadState,
  ChildLoadState,
  GetTopRipples,
  GetChildRipples,
  PostTopRipple,
  PostChildRipple
} from 'store/modules/Ripple'

import RippleTopInput from 'lib/RippleTopInput'
import RippleTopRipple from 'lib/RippleTopRipple'

import './Ripple.css'
import { toast } from 'react-toastify'

interface Props {
  // Ripple data
  showRipple: TopOrChildRippleState[]
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
  // Ripple state fun
  changeTopAddMode: (value: number) => Promise<object>
  changeTopMoreMode: (value: number) => Promise<object>
  changeTopChangeMode: (value: number) => Promise<object>
  changeTopDeleteMode: (value: number) => Promise<object>
  changeTopMoreViewMode: (value: number) => Promise<object>
}

class Ripple extends React.Component<Props & RouteComponentProps<any>> {
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
              topID={object._id}
              childRipple={object.childRipple}
              // Ripple Loading
              topRippleLoad={this.props.topRippleLoad}
              childRippleLoad={this.props.childRippleLoad}
              // URL
              category={this.props.match.url.split('/')[1]}
              title={this.props.match.url.split('/')[2]}
              // Ripple number
              number={i}
              // Ripple state
              topAddMode={object.addMode}
              topMoreMode={object.moreMode}
              topChangeMode={object.changeMode}
              topDeleteMode={object.deleteMode}
              topMoreRippleView={object.moreRippleView}
              // Ripple state change
              changeAddMode={this.props.changeTopAddMode}
              changeMoreMode={this.props.changeTopMoreMode}
              changeChangeMode={this.props.changeTopChangeMode}
              changeDeleteMode={this.props.changeTopDeleteMode}
              changeMoreViewMode={this.props.changeTopMoreViewMode}
            />
          </React.Fragment>
        )
      })
    }
    return (
      <React.Fragment>
        <RippleTopInput
          submitTopRipple={this.props.postTopRipple}
          submitChildRipple={this.props.postChildRipple}
          topRippleLoad={this.props.topRippleLoad}
          childRippleLoad={this.props.childRippleLoad}
        />
        <div className="ripple-unit-container">{showTopRipple(this.props.showRipple)}</div>
      </React.Fragment>
    )
  }
}

export default withRouter(Ripple)
