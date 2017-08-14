import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View
} from 'react-native';
import {navigatorStyle} from '../common/style.js';
import {inject, observer} from 'mobx-react';

@navigatorStyle
@inject('amin')
@observer
export default class BookDetailsScreen extends Component {
   render()  {
      const {amin} = this.props;
      return (
         <View style={styles.container}>
            <Text>{amin.name} - {amin.age}</Text>
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
