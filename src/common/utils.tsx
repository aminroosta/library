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

type StylesDynamic<P, B> = {
  [K in keyof B]?: B[K] | {(p:P) : B[K] | Animated.AnimatedInterpolation | Animated.Value};
}
type PropType<B, key extends keyof B> = B[key];

function Style<P extends { style?: any }, S = PropType<P, 'style'>>
              (Component: React.ComponentClass<P> | React.StatelessComponent<P>) {
  return <U extends {} = {}>(initial: StylesDynamic<U, S>, initialProps: P = {} as any) => {
    const raw : S = {} as any;
    const dynamic : {key: string, calc: Function}[] = [];
    for(const key in initial)
      if(initial.hasOwnProperty(key) && typeof initial[key] !== 'function')
        raw[key] = initial[key] as any;
      else
        dynamic.push({key, calc: initial[key]} as any);
    const compiled = StyleSheet.create({ raw });
    return (props: P & U & {style?: S, children?: any}) => {
      const rest =
        dynamic.reduce((base, cur) => {base[cur.key]=cur.calc(props); return base;}, {});
      const parent = props.style || {};
      delete props.style;
      return (
        <Component {...initialProps} {...props} style={[compiled.raw, rest, parent]}>
          {props.children}
        </Component>
      );
    }
  }
}

namespace Style {
  export const View = Style(_View);
  export const Image = Style(_Image);
  export const Text = Style(_Text);
  export const ScrollView = Style(_ScrollView);
  export const ActivityIndicator = Style(_ActivityIndicator);
  export const TouchableHighlight = Style(_TouchableHighlight);
  export const AnimatedView = Style(Animated.View as _View);
}

export const styled = Style;
