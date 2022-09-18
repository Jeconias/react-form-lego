import React, { Children, cloneElement } from 'react';
import { hasChildren } from 'react-children-utilities';

export const swap = <T = any>(
  data: Array<T>,
  sourceIndex: number,
  targetIndex: number
) => {
  const source = data[sourceIndex];
  const target = data[targetIndex];

  data[sourceIndex] = target;
  data[targetIndex] = source;

  return data;
};

type Child =
  | string
  | number
  | true
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | React.ReactFragment
  | React.ReactPortal
  | React.ReactNode
  | React.ReactNode[];

export const deepFilterChildren = (
  children: Child,
  fn: (child: Child, index?: number) => boolean
) => {
  const results: Child[] = [];

  if (!children) return results;

  Children.forEach(children, (child, index) => {
    const reactElement = child as React.ReactElement;
    const result = fn(reactElement, index);

    if (result) results.push(reactElement);

    if (reactElement?.props?.children) {
      results.push(
        ...deepFilterChildren(reactElement.props.children as Child, fn)
      );
    }
  });

  return results;
};

/**
 * @deprecated
 */

export const deepMapChildren = (
  children: Child,
  fn: (child: Child, index?: number) => Child
): Child => {
  return Children.map(children, (child, index) => {
    const reactElement = child as React.ReactElement;
    const result = fn(child, index) as React.ReactElement;

    if (hasChildren(result)) {
      return cloneElement(result, {
        ...(result?.props ?? {}),
        children: deepMapChildren(reactElement.props.children as Child, fn),
      });
    }

    return result;
  });
};
