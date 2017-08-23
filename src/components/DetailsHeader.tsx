import React, {Component} from 'react';
import styled from 'styled-components/native';
import {Book} from '../models/Book';
import {observer} from 'mobx-react';
import {colors, fontFamily} from '../common/style';
import StarsRating from './StarsRating';

const createDetailsHeader = 
  ({Wrapper, ThumbnailImage, InfoWrapper, Title, Subtitle, StarsRating}) => 
  ({ details, style }: {details: Book, style?: object}) => {

   const  { thumbnail, authors, categories, title, review } = details;
   return (
     <Wrapper style={style}>
      <ThumbnailImage source={{uri: thumbnail}} />
      <InfoWrapper>
        <Title> {title} </Title>
        <Subtitle> {`by ${authors.join(', ')}`} </Subtitle>
        <Subtitle> {categories.join(', ')} </Subtitle>
        <StarsRating rating={review ? review.ratingAverage : 0} />
      </InfoWrapper>
     </Wrapper>
  );
}

const DetailsHeader = createDetailsHeader({
  Wrapper: styled.View
  `
    flex: 1;
    background-color: transparent;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 10%;
  `,
  ThumbnailImage: styled.Image
  `
    flex: 1;
    margin-left: 15px;
    height: 60%;
    aspect-ratio: 0.7;
    resize-mode: stretch;
  `,
  InfoWrapper: styled.View
  `
    flex: 2;
    flex-direction: column;
    justify-content: flex-start;
  `,
  Title:  styled.Text
  `
    font-size: 20px;
    font-weight: bold;
    font-family:  ${fontFamily};
    color: ${colors.background};
  `,
  Subtitle: styled.Text
  `
    font-size: 14px;
    opacity: 0.8;
    font-family:  ${fontFamily};
    color: ${colors.background};
  `,
  StarsRating: styled(StarsRating)
  `
    margin-top: 5;
  `
});

export default observer(DetailsHeader);
