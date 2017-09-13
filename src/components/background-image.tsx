import React, {Component} from 'react';
import styled from 'styled-components/native';
import {colors, units} from 'src/common/style';

const BackgroundImage
: React.StatelessComponent<{uri: string, children?: any, style?: object}>
= ({uri, children, style}) => (
  <Wrapper style={style}>
    <Image source={{uri, cache: 'force-cache'}} />  
    <Rectangle/>
    {children}
  </Wrapper>
);

const Wrapper = styled.View`
  width: 100%;
  overflow: hidden;
  min-height: ${20};
  top: -20px;
  margin-bottom: -20px;
`;
const Image = styled.Image.attrs({blurRadius: 1})`
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
  transform: rotate(10deg) translateX(${units.windowWidth * -0.1}px);
`;

export default BackgroundImage;
