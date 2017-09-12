import React, { Component } from 'react';
import styled from 'styled-components/native';
import { colors } from '../common/style';
import {Text} from 'react-native';
import cheerio from 'cheerio-without-node-native';

const mapNode = (node: CheerioElement, tags: object, keys: object) => {
  if (!node) return node;
  if (node.type === 'text')
    return node.nodeValue;
  const Tag = tags[node.tagName];
  const childs = node.children && node.children.map(element => mapNode(element, tags, keys));

  keys[node.tagName] += 1;
  const key = `${node.tagName}-${keys[node.tagName]}`;
  return (
    <Tag key={key}>
    {childs}
    </Tag>
  );
};

const HTMLView
  : React.StatelessComponent<{value:string, style?: object}>
  = ({value, style}) => {
  const {P, B, I, Li, Br, A, Div, Wrapper} = styles;
  const keys = {p: 0, b: 0, li: 0, br: 0, a: 0, i: 0, div: 0, root: 0};
  const tags = {p: P, b: B, li: Li, br: Br, a: A, i: I, div: Div, root: Div};

  let Content = (<Text>loading ...</Text>);

  if (value) {
    const $ : CheerioStatic = cheerio.load(value);
    Content = mapNode($.root().get(0), tags, keys);
  }

  return (
    <Wrapper style={style}>
      {Content}
    </Wrapper>
  );
};

const styles = {
  A: styled.Text `
    color: skyblue; 
  `,
  B: styled.Text`
    font-weight: bold;
  `,
  Div: styled.Text`
  `,
  I: styled.Text`
    font-style: italic;
  `,
  Wrapper: styled.View`
    background-color: ${colors.background};
  `,
  Br: () => (<Text>{`\n`}</Text>),
  P:  ({key, children}) => (<Text key={key}>{children}{`\n`}</Text>),
  Li: ({key, children}) => (<Text key={key}>{children}{`\n`}</Text>),
};

export default HTMLView;
