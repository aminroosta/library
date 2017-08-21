import React, {Component} from 'react';
import {Book} from '../models/Book';
import {inject, observer} from 'mobx-react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import {colors, fontFamily} from '../common/style';
import StarsRating from './StarsRating';

@inject('details')
@observer
export default class DetailsHeader extends Component<{details?: Book}> {
  render() {
    const {details} = this.props;
    const {thumbnail, authors, categories, title, review} = details;
    let rating = review ? review.ratingAverage : 0;
    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{uri: thumbnail }}/>
        <View style={styles.info}>
          <Text style={styles.title}> {title}-{rating} </Text>
          <Text style={styles.subtitle}> {`by ${authors.join(', ')}`} </Text>
          <Text style={styles.subtitle}> {categories.join(', ')} </Text>
          <StarsRating rating={rating} style={styles.starsRating} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: '15%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily:  fontFamily,
    color: colors.background
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    fontFamily:  fontFamily,
    color: colors.background
  },
  info: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  thumbnail: {
    flex: 1,
    marginLeft: 20,
    height: '60%',
    aspectRatio: 0.7,
    resizeMode: 'stretch',
  },
  starsRating: {
    marginTop: 5
  }
});
