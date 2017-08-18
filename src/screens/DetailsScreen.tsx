import React, {Component} from 'react';
import {BookType} from '../models/Book'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  Image,
  Dimensions
} from 'react-native';
import {defaultNavigatorStyle} from '../common/style';
import {inject, observer} from 'mobx-react';
import {colors} from '../common/style';
import DetailsHeader from '../components/DetailsHeader';

@inject('details')
@observer
export default class BookDetailsScreen extends Component<{details: BookType}> {
   static navigatorStyle =  defaultNavigatorStyle;
   render()  {
      const details = this.props.details;
      return (
         <View style={styles.container}>
            <DetailsHeader
              style={styles.header}
              uri={details.thumbnail} />
            <Image style={styles.thumbnail} source={{uri: details.smallThumbnail }}/>
         </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.unselected,
  },
  header: {
    height: '44%',
  },
  thumbnail: {
    height: 200,
    aspectRatio: 0.7,
    resizeMode: 'stretch',
    top: -160,
    left: -100
  }
});
