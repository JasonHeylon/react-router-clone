import React from "react";

import { Route } from "react-router-clone";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Route />
      </div>
    );
  }
}

export default App;
