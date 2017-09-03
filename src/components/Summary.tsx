import React, {Component} from 'react';
import {Animated, Text, LayoutChangeEvent} from 'react-native';
// import styled from 'styled-components/native';
import {observer, inject} from 'mobx-react';
import {observable, action, computed} from 'mobx';
import {colors, fontFamily, HEIGHT} from '../common/style';
import {styled} from '../common/utils';
import HTMLView from './HtmlView';
import Collapsible from 'react-native-collapsible';

import LinearGradient from 'react-native-linear-gradient';

const createButton = 
  ({Wrapper, Text}) =>
  ({text, onPress, style} : {text:string, onPress?: Function, style?: object}) => (
    <Wrapper onPress={onPress} style={style} onLayout={a => {}}>
      <Text>{text}</Text>
    </Wrapper>
);

const Button = createButton({
  Wrapper: styled.TouchableHighlight({
    backgroundColor: colors.button,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 17,
  }, {underlayColor: colors.buttonDarker}),
  Text: Text,
});


@observer
export default class Summary extends Component<{value?: string, style?: object}> {
  state = new state();
  render() {
    const {Wrapper, Title, Content, Shadow, Button} = views;
    const {value, style} = this.props;
    const {collapsed, buttonText, collapsedHeight, toggle} = this.state;
    const showShadow = value && collapsed;
    return (
     <Wrapper style={style}>
        <Title>Synopsis</Title>
        <Collapsible collapsed={collapsed} collapsedHeight={collapsedHeight} easing={'linear'}>
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

const views = {
  Wrapper: styled.AnimatedView<{}>({
    overflow: 'hidden',
  }),
  Title: styled.Text({
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: colors.background,
    paddingBottom: 8
  }),
  Content: styled(HTMLView)({
    paddingBottom: 40,
  }),
  Shadow: styled(LinearGradient)({
    position: 'absolute',
    height: '70%',
    left: 0,
    right: 0,
    bottom: 0,
  },{
    colors: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)'],
    locations:[0, 0.8, 1]
  }),
  Button: styled(Button)<{}>({
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0
  })
};

