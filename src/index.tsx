import * as React from "react";

import History from "./history";
import context, { IContext } from "./context";

const history = new History({});

interface IRouterState {
  currentPath: string;
}
export class Router extends React.Component<{}, IRouterState> {
  state = {
    currentPath: window.location.pathname
  };

  constructor(props: {}) {
    super(props);

    history.bindPathChange(this.handlePathChange);
  }

  handlePathChange = (path: string): void => {
    this.setState({ currentPath: path });
  };

  render(): JSX.Element {
    const { Provider } = context;
    const { currentPath } = this.state;

    return (
      <Provider value={{ currentPath, history }}>
        {this.props.children}
      </Provider>
    );
  }
}

interface IRouteProps {
  path: string;
}
export class Route extends React.Component<IRouteProps> {
  render(): JSX.Element {
    const { Consumer } = context;
    const { path, children } = this.props;

    return (
      <Consumer>
        {(value: IContext): {} | null | undefined => {
          return path === value.currentPath ? children : null;
        }}
      </Consumer>
    );
  }
}

export class Switch extends React.Component {
  render(): JSX.Element {
    return <div>Switch{this.props.children}</div>;
  }
}

interface ILinkProps {
  to: string;
}

export class Link extends React.Component<ILinkProps> {
  handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    const { to } = this.props;
    e.preventDefault();

    history.push(to);
  };

  render(): JSX.Element {
    const { children } = this.props;

    return (
      <a href="#" onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
