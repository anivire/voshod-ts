import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';

interface Props {
  data: { brand: string; models: string[] };
  onSelectionUpdate: (items: string[]) => void;
  reset: boolean;
  initialSelectedItems: string[];
}

export const SubFilterItem: FC<Props> = ({
  data,
  onSelectionUpdate,
  reset,
  initialSelectedItems,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] =
    useState<string[]>(initialSelectedItems);

  function selectItem(item: string) {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter(selectedItem => selectedItem !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
  }

  useEffect(() => {
    onSelectionUpdate(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    if (reset) {
      setSelectedItems([]);
    }
  }, [reset]);

  return (
    <div className="w-full text-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full flex-row items-center justify-between p-2 px-5 text-zinc-400"
      >
        <p>{data.brand}</p>
        <RiArrowDownSLine
          className={classNames(
            'transition-transform duration-200 ease-in-out',
            { 'rotate-180': isOpen }
          )}
        />
      </button>
      {isOpen && (
        <div className="flex flex-col flex-wrap px-5 pb-3">
          {data.models.map((model, modelIndex) => (
            <button
              key={modelIndex}
              onClick={() => selectItem(model)}
              className={classNames('p-2 px-5 text-start text-sm', {
                'bg-zinc-700/50': selectedItems.includes(model),
              })}
            >
              {model}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
