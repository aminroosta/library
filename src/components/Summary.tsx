import React, {Component} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {observer, inject} from 'mobx-react';
import {colors, fontFamily, HEIGHT} from '../common/style';
import HTMLView from './HtmlView';

import LinearGradient from 'react-native-linear-gradient';

const createSummary = 
  ({Wrapper, Title, Content, ReadMore, Collapse}) => 
  ({ value, style }: {value?: string, style?: object}) => (
     <Wrapper style={style}>
        <Title>Synopsis</Title>
        <Content value={value} />
        <ReadMore />
     </Wrapper>
);


const Summary = createSummary({
  Wrapper: styled.View
  `
    max-height: ${HEIGHT*0.25}px;
    overflow: hidden;
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
  `,
  ReadMore: styled(LinearGradient).attrs({colors: ['transparent', 'rgba(255,255,255,1)']})`
    position: absolute; 
    height: 70%;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  Collapse: styled.View
  ``
});

export default observer(Summary);
