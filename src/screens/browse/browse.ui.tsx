import React, {Component, StatelessComponent} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'src/common/utils';
import {Stores} from 'src/screens/screens';
import BrowseHeader from 'src/screens/browse/browse-header.ui';

const Browse
: StatelessComponent<{
  onSearch: (text:string) => void,
  onAddManualy: Function,
  query: string,
  suggestions: string[],
  isLoading: boolean,
}>
= ({onSearch, onAddManualy, query, suggestions, isLoading}) => (
  <Container>
    <BrowseHeader />
    <Query
      onChangeText={onSearch}
      value={query}
    />
    <Button
      onPress={() => onSearch(query)}
      accessibilityLabel="Search"
     />
    <Instructions> To get started, enter book title and press Search! </Instructions>
    <Instructions>
      {JSON.stringify(suggestions)}
    </Instructions>
  </Container>
);

export default connect(
  ({browse} : Stores) => ({
    onSearch: query => browse.query = query,
    onAddManualy: () => console.warn('onAddManualy'),
    query: browse.query,
    suggestions: browse.suggestions,
    isLoading: false,
  }),
)(Browse);

const Container = styled.ScrollView.attrs({
  keyboardDismissMode: 'on-drag',
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
} as any)`
  flex: 1;
  background-color: #F5FCFF;
`;
const Query = styled.TextInput`
  align-self: stretch;
  height: 40px;
  margin: 0 20px;
`;
const Button = styled.Button.attrs({title: 'Search'})`
  flex: 1;
  color: #841584;
` as any;
const Instructions = styled.Text`
  text-align: center;
  color: #333333;
  margin-bottom: 5px;
`; 
