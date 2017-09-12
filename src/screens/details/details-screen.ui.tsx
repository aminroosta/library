import React, {StatelessComponent} from 'react';
import styled from 'styled-components/native';
import DetailsHeader from 'src/screens/details/details-header.ui';
import Summary from 'src/components/Summary'; 
import {connect} from 'src/common/utils';
import {colors, defaultNavigatorStyle, HEIGHT} from 'src/common/style';
import {Stores} from 'src/screens/screens';

const DetailsScreen
: StatelessComponent<{description: string, style?: object}>
= ({description, style}) => (
  <ScrollWrapper style={style}>
    <Header/>
    <BookSummary value={description} />
  </ScrollWrapper>
);

const units = {
  navbar: defaultNavigatorStyle.navBarHeight,
  header: (HEIGHT * 0.35 | 0) + defaultNavigatorStyle.navBarHeight,
};

export default connect(
  ({details} : Stores) => ({
    description: details.review && details.review.description || 'Loading ...',
  })
)(DetailsScreen);

const //views
ScrollWrapper = styled.ScrollView.attrs({bounces: false})`
  flex: 1;
  background-color: ${colors.background};
`,
Header = styled(DetailsHeader)`
  padding-top: ${units.navbar}px;
  height: ${units.header}px;
`,
BookSummary = styled(Summary)`
  padding: 0 15px;
`;
