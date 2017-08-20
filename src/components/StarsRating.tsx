import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {colors} from '../common/style';
const starIcon = require('../../img/star.png');

const Star = ({rating, inx, size, style} : {rating: number, inx: number, size: number, style?: object}) => {
  const emptyIcon = {width: size, height: size, tintColor: colors.background};
  const fullIcon = {width: size, height: size, tintColor: colors.button};

  if(rating >= inx) { return (<Image source={starIcon} style={[ style, fullIcon ]} />); }
  if(rating <= inx-1) { return (<Image source={starIcon} style={[ style, emptyIcon ]} />); }

  const width = ((rating + 1 - inx) * size) | 0;

  return (
    <View style={style}>
      <Image source={starIcon} style={[emptyIcon]} />
      <View style={{ width: width, height: size, overflow: 'hidden', position: 'absolute'}}>
        <Image source={starIcon} style={[fullIcon]} />
      </View>
    </View>
 );
};

const StarsRating = ({rating, style} : {rating: number, style?: object}) => {
  return (
    <View style={[style, styles.container]}>
      <Star rating={rating} inx={1} size={20} style={styles.icon} />
      <Star rating={rating} inx={2} size={20} style={styles.icon} />
      <Star rating={rating} inx={3} size={20} style={styles.icon} />
      <Star rating={rating} inx={4} size={20} style={styles.icon} />
      <Star rating={rating} inx={5} size={20} style={styles.icon} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  icon: {
    marginLeft: 2,
  }
});

export default StarsRating;
