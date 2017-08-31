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
import {inject, observer} from 'mobx-react';
import {colors, defaultNavigatorStyle} from '../common/style';
import styled from 'styled-components/native';
import DetailsHeader from '../components/DetailsHeader';
import Summary from '../components/Summary';


const createBookDetailsScreen =
  ({ScrollWrapper, Header, Summary}) => 
  ({details, style} : {details: Book, style?: object}) => {
    const review = details.review;
    const description = review && review.description;
    return (
      <ScrollWrapper style={style}>
        <Header />
        <Summary value={description} />
      </ScrollWrapper>
    );
};

const HEIGHT = Dimensions.get('window').height;
const units = {
  navbar: defaultNavigatorStyle.navBarHeight,
  header: (HEIGHT * 0.35 | 0) + defaultNavigatorStyle.navBarHeight,
};

const BookDetailsScreen =  createBookDetailsScreen({
  ScrollWrapper: styled.ScrollView.attrs({bounces: false})
  `
    flex: 1;
    background-color: ${colors.background};
  `,
  Header: styled(DetailsHeader)
  `
    padding-top: ${units.navbar}px;
    height: ${units.header}px;
  `,
  Summary: styled(Summary)
    `
      padding: 0 15px;
    `
});

export default inject('details')(observer(BookDetailsScreen));
