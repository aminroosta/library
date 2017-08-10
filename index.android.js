import co from 'co';
import {throttle} from 'lodash';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View
} from 'react-native';

import {observable, action} from 'mobx';
import {observer} from 'mobx-react/native';
import * as Api from './src/google-books-api.js';
import AnimationTest from './src/animation-test.js';

class Store {
   @observable query =  '';
   @observable suggestions = [];

   @action search = () => Api.search(this.query);
   @action complition = throttle(() => {
      Api.complition(this.query)
         .then(suggestions => this.suggestions = suggestions);
   }, 500)
}

const store = new Store();

@observer
export default class library extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.query}
          onChangeText={query => {
             store.query = query; 
             store.complition();
           }}
           value={store.query}
        />
        <Button
           style={styles.button}
           onPress={store.search}
           color={styles.button.color}
           title="Search"
           accessibilityLabel="Search"
         />
        <Text style={styles.instructions}>
          To get started, enter book title and press Search.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  query: {
     alignSelf: 'stretch',
     height: 40,
     marginHorizontal: 20,
     // borderColor: 'gray',
     // borderWidth: 1
  },
  button: {
    flex: 1,
    color: "#841584"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

// AppRegistry.registerComponent('library', () => library);
AppRegistry.registerComponent('library', () => AnimationTest);
