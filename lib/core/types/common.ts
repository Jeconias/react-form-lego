import React from 'react';

export type FC<T = {}> = T & {
  className?: string;
  children?: React.ReactElement | React.ReactElement[] | null;
};
