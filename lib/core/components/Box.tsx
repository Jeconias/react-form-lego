import React, { cloneElement, ReactElement, useMemo } from 'react';
import BoxProvider from '../providers/BoxProvider';
import { FC } from '../types/common';
import classnames from 'classnames';
import { BoxMode, BoxOrder } from '../types/box.types';
import BoxItem from './BoxItem';
import { deepFilterChildren, swap } from '../../helpers/utils';
import { deepMap } from 'react-children-utilities';
import {
  CLASS_NAME_BOX,
  PROPERTY_DATA_ITEM_POSITION,
} from '../../helpers/constants';

type BoxProps = {
  id: string;
  mode?: BoxMode;
  dataSource?: {
    order?: BoxOrder[];
  };
  onOrderChange?: (newOrder: BoxOrder[]) => void;
};

const Box = ({
  id,
  mode,
  children,
  className,
  dataSource,
  onOrderChange,
}: FC<BoxProps>) => {
  const arrayChildren = useMemo(() => {
    const arrayChildrenOrdedOnTree = deepFilterChildren(children, (child) => {
      const reactElement = child as ReactElement;
      return reactElement?.type === BoxItem;
    });

    const defaultOrder = arrayChildrenOrdedOnTree.map((_, k) => k);
    const order =
      dataSource?.order?.length === defaultOrder.length
        ? dataSource.order
        : defaultOrder;

    order.forEach((o, k) => {
      if (o !== null) swap(arrayChildrenOrdedOnTree, k, o);
    });

    return { arrayChildrenOrdedOnTree, order };
  }, [children, dataSource?.order]);

  let boxItemPosition = 0;

  return (
    <BoxProvider
      id={id}
      order={arrayChildren.order}
      mode={mode}
      onOrderChange={onOrderChange}
    >
      <div className={classnames(`${CLASS_NAME_BOX(id)}`, className)}>
        {deepMap(children, (child) => {
          const reactElement = child as ReactElement;
          const isBoxItem = reactElement.type === BoxItem;

          if (!isBoxItem) return reactElement;

          return cloneElement(
            arrayChildren.arrayChildrenOrdedOnTree[
              boxItemPosition
            ] as ReactElement,
            {
              key: boxItemPosition,
              [PROPERTY_DATA_ITEM_POSITION]: boxItemPosition++,
            }
          );
        })}
      </div>
    </BoxProvider>
  );
};

export default Box;
