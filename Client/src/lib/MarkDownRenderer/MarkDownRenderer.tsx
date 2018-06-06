import * as React from 'react'

import './MarkDownRenderer.css'

import * as marked from 'marked'
import * as Prism from 'prismjs'

interface Props {
  markdown?: string
}
class MarkdownRender extends React.Component<Props> {
  public state = {
    html: ''
  }

  public renderMarkdown = () => {
    const { markdown } = this.props
    // if there is no markdown, throw empty string
    if (!markdown) {
      this.setState({ html: '' })
      return
    }
    this.setState({
      html: marked(markdown, {
        breaks: true, // enter => new line
        sanitize: true // ignore html in markdown
      })
    })
  }

  public async componentDidMount() {
    await this.renderMarkdown()
    await Prism.highlightAll()
  }

  public componentDidUpdate(prevProps: Props, prevState: { html: string }) {
    // if arkdown is changeed, call renderMarkdown
    if (prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown()
    }
    // if state is changed, run codeHighlighting
    if (prevState.html !== this.state.html) {
      Prism.highlightAll()
    }
  }

  public render() {
    const { html } = this.state

    // create html for rendering
    const markup = {
      __html: html
    }

    // inside html in dangerouslySetInnerHTML
    return <div className="markdown-render" dangerouslySetInnerHTML={markup} />
  }
}

export default MarkdownRender
