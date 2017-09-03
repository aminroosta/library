import React, {Component} from 'react';
import {Book} from '../models/Book'
import {Dimensions} from 'react-native';
import {inject, observer} from 'mobx-react';
import {colors, defaultNavigatorStyle, HEIGHT} from '../common/style';
import styled from 'styled-components/native';
import DetailsHeader from '../components/DetailsHeader';
import Summary from '../components/Summary';
import Interactable from 'react-native-interactable';
import {Text} from 'react-native';


let ins : React.Component<Interactable.IInteractableView, {}> = null;
const createBookDetailsScreen =
  ({ScrollWrapper, Header, Summary}) => 
  ({details, style} : {details: Book, style?: object}) => {
    const review = details.review;
    const description = review && review.description;
    return (
      <ScrollWrapper style={style}>
        <Header />
        <Summary value={description} />

        <Interactable.View ref={i => { ins = i;}}
          horizontalOnly={true}
          style={{width: '100%'}}
          snapPoints={[{x: 0}, {x: -200}]}>

          <Text onPress={() => ins.snapTo({index:1})}
          style={{
            fontSize: 16, fontWeight: 'bold', backgroundColor: colors.button,
            paddingLeft: 15, paddingBottom: 8
          }}>Text</Text>

        </Interactable.View>

      </ScrollWrapper>
    );
};

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
