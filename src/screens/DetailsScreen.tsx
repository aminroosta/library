import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View
} from 'react-native';
import {navigatorStyle} from '../common/style';
import {inject, observer} from 'mobx-react';

@navigatorStyle({})
@inject('details')
@observer
export default class BookDetailsScreen extends Component {
   render()  {
      const details = this.props.details;
      return (
         <View style={styles.container}>
            <Text>{details.title}</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
});
