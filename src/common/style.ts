const defaultNavigatorStyle = {
   drawUnderNavBar: true,
   navBarTransparent: true,
   navBarTranslucent: true,
   navBarTextColor: '#ffffff',
   navBarButtonColor: '#ffffff',
};

export const navigatorStyle = function(arg1) {
   if(typeof arg1 === 'function') {
      arg1.navigatorStyle = defaultNavigatorStyle;
      return
   }
   const style = arg1;
   return (target) => {
      target.navigatorStyle = Object.assign(style, defaultNavigatorStyle);
   };
}
export const triangle = ({width, height}) =>  ({
   width: 0,
   height: 0,
   backgroundColor: 'transparent',
   borderStyle: 'solid',
   borderTopWidth: 0,
   borderRightWidth: width,
   borderBottomWidth: height,
   borderLeftWidth: 0,
   borderTopColor: 'transparent',
   borderRightColor: 'transparent',
   borderBottomColor: 'powderblue',
   borderLeftColor: 'transparent',
})
