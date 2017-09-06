import React, {Component} from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import {colors} from '../common/style';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

type Props = {uri: string, children?: any, style?: object};

const DetailsHeaderBackground : React.StatelessComponent<Props> =
  ({uri, children, style}) => {
  const {Wrapper, BackgroundImage, Rectangle} = styles;
  return (
    <Wrapper style={style}>
      <BackgroundImage source={{uri: uri, cache: 'force-cache'}} />  
      <Rectangle/>
      {children}
    </Wrapper>
  );
}

const styles = {
  Wrapper: styled.View`
    width: 100%;
    overflow: hidden;
    min-height: ${HEIGHT*0.33};
    top: -20px;
    margin-bottom: -20px;
  `,
  BackgroundImage: styled.Image.attrs({blurRadius: 1})`
    position: absolute;
    width: 100%;
    aspect-ratio: 1;
    resize-mode: cover;
  `,
  Rectangle: styled.View`
    position: absolute;
    bottom: -20%;
    width: 120%;
    height: 55%;
    background-color: ${colors.background};
    transform: rotate(10deg) translateX(${WIDTH*-0.1}px);
  `
};

export default DetailsHeaderBackground;
