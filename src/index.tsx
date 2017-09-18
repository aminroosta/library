import { Navigation } from 'react-native-navigation';
import { registerComponents } from './screens/screens';
import * as constants from './common/constants';
import {colors, defaultNavigatorStyle} from './common/style';

registerComponents();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Browse',
      screen: constants.BROWSE_SCREEN.screen, // this is a registered name for a screen
      icon: require('../img/browse.png'),
      title: 'Browse Screen',
      navigatorStyle:  defaultNavigatorStyle,
    },
    {
      label: 'Home',
      screen: constants.DETAILS_SCREEN.screen, // this is a registered name for a screen
      icon: require('../img/home.png'),
      title: 'Book Details',
      navigatorStyle:  defaultNavigatorStyle,
    },
  ],
  tabsStyle: {
    tabBarButtonColor: colors.unselected,
    tabBarSelectedButtonColor: colors.selected,
    tabBarBackgroundColor: colors.background,
  },
  appStyle: {
    orientation: 'portrait',
  },
  navigatorStyle:  defaultNavigatorStyle,
}); 


