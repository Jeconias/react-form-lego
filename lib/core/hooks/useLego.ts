import { useCallback, useEffect, useRef } from 'react';
import {
  CLASS_NAME_BOX,
  CLASS_NAME_BOX_ITEM_ID,
  CLASS_NAME_ITEM_TARGET,
  PROPERTY_DATA_ITEM_POSITION,
} from '../../helpers/constants';
import { swap } from '../../helpers/utils';
import useBoxContext from './useBoxContext';

type DataTransfer = {
  boxId: string;
};

const useLego = () => {
  const { id, onNewOrder } = useBoxContext();
  const ref = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;
    ref.current = node;
  }, []);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll(
        `${CLASS_NAME_BOX(id, '.')} ${CLASS_NAME_BOX_ITEM_ID(id, '.')}`
      )
    ).filter((n) => n !== ref.current);

    function ondrop(this: HTMLDivElement, e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();

      const cb = () => {
        this.removeEventListener('drop', ondrop);
      };

      const data = JSON.parse(
        e.dataTransfer!.getData('text/plain') ?? '{}'
      ) as Partial<DataTransfer>;

      // Drop on same data
      if (data.boxId !== id) {
        cb();
        return false;
      }

      const selected = ref.current!.innerHTML;

      ref.current!.innerHTML = this.innerHTML;
      this.innerHTML = selected;

      if (onNewOrder) {
        const source = parseInt(
          ref.current!.getAttribute(PROPERTY_DATA_ITEM_POSITION)!
        );
        const target = parseInt(
          this.getAttribute(PROPERTY_DATA_ITEM_POSITION)!
        );

        if (!isNaN(source) && !isNaN(target)) {
          onNewOrder((oldOrder) => swap(oldOrder, source, target));
        }
      }

      cb();
      return false;
    }

    const ondragstart = function (this: HTMLDivElement, e: DragEvent) {
      const data: DataTransfer = { boxId: id };

      e.dataTransfer!.effectAllowed = 'move';
      e.dataTransfer!.setData('text/plain', JSON.stringify(data));

      nodes.forEach((n) => {
        const element = n as HTMLDivElement;

        element.classList.add(CLASS_NAME_ITEM_TARGET);
        element.addEventListener('drop', ondrop);
      });
    };

    const ondragend = function (this: HTMLDivElement, e: DragEvent) {
      nodes.forEach((n) => {
        const element = n as HTMLDivElement;
        element.classList.remove(CLASS_NAME_ITEM_TARGET);
      });
    };

    const ondragover = function (this: HTMLDivElement, e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
    };

    ref.current?.addEventListener('dragstart', ondragstart);
    ref.current?.addEventListener('dragend', ondragend);
    ref.current?.addEventListener('dragover', ondragover);

    return () => {
      ref.current?.removeEventListener('dragstart', ondragstart);
      ref.current?.removeEventListener('dragend', ondragend);
      ref.current?.removeEventListener('dragover', ondragover);
    };
  }, [onNewOrder]);

  return { setRef };
};

export default useLego;
