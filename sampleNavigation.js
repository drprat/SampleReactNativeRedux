Amplify.configure({ Auth: awsConfig });

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = createDrawerNavigator({
  userHome: UserHomeScreen,
  userProfile: UserProfileScreen,
  userSettings: UserSettingsScreen,
  signOut: SignOut,
}, {
    gesturesEnabled: false
  })

const drawerButton = (navigation) =>
  <Button icon={{ name: 'bars', type: 'font-awesome' }}
    style={{ color: 'white' }}
    onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.toggleDrawer()
      } else {
        navigation.toggleDrawer()
      }
    }
    } />
