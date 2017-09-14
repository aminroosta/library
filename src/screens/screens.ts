import {
  BROWSE_SCREEN,
  DETAILS_SCREEN,
} from 'src/common/constants';
import { Navigation } from 'react-native-navigation';
import Provider from 'src/common/mobx-provider';
import BrowseScreen from './browse/browse.ui';
import DetailsScreen from 'src/screens/details/details.ui';
import BrowseStore from 'src/screens/browse/browse.store';
import DetailsStore from 'src/screens/details/details.store';

export const Stores = {
   details: DetailsStore,
   browse: new BrowseStore,
};
export type Stores = typeof Stores;

export const registerComponents = () => {
   Navigation.registerComponent(BROWSE_SCREEN.screen, () => BrowseScreen, Stores, Provider);
   Navigation.registerComponent(DETAILS_SCREEN.screen, () => DetailsScreen, Stores, Provider);
};
