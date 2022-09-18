export const PROPERTY_DATA_ITEM_POSITION = 'data-rl-item-position';

export const CLASS_NAME_ITEM_TARGET = 'rl-box-item-target';

export const CLASS_NAME_BOX_ITEM = 'rl-box-item';

export const CLASS_NAME_BOX = (id: string, prefix?: '.') =>
  `${prefix ?? ''}rl-box-${id}`;

export const CLASS_NAME_BOX_ITEM_ID = (id: string, prefix?: '.') =>
  `${prefix ?? ''}rl-box-${id}-item`;
