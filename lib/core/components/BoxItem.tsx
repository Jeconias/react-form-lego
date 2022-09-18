import React from 'react';
import useBoxContext from '../hooks/useBoxContext';
import useLego from '../hooks/useLego';
import { FC } from '../types/common';
import classnames from 'classnames';
import {
  CLASS_NAME_BOX_ITEM,
  CLASS_NAME_BOX_ITEM_ID,
} from '../../helpers/constants';

type BoxItemProps = {
  id?: string;
};

const BoxItem = ({ children, ...props }: FC<BoxItemProps>) => {
  const { setRef } = useLego();
  const { id, mode } = useBoxContext();

  if (mode !== 'edit') return <div className={props.className}>{children}</div>;

  return (
    <div
      {...props}
      className={classnames(
        CLASS_NAME_BOX_ITEM_ID(id),
        CLASS_NAME_BOX_ITEM,
        props.className
      )}
      draggable
      ref={setRef}
    >
      {children}
    </div>
  );
};

export default BoxItem;
