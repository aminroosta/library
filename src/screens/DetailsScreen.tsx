import React, {Component} from 'react';
import {Book} from '../models/Book'
import {Dimensions} from 'react-native';
import {inject, observer} from 'mobx-react';
import {colors, defaultNavigatorStyle, HEIGHT} from '../common/style';
import styled from 'styled-components/native';
import DetailsHeader from '../components/DetailsHeader';
import Summary from '../components/Summary'; 

const BookDetailsScreen
  :  React.StatelessComponent<{details: Book, style?: object}>
  = ({details, style}) => {
  const {ScrollWrapper, Header, Summary} = styles;
  const review = details.review;
  const description = review && review.description;
  const comments = review && review.comments;
  return (
    <ScrollWrapper style={style}>
      <Header />
      <Summary value={description} />
    </ScrollWrapper>
  );
};

const units = {
  navbar: defaultNavigatorStyle.navBarHeight,
  header: (HEIGHT * 0.35 | 0) + defaultNavigatorStyle.navBarHeight,
};

const styles = {
  ScrollWrapper: styled.ScrollView.attrs({bounces: false})`
    flex: 1;
    background-color: ${colors.background};
  `,
  Header: styled(DetailsHeader)`
    padding-top: ${units.navbar}px;
    height: ${units.header}px;
  `,
  Summary: styled(Summary)`
    padding: 0 15px;
  `
}

export default inject('details')(observer(BookDetailsScreen));
