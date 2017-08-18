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

import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react/native';
import {defaultNavigatorStyle} from '../common/style';
import * as Api from '../api/google-books-api';

class Store {
   @observable query =  '';
   @observable suggestions = [];

   @action search = async () => {
      const results = await Api.search(this.query);
      console.warn(results);
   }
   @action complition = throttle(async () => {
      const suggestions = await Api.complition(this.query);
      runInAction(() => this.suggestions = suggestions);
   });
}

const store = new Store();

@observer
export default class BrowseScreen extends Component {
   static navigatorStyle = defaultNavigatorStyle;
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
           onPress={store.search}
           color={(styles.button as any).color}
           title="Search"
           accessibilityLabel="Search"
         />
        <Text style={styles.instructions}>
          To get started, enter book title and press Search!
        </Text>
        <Text style={styles.instructions}>
           {JSON.stringify(store.suggestions)}
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
