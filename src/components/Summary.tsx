import React, {Component} from 'react';
import styled from 'styled-components/native';
import {observer, inject} from 'mobx-react';
import {colors, fontFamily} from '../common/style';
import HTMLView from './HtmlView';

const createSummary = 
  ({Wrapper, Title, Content}) => 
  ({ value, style }: {value?: string, style?: object}) => (
     <Wrapper style={style}>
        <Title>Synopsis</Title>
        <Content value={value} />
     </Wrapper>
);

const Summary = createSummary({
  Wrapper: styled.View
  `
  `,
  Title: styled.Text
  `
    font-size: 16px;
    font-weight: bold;
    background-color: ${colors.background};
    padding-bottom: 8px;
  `,
  Content: styled(HTMLView) 
  `
  `
});

export default observer(Summary);
