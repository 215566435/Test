import React from 'react';
import codePush from "react-native-code-push";
import AustGoApp from './src'

class App extends React.Component {
  componentDidMount() {
    codePush.sync({
      deploymentKey: 'KpO0hcjaOTrc4XwWYqOfE9yk560m9753d84a-48fc-4420-83eb-7d61a334bad6'
    }, (status) => {

    })
  }
  render() {
    return (
      <AustGoApp />
    );
  }
}
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART
}

export default App = codePush(codePushOptions)(App);

