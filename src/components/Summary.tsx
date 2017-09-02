import React, {Component} from 'react';
import {Animated, Text, LayoutChangeEvent} from 'react-native';
// import styled from 'styled-components/native';
import {observer, inject} from 'mobx-react';
import {observable, action, computed} from 'mobx';
import {colors, fontFamily, HEIGHT} from '../common/style';
import {styled} from '../common/utils';
import HTMLView from './HtmlView';

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
export default class Summary extends Component<{value?: string, expanded?: boolean, style?: object}> {
  state = new state();
  render() {
    const {Wrapper, Title, Content, Shadow, Button} = views;
    const {value, style} = this.props;
    const {expanded, buttonText, interpolatedHeight, toggle, onLayout} = this.state;
    const showShadow = value && !expanded;
    return (
     <Wrapper style={[style, {maxHeight: interpolatedHeight}]} onLayout={onLayout}>
        <Title>Synopsis</Title>
        <Content value={value} />
        {showShadow && <Shadow />}
        {value && <Button onPress={toggle} text={buttonText} /> }
     </Wrapper>
    );
  }
} 

class state {
  @observable expanded = false;

  progress = new Animated.Value(0);

  @observable maxHeight = HEIGHT*0.25 | 0;
  minHeight = HEIGHT*0.25 | 0;

  @action.bound
  onLayout(event: LayoutChangeEvent) {
    this.maxHeight = event.nativeEvent.layout.height;
  }
  @computed get interpolatedHeight() {
    return this.progress.interpolate({ inputRange: [0, 1], outputRange: [this.minHeight, this.maxHeight]});
  }

  @computed get buttonText() {
    return this.expanded ? 'Collapse' : 'Read More';
  };

  @action.bound toggle() {
    this.expanded = !this.expanded;
    Animated.spring(this.progress, {
      toValue: this.expanded ? 1 : 0
    }).start();
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
  Content: styled(HTMLView)({}),
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
  Button: styled(Button)({
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  })
};

