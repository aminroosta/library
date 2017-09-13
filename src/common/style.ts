import {Platform, Dimensions} from 'react-native';

export const colors = {
  background: '#FFFFFF',
  selected: '#DA0457',
  unselected: '#D8D8D8',
  deactiveText: '#8e8e93',
  button: '#FFBD30',
  buttonDarker: '#E6A417',
  black: '#000000',
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const navBarHeight = 50;
export const units = {
  windowHeight,
  windowWidth,
  navBarHeight,
  detailsHeaderHeight: (windowHeight * 0.35 | 0) + navBarHeight,
};

export const defaultNavigatorStyle = {
  navBarHidden: true,
  navBarHeight: units.navBarHeight,
  drawUnderNavBar: true,
  navBarTransparent: true,
  navBarTranslucent: true,
  navBarTextColor: colors.background,
  navBarButtonColor: colors.background,
};

export const fontFamily = Platform.OS === 'ios' ? 'System' : 'Roboto';

