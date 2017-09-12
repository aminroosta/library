import React, {Component} from 'react';
import styled from 'styled-components/native';
import {colors, WIDTH, HEIGHT} from 'src/common/style';

const DetailsHeaderBackground
: React.StatelessComponent<{uri: string, children?: any, style?: object}>
= ({uri, children, style}) => (
  <Wrapper style={style}>
    <BackgroundImage source={{uri, cache: 'force-cache'}} />  
    <Rectangle/>
    {children}
  </Wrapper>
);

const Wrapper = styled.View`
  width: 100%;
  overflow: hidden;
  min-height: ${HEIGHT * 0.33};
  top: -20px;
  margin-bottom: -20px;
`;
const BackgroundImage = styled.Image.attrs({blurRadius: 1})`
  position: absolute;
  width: 100%;
  aspect-ratio: 1;
  resize-mode: cover;
`;
const Rectangle = styled.View`
  position: absolute;
  bottom: -20%;
  width: 120%;
  height: 55%;
  background-color: ${colors.background};
  transform: rotate(10deg) translateX(${WIDTH * -0.1}px);
`;

export default DetailsHeaderBackground;
