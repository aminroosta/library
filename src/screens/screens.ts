import {
  BROWSE_SCREEN,
  DETAILS_SCREEN
} from 'src/common/constants';
import { Navigation } from 'react-native-navigation';
import BrowseScreen from './browse/browse.ui';
import DetailsScreen from 'src/screens/details/details-screen.ui';
import Provider from 'src/common/mobx-provider';
import BrowseStore from 'src/screens/browse/browse.store';
import Book from 'src/models/Book';
import {latest} from '../api/database';

const [book1, book2, book3] = latest;
export const Stores = {
   details:  new Book(book1),
   browse: new BrowseStore,
};
export type Stores = typeof Stores;

export const registerComponents = () => {
   Navigation.registerComponent(BROWSE_SCREEN.screen, () => BrowseScreen, Stores, Provider);
   Navigation.registerComponent(DETAILS_SCREEN.screen, () => DetailsScreen, Stores, Provider);
};
