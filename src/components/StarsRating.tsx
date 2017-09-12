import React, {Component} from 'react';
import {colors} from '../common/style';
import styled from 'styled-components/native';
import Stars from './Stars';

const SartsRating
: React.StatelessComponent<{rating: number, style?: object}>
= ({rating, style}) => (
  <Wrapper style={style}>
    <Stars rating={rating} inx={1} />
    <Stars rating={rating} inx={2} />
    <Stars rating={rating} inx={3} />
    <Stars rating={rating} inx={4} />
    <Stars rating={rating} inx={5} />
  </Wrapper>
);

const // views
Wrapper = styled.View `
  flex-direction: row;
  background-color: transparent;
  align-items: flex-start;
`;

export default SartsRating;
