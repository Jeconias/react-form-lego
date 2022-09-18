import { Element } from './element.types';

export type Box = {
  id: string;
  elements: Element[];
};

export type BoxMode = 'edit';

export type BoxOrder = number | null;
