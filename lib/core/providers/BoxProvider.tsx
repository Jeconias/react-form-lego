import React, { useMemo } from 'react';
import { createContext } from 'react';
import { BoxMode, BoxOrder } from '../types/box.types';
import { FC } from '../types/common';

type NewOrder = BoxOrder[];

type CallbackOrder = (oldOder: BoxOrder[]) => NewOrder;

type BoxContextValue = {
  id: string;
  order: BoxOrder[];
  mode?: BoxMode;
  onNewOrder?: (callback: CallbackOrder) => void;
};

type BoxProviderProps = {
  id: string;
  order: BoxOrder[];
  mode?: BoxMode;
  onOrderChange?: (newOrder: BoxOrder[]) => void;
};

export const BoxContext = createContext<BoxContextValue>({} as BoxContextValue);

const BoxProvider = ({
  children,
  id,
  mode,
  order,
  onOrderChange,
}: FC<BoxProviderProps>) => {
  const boxValuesMemorized = useMemo((): BoxContextValue => {
    const onNewOrder = (cb: CallbackOrder) => {
      if (onOrderChange) onOrderChange(cb(order));
    };

    return {
      id,
      mode,
      order,
      onNewOrder,
    };
  }, [id, order, mode, onOrderChange]);

  return (
    <BoxContext.Provider value={boxValuesMemorized}>
      {children}
    </BoxContext.Provider>
  );
};

export default BoxProvider;
