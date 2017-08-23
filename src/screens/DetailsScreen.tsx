import React, {Component} from 'react';
import {Book} from '../models/Book'
import {Review} from '../models/Review';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Animated,
  Image,
  Dimensions
} from 'react-native';
import {defaultNavigatorStyle} from '../common/style';
import { observable } from 'mobx';
import {inject, observer} from 'mobx-react';
import {colors} from '../common/style';
import HTMLView from 'react-native-htmlview';
import DetailsHeaderBackground from '../components/DetailsHeaderBackground';
import DetailsHeader from '../components/DetailsHeader';

@inject('details')
@observer
export default class BookDetailsScreen extends Component<{details: Book}> {
   static navigatorStyle =  defaultNavigatorStyle;
   render()  {
      const details = this.props.details;
      const review = details.review;
      const description = review && review.description.replace('<br>', '');
      return (
         <ScrollView style={styles.container}>
            <DetailsHeaderBackground style={styles.header} uri={details.thumbnail} >
                <DetailsHeader details={details} />
            </DetailsHeaderBackground>
            <Text style={{
              fontSize: 16, fontWeight: 'bold', backgroundColor: colors.background,
              paddingLeft: 15, paddingBottom: 8,
            }}>Synopsis</Text>
            <HTMLView
                value={description}
                style={{
                  backgroundColor: colors.background,
                  paddingHorizontal: 15
                }}
                addLineBreaks={false} />
         </ScrollView>
      );
   }
}

const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.unselected,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.unselected,
  },
  header: {
    height: HEIGHT * 0.35 | 0,
    borderWidth: 0,
  },
});
