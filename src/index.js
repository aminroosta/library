import { Navigation } from 'react-native-navigation';
import BrowseScreen from './screens/BrowseScreen.js';
import BookDetailsScreen from './screens/BookDetailsScreen.js';

Navigation.registerComponent('library.BrowseScreen', () => BrowseScreen);
Navigation.registerComponent('library.BookDetailsScreen', () => BookDetailsScreen);

Navigation.startTabBasedApp({
	tabs: [
		{
			label: 'Home',
			screen: 'library.BookDetailsScreen', // this is a registered name for a screen
			icon: require('../img/home.png'),
			title: 'Book Details'
		},
		{
			label: 'Browse',
			screen: 'library.BrowseScreen', // this is a registered name for a screen
			icon: require('../img/browse.png'),
			title: 'Browse Screen'
		},
	],
   tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
      tabBarButtonColor: '#d8d8d8', // optional, change the color of the tab icons and text (also unselected)
      tabBarSelectedButtonColor: '#da0457', // optional, change the color of the selected tab icon and text (only selected)
      tabBarBackgroundColor: '#ffffff' // optional, change the background color of the tab bar
   },
   appStyle: {
      orientation: 'portrait'
   },
}); 
