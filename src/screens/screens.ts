import { Navigation } from 'react-native-navigation';
import BrowseScreen from './BrowseScreen';
import DetailsScreen from './DetailsScreen';
import Provider from '../common/mobx-provider';
import * as constants from '../common/constants';
import {someBook} from '../models/models';

const Stores = {
   details:  someBook,
}

export const registerComponents = () => {
   Navigation.registerComponent(constants.BROWSE_SCREEN.screen, () => BrowseScreen, Stores, Provider);
   Navigation.registerComponent(constants.DETAILS_SCREEN.screen, () => DetailsScreen, Stores, Provider);
};
