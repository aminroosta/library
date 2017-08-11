import React, {Component} from 'react';

class Wrapper extends React.Component {
   render() {

   }
}

/**
 * @param {Component} Component
 * @param {LayoutStyle} style
 */
export const styled = (Component, style) => {
   return (props) => {
      style = Object.keys(style).reduce((obj, key) => {
         const value = style[key];
         obj[key] = typeof value === 'function' ? value(props) : value;
         return obj;
      }, { });
      return (<Component {...props}
              style={[style, props.style]}> {props.children}
              </Component>);
   }
}
