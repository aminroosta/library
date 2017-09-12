import React, {StatelessComponent} from 'react';
import {colors} from '../common/style';
import styled, { StyledInterface } from 'styled-components/native';
const starIcon = require('../../img/star.png');

const Star
: React.StatelessComponent<{rating: number, inx: number}>
= ({rating, inx}) => (
  <Wrapper>
    { rating >= inx ? <StarImage full /> : <StarImage /> }
    { rating > inx -1 && rating < inx  &&
      <OverlayWrapper rate={rating+1 -inx}>
        <StarImage full />
      </OverlayWrapper>  
    }
  </Wrapper>
);

const // views
Wrapper = styled.View`
  margin-left: 2px;
` as any,
StarImage = styled.Image.attrs({ source: starIcon })`
  width: 20px;
  height: 20px;
  tint-color: ${(p: {full?: boolean}) => (p.full ? colors.button : colors.background)};
` as any,
OverlayWrapper = styled.View`
  border-width: 0;
  overflow: hidden;
  position: absolute;
  height: 20px;
  width: ${(p: {rate: number}) => `${p.rate*20 | 0}px`};
`;

export default Star;
