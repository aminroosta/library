
interface _Book {
   id: string;
   kind: string;
   title: string;
   subtitle?: string;
   authors: string[]
   publisher: string,
   publishedDate: string,
   description: string,
   smallThumbnail?: string
   thumbnail?: string
}

interface LayoutStyle {
   flex?: number,
   flexGrow?: number,
   flexShrink?: number,
   display?: 'none'|'flex',
   flexWrap?: 'wrap'|'nowrap',
   position?: 'absolute'|'relative',
   direction?: 'inherit'|'ltr'|'rtl',
   overflow?: 'visible'|'hidden'|'scroll',
   flexDirection?: 'row'|'row-reverse'|'column'|'column-reverse',
   alignItems?: 'flex-start'|'flex-end'|'center'|'stretch'|'baseline',
   alignSelf?: 'auto'|'flex-start'|'flex-end'|'center'|'stretch'|'baseline',
   justifyContent?: 'flex-start'|'flex-end'|'center'|'space-between'|'space-around',
   zIndex?: number,
   aspectRatio?: number,
   borderWidth?: number,
   borderTopWidth?: number,
   borderLeftWidth?: number,
   borderRightWidth?: number,
   borderBottomWidth?: number,
   top?: number|string,
   left?: number|string,
   right?: number|string,
   bottom?: number|string,
   flexBasis?: number|string,
   height?: number|string,
   maxHeight?: number|string,
   minHeight?: number|string,
   width?: number|string,
   maxWidth?: number|string,
   minWidth?: number|string,
   margin?: number|string,
   marginTop?: number|string,
   marginLeft?: number|string,
   marginRight?: number|string,
   marginBottom?: number|string,
   marginVertical?: number|string,
   marginHorizontal?: number|string,
   padding?: number|string,
   paddingTop?: number|string,
   paddingLeft?: number|string,
   paddingRight?: number|string,
   paddingBottom?: number|string,
   paddingVertical?: number|string,
   paddingHorizontal?: number|string,
}
