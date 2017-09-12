import React, {Component} from 'react';
import { isBoxedObservable, isObservable, isObservableArray, isObservableMap, toJS } from 'mobx';
import { inject } from 'mobx-react';

export const memoize = <T extends Function>(fn: T) : T => {
  const cache = { };
  const run : any = (...args) => {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args).catch(up => {
        delete cache[key];
        throw up;
      });
    }
    return cache[key];
  };
  return run as T;
};

/** ------------------------------------------------------------------------------------------ */
const isFunction = (fn) => typeof(fn) === 'function';
const isShallowEqual = (a, b) => {
  for (const key in a) {
    if (isFunction(a[key]) && isFunction(b[key])) {
      continue;
    }

    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};

const unboxProps = (props) => {
  const unboxedProps = {};
  Object.keys(props).forEach(key => {
    if (isObservableArray(props[key])) {
      unboxedProps[key] = props[key].peek();
    } else if (isObservableMap(props[key])) {
      unboxedProps[key] = props[key].toJS();
    } else if (isBoxedObservable(props[key])) {
      unboxedProps[key] = props[key].get();
    } else if (isObservable(props[key])) {
      unboxedProps[key] = toJS(props[key]);
    } else {
      unboxedProps[key] = props[key];
    }
  });

  return unboxedProps;
};

/** A higher-order-component that connects a 'dumb' React component to your MobX stores.  */
export const connect : connect = mapStoresToProps => (WrappedComponent : any) => {
  class UnboxedComponent extends Component {
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

    shouldComponentUpdate(nextProps) {
      return !isShallowEqual(nextProps, this.props);
    }
  }

  // wrap the mapping function usually passed to mobx-react's inject method
  // so that it additionally unboxes any observables
  const unboxedMapStoresToProps = (stores, props, context) => {
    const injectedProps = mapStoresToProps(stores, props, context);
    Object.assign(injectedProps, props);
    return unboxProps(injectedProps);
  };

  // apply the mobx store injection with our wrapped function
  const InjectedComponent = inject(unboxedMapStoresToProps)(UnboxedComponent) as any;

  // make some nice names that will show up in the React Devtools
  const wrappedDisplayName = WrappedComponent.displayName
      || WrappedComponent.name
      || (WrappedComponent.constructor && WrappedComponent.constructor.name)
      || 'Unknown';
  InjectedComponent.displayName = `inject-${wrappedDisplayName}`;
  (UnboxedComponent as any).displayName = `unbox-${wrappedDisplayName}`;

  return InjectedComponent;
};

type MapStoresToProps<T, P> = (stores: any, nextProps: P, context:any) => T;
type ReactComponent<P> = React.StatelessComponent<P> | React.ComponentClass<P>;

export type connect = {
  <T, P>(mapStoresToProps: MapStoresToProps<T, P>): (
    <TFunction extends ReactComponent<T | P>>
    (target: TFunction) => React.StatelessComponent<P & Partial<T>>
  ),
};
