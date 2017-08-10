import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Animated,
  ScrollView,
  Dimensions,
  StatusBar
} from 'react-native';

const {height: DEVICE_HEIGHT} = Dimensions.get('window');

const scrollY = new Animated.Value(0);

const handleScroll = (e) => {
   2+3;
}

export default class AnimationTest extends Component {
   render() {
      return (
         <Animated.ScrollView
            onScroll={Animated.event(
               [{ nativeEvent: { contentOffset: { y: scrollY } } }],
               { useNativeDriver: true }
            )}
            style={styles.scrollView}>
            <StatusBar 
               translucent={true}
               backgroundColor="transparent" />
            <Animated.Image
               style={styles.image}
               source={require('../assets/images/DubaiTowers.jpg')} />
            <Animated.View style={styles.paragraphs}>
               <Paragraph />
               <Paragraph />
               <Paragraph />
               <Paragraph />
               <Paragraph />
               <Paragraph />
               <Paragraph />
            </Animated.View>
         </Animated.ScrollView>
      );
   }
}

const HEADER_HEIGHT = DEVICE_HEIGHT*0.65;
const styles = {
   scrollView: {
      flex: 1,
      backgroundColor: 'powderblue'
   },
   image: {
      position: 'absolute',
      width: '100%',
      height: HEADER_HEIGHT,
      transform: [
         { translateY: scrollY.interpolate({
            inputRange: [0, HEADER_HEIGHT/2],
            outputRange: [0, -HEADER_HEIGHT],
            extrapolate: 'clamp'
         })},
         {scaleX: scrollY.interpolate({
            inputRange: [0, HEADER_HEIGHT*.3],
            outputRange: [1, 1.3],
            extrapolate: 'clamp'
         })}
      ],
      opacity: scrollY.interpolate({
         inputRange: [0, HEADER_HEIGHT*.3],
         outputRange: [1, 0],
         extrapolate: 'clamp'
      })
   },
   paragraphs: {
      marginTop: HEADER_HEIGHT | 0,
      marginBottom: -250,
      transform: [
         {translateY: scrollY.interpolate({
            inputRange: [0, HEADER_HEIGHT/2],
            outputRange: [0, -HEADER_HEIGHT],
            extrapolate: 'clamp'
         })},
      ]
   }
};

const Paragraph = () => (
   <Text style={{
         marginVertical: '0.5%',
         marginHorizontal: '4%'
      }}>
      It is possible to have multiple StatusBar components mounted at the same time. The props will be merged in the order the StatusBar components were mounted. One use case is to specify status bar styles per route using Navigator.
   </Text>
);
