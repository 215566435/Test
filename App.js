import React from 'react';
import { Platform } from 'react-native';
import codePush from "react-native-code-push";
import AustGoApp from './src';
import SplashScreen from 'react-native-splash-screen';

class App extends React.Component {
  componentDidMount() {
    // SplashScreen.hide();
    if (Platform.OS === 'ios') {
      SplashScreen.hide();
    }
    const key = Platform.OS === 'ios' ? 'KpO0hcjaOTrc4XwWYqOfE9yk560m9753d84a-48fc-4420-83eb-7d61a334bad6' : 'IO-yMj-XqW6ZFzNDlNW7xuQpVOSb9753d84a-48fc-4420-83eb-7d61a334bad6'
    // CodePush.notifyApplicationReady()
    codePush.sync({
      deploymentKey: key,
    }, (status) => {
      if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
        // SplashScreen.hide();
      }
      if (status === codePush.SyncStatus.UP_TO_DATE) {
        // SplashScreen.hide();
      }
      if (status === codePush.SyncStatus.UNKNOWN_ERROR) {
        // SplashScreen.hide();
      }
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

