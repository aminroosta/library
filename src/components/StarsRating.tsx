import React, {Component} from 'react';
import {colors} from '../common/style';
import styled from 'styled-components/native';
const starIcon = require('../../img/star.png');

const createStar =
  ({Wrapper, Star, OverlayWrapper}) =>
  ({rating, inx} : {rating: number, inx: number}) => (

    <Wrapper>
      { rating >= inx ? <Star full /> : <Star /> }
      { rating > inx -1 && rating < inx  &&
        <OverlayWrapper rate={rating+1 -inx}>
          <Star full />
        </OverlayWrapper>  
      }
    </Wrapper>
);

const Star = createStar({
  Wrapper: styled.View
  `
    margin-left: 2px;
  `,
  Star: styled.Image.attrs({ source: starIcon })
  `
    width: 20px;
    height: 20px;
    tint-color: ${(p:any) => p.full ? colors.button : colors.background};
  `,
  OverlayWrapper: styled.View
  `
    border-width: 0;
    overflow: hidden;
    position: absolute;
    height: 20px;
    width: ${(p:any) => `${p.rate*20 | 0}px`};
  `
});

const createSartsRating =
  ({Wrapper, Star}) => 
  ({rating, style} : {rating: number, style: object}) => (

    <Wrapper style={style}>
      <Star rating={rating} inx={1} />
      <Star rating={rating} inx={2} />
      <Star rating={rating} inx={3} />
      <Star rating={rating} inx={4} />
      <Star rating={rating} inx={5} />
    </Wrapper>
);

const SartsRating = createSartsRating({
  Wrapper: styled.View
  `
    flex-direction: row;
    background-color: transparent;
    align-items: flex-start;
  `,
  Star: Star
});

export default SartsRating;
