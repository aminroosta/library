import React, {StatelessComponent} from 'react';
import styled from 'styled-components/native';
import DetailsHeader from 'src/screens/details/details-header.ui';
import Summary from 'src/components/Summary'; 
import {connect} from 'src/common/utils';
import {colors, units} from 'src/common/style';
import {Stores} from 'src/screens/screens';

const DetailsScreen
: StatelessComponent<{description: string, style?: object}>
= ({description, style}) => (
  <ScrollWrapper style={style}>
    <Header/>
    <BookSummary value={description} />
  </ScrollWrapper>
);

export default connect(
  ({details} : Stores) => ({
    description: details.review && details.review.description || 'Loading ...',
  }),
)(DetailsScreen);

const ScrollWrapper = styled.ScrollView.attrs({bounces: false})`
  flex: 1;
  background-color: ${colors.background};
`;
const Header = styled(DetailsHeader)`
  padding-top: ${units.navBarHeight}px;
  height: ${units.detailsHeaderHeight}px;
`;
const BookSummary = styled(Summary)`
  padding: 0 15px;
`;
