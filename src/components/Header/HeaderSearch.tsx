import * as React from 'react';

interface Props {
  onChange: Function;
  messageToAdminMessage: string;
  messageToAdminPending: boolean;
  messageToAdminError: boolean;
}

interface Input {
  target: HTMLInputElement;
}

class HeaderSearch extends React.Component<Props> {
  public onChange = (e: Input) => {
    this.props.onChange(e.target.value);
  };
  public render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.messageToAdminMessage}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default HeaderSearch;
