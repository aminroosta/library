import React, {StatelessComponent} from 'react';
import styled from 'styled-components/native';
import StarsRating from 'src/components/StarsRating';
import DetailsHeaderBackground from 'src/screens/details/details-header-background.ui';
import {Stores} from 'src/screens/screens';
import {connect} from 'src/common/utils';
import {colors, fontFamily} from 'src/common/style';

const DetailsHeader
: StatelessComponent<{
  thumbnail: string,
  authors: string,
  categories: string,
  title: string,
  rating: number,
  style?: object,
}>
= ({thumbnail, authors, categories, title, rating, style}) => (
  <Background uri={thumbnail} style={style}>
    <Wrapper>
      <ThumbnailImage source={{uri: thumbnail}} />
      <InfoWrapper>
        <Title> {title} </Title>
        <Subtitle> {`by ${authors}`} </Subtitle>
        <Subtitle> {categories} </Subtitle>
        <UserRating rating={rating} />
      </InfoWrapper>
    </Wrapper>
  </Background>
);

export default connect(
  ({details} : Stores) => ({
    thumbnail: details.thumbnail,
    authors: details.authors.join(', '),
    categories: details.categories.join(', '),
    title: details.title,
    rating: details.review && details.review.ratingAverage || 0,
  }),
)(DetailsHeader);

const Background = styled(DetailsHeaderBackground)`
  border-width: 0;
`;
const Wrapper = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 10%;
`;
const ThumbnailImage = styled.Image`
  flex: 1;
  margin-left: 15px;
  height: 60%;
  aspect-ratio: 0.7;
  resize-mode: stretch;
`;
const InfoWrapper = styled.View`
  flex: 2;
  flex-direction: column;
  justify-content: flex-start;
`;
const Title =  styled.Text`
  font-size: 20px;
  font-weight: bold;
  font-family:  ${fontFamily};
  color: ${colors.background};
`;
const Subtitle = styled.Text`
  font-size: 14px;
  opacity: 0.8;
  font-family:  ${fontFamily};
  color: ${colors.background};
`;
const UserRating = styled(StarsRating)`
  margin-top: 5px;
`; 
