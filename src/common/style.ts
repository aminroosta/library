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
