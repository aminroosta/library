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

@navigatorStyle
export default class BookDetailsScreen extends Component {
   render()  {
      return (<View style={styles.container}></View>);
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'blue',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
});
