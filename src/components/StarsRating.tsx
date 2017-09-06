import React, {Component} from 'react';
import {colors} from '../common/style';
import styled, { StyledInterface } from 'styled-components/native';
const starIcon = require('../../img/star.png');

const Star
  : React.StatelessComponent<{rating: number, inx: number}>
  = ({rating, inx}) => {

  const { Wrapper,  OverlayWrapper } = starStyles;
  const { StarImage } = starStyles as any;
  return (
    <Wrapper>
      { rating >= inx ? <StarImage full /> : <StarImage /> }
      { rating > inx -1 && rating < inx  &&
        <OverlayWrapper rate={rating+1 -inx}>
          <StarImage full />
        </OverlayWrapper>  
      }
    </Wrapper>
  );
}

const starStyles = {
  Wrapper: styled.View`
    margin-left: 2px;
  `,
  StarImage: styled.Image.attrs({ source: starIcon })`
    width: 20px;
    height: 20px;
    tint-color: ${(p: {full?: boolean}) => (p.full ? colors.button : colors.background)};
  `,
  OverlayWrapper: styled.View`
    border-width: 0;
    overflow: hidden;
    position: absolute;
    height: 20px;
    width: ${(p: {rate: number}) => `${p.rate*20 | 0}px`};
  `
};

const SartsRating
  : React.StatelessComponent<{rating: number, style?: object}>
  = ({rating, style}) => {
  const {Wrapper, Star} = styles;
  return (
    <Wrapper style={style}>
      <Star rating={rating} inx={1} />
      <Star rating={rating} inx={2} />
      <Star rating={rating} inx={3} />
      <Star rating={rating} inx={4} />
      <Star rating={rating} inx={5} />
    </Wrapper>
  );
}

const styles = {
  Wrapper: styled.View `
    flex-direction: row;
    background-color: transparent;
    align-items: flex-start;
  `,
  Star: Star
};


export default SartsRating;
