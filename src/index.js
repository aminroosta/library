import { Navigation } from 'react-native-navigation';
import { registerComponents } from './screens/index.js'
import * as constants from './common/constants.js';

registerComponents();

Navigation.startTabBasedApp({
	tabs: [
		{
			label: 'Home',
			screen: constants.DETAILS_SCREEN.screen, // this is a registered name for a screen
			icon: require('../img/home.png'),
			title: 'Book Details'
		},
		{
			label: 'Browse',
			screen: constants.BROWSE_SCREEN.screen, // this is a registered name for a screen
			icon: require('../img/browse.png'),
			title: 'Browse Screen'
		},
	],
   tabsStyle: {
      tabBarButtonColor: '#d8d8d8',
      tabBarSelectedButtonColor: '#da0457',
      tabBarBackgroundColor: '#ffffff'
   },
   appStyle: {
      orientation: 'portrait'
   },
}); 


