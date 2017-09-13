import React, {StatelessComponent} from 'react';
import styled from 'styled-components/native';
import {connect} from 'src/common/utils';
import {Stores} from 'src/screens/screens';
import {colors} from 'src/common/style';

const BrowseHeader
: StatelessComponent<{
  onTextChange: (text:string) => void,
  text: string,
}>
= ({onTextChange, text}) => (
  <Container>
    <Query
      onChangeText={onTextChange}
      value={text}
    />
  </Container>
);

export default connect(
  ({browse} : Stores) => ({
    onTextChange: browse.setQuery,
    text: browse.query,
  }),
)(BrowseHeader);

const Container = styled.View`
  flex-grow: 0;
  width: 100%;
  justify-content: flex-end;
  min-height: 200px;
  background-color: ${colors.selected};
`;
const Query = styled.TextInput.attrs({
  autoCorrect: false,
  placeholder: 'Search',
  underlineColorAndroid: 'transparent',
  placeholderTextColor: colors.deactiveText,
})`
  align-self: stretch;
  height: 40px;
  margin: 0 20px;
  background-color: ${colors.background};
  border-radius: 5px;
  height: 38px;
  margin: 10px 20px;
  text-align: center;
`;
