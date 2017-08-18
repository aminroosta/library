import React, {Component} from 'react';
import {BookType} from '../models/Book';
import {inject, observer} from 'mobx-react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import {colors} from '../common/style';

@inject('details')
@observer
export default class DetailsHeader extends Component<{details?: BookType}> {
  render() {
    const {thumbnail, authors, categories, title } = this.props.details;
    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{uri: thumbnail }}/>
        <View style={styles.info}>
          <Text style={styles.title}> {title} </Text>
          <Text style={styles.subtitle}> {`by ${authors.join(', ')}`} </Text>
          <Text style={styles.subtitle}> {categories.join(', ')} </Text>
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
    paddingTop: '20%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
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
  }
});
