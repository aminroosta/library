import React, {Component} from 'react';
import {Animated} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {observer, inject} from 'mobx-react';
import {observable, action, computed} from 'mobx';
import {colors, fontFamily, HEIGHT} from '../common/style';
import HTMLView from './HtmlView';
import Collapsible from 'react-native-collapsible';
import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';

const createButton = 
  ({Wrapper, Text}) =>
  ({text, onPress, style} : {text:string, onPress?: Function, style?: object}) => (
    <Wrapper onPress={onPress} style={style} onLayout={a => {}}>
      <Text>{text}</Text>
    </Wrapper>
);

const Button = createButton({
  Wrapper: styled.TouchableHighlight.attrs({underlayColor: colors.buttonDarker})`
    background-color: ${colors.button};
    padding-horizontal: 18px;
    padding-vertical: 8px;
    border-radius: 17px;
  `,
  Text: styled.Text``
});

@observer
export default class Summary extends Component<{value?: string, style?: object}> {
  state = new state();
  render() {
    const a : Animatable.View = null;
    const {Wrapper, Title, Content, Shadow, Button} = styles;
    const {value, style} = this.props;
    const {collapsed, buttonText, collapsedHeight, toggle} = this.state;
    const showShadow = value && collapsed;
    return (
     <Wrapper style={style} easing={g => Math.pow(1.7, g)} transition='opacity'>
        <Title>Synopsis</Title>
        <Collapsible collapsed={collapsed} collapsedHeight={collapsedHeight} easing={'linear'} duration={100}>
          <Content value={value} />
        </Collapsible>
        {showShadow && <Shadow />}
        {value && <Button onPress={toggle} text={buttonText} /> }
     </Wrapper>
    );
  }
} 

class state {
  @observable collapsed = true;
  collapsedHeight = HEIGHT*0.25 | 0;

  @computed get buttonText() {
    return this.collapsed ? 'Read More' : 'Collapse';
  };

  @action.bound toggle() {
    this.collapsed = !this.collapsed;
  };
};

const styles = {
  Wrapper: styled(Animatable.View)`
    overflow: hidden;
    transform: rotate(7deg);
  `,
  Title: styled.Text`
    font-size: 16px;
    font-weight: bold;
    background-color: ${colors.background};
    padding-bottom: 8px;
  `,
  Content: styled(HTMLView)`
    padding-bottom: 40px;
  `,
  Shadow: styled(LinearGradient).attrs({
    colors: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)'],
    locations:[0, 0.8, 1]
  })`
    position: absolute;
    height: 70%;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  Button: styled(Button)`
    position: absolute;
    align-self: center;
    bottom: 0;
  `
};

