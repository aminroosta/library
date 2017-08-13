import { Navigation } from 'react-native-navigation';
import HomeTabScreen from './screens/HomeTabScreen.js';

Navigation.registerComponent('library.HomeTabScreen', () => HomeTabScreen);

// start the app
Navigation.startTabBasedApp({
	tabs: [
		{
			label: 'Home',
			screen: 'library.HomeTabScreen', // this is a registered name for a screen
			icon: require('../img/main.png'),
			title: 'Home Screen'
		},
	]
});

// AppRegistry.registerComponent('library', () => library);
