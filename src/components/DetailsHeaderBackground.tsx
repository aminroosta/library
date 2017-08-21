import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions
} from 'react-native';
import {colors} from '../common/style';

const HeaderBackground = ({uri, children, style = {}}) => (
   <View
      style={[styles.container, style]}>
      <Image
         source={{uri: uri, cache: 'force-cache'}}
         style={styles.background}
         blurRadius={3} />
      <View style={styles.rectangle} />
      { children }
   </View>
);

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    minHeight: HEIGHT*0.33,
    top: -20,
    marginBottom: -20,
  },
  background: {
    position: 'absolute',
    width: `100%`,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  rectangle: {
    position: 'absolute',
    bottom: '-20%',
    width: '120%',
    height: '55%',
    backgroundColor: colors.background,
    transform: [
      { rotate: '10deg' },
      { translateX: WIDTH*-0.1 }
    ]
  }
});

export default HeaderBackground;
