import {Platform, Dimensions} from 'react-native';

export const colors = {
  background: '#FFFFFF',
  selected: '#DA0457',
  unselected: '#D8D8D8',
  button: '#FFBD30',
  buttonDarker: '#E6A417',
  black: '#000000',
};

export const defaultNavigatorStyle = {
  navBarHidden: true,
  navBarHeight: 50,
  drawUnderNavBar: true,
  navBarTransparent: true,
  navBarTranslucent: true,
  navBarTextColor: colors.background,
  navBarButtonColor: colors.background,
};

export const fontFamily = Platform.OS === 'ios' ? 'System' : 'Roboto';
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
