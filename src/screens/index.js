import { Navigation } from 'react-native-navigation';
import BrowseScreen from './BrowseScreen.js';
import DetailsScreen from './DetailsScreen.js';
import Provider from '../common/mobx-provider.js';
import * as constants from '../common/constants.js';

const Stores = {
   amin: {
      name: 'amin',
      age: 27
   },
   reza: {
      name: 'reza',
      age: 26
   }
}

export const registerComponents = () => {
   Navigation.registerComponent(constants.BROWSE_SCREEN.screen, () => BrowseScreen, Stores, Provider);
   Navigation.registerComponent(constants.DETAILS_SCREEN.screen, () => DetailsScreen, Stores, Provider);
};
