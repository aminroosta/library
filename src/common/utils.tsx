import React, {Component} from 'react';
import {
  Text as _Text,
  Image as _Image,
  View as _View,
  ScrollView as _ScrollView,
  ActivityIndicator as _ActivityIndicator,
  TouchableHighlight as _TouchableHighlight,
  Animated,
  StyleSheet
} from 'react-native';

export const memoize = <T extends Function>(fn: T) : T => {
  const cache = { };
  const run : any = (...args) => {
    const key = JSON.stringify(args);
    if(!cache[key]) {
      cache[key] = fn(...args).catch(up => {
        delete cache[key];
        throw up;
      });
    }
    return cache[key];
  };
  return run as T;
} 
