import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions
} from 'react-native';
import {triangle} from '../common/style';

const HeaderBackground = ({uri, style = null}) => (
   <View
      style={[styles.container, style]}>

      <Image
         source={{uri: uri, cache: 'force-cache'}}
         style={styles.background}
         blurRadius={2} />
      <View style={[styles.triangleShape, styles.triangle]} />
   </View>
);

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const CONTAINER_HEIGHT = HEIGHT/3.0;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    height: CONTAINER_HEIGHT
  },
  background: {
     width: `100%`,
     position: 'absolute',
     aspectRatio: 1,
     resizeMode: 'cover'
  },
  triangleShape: triangle({width: WIDTH, height: CONTAINER_HEIGHT/3.0}),
  triangle: {
     position: 'absolute',
     bottom: -1
  }
});

export default HeaderBackground;
