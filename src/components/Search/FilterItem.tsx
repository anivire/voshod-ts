import { brandsData, modelsData, tarifData } from '@/utils/searchFiltersData';
import { FC, useEffect, useState } from 'react';
import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
import classNames from 'classnames';
import { SubFilterItem } from './SubFilterItem';
import RiFilterOffLine from '~icons/ri/filter-off-line';
import { useRouter } from 'next/router';

interface Props {
  type: 'brands' | 'models' | 'tarif';
  onSelectionUpdate: (items: string[]) => void;
  defaultOpenState?: boolean;
  selectedItems: string[];
}

export const FilterItem: FC<Props> = ({
  type,
  defaultOpenState,
  onSelectionUpdate,
  selectedItems: propSelectedItems,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpenState ?? false);
  const [selectedItems, setSelectedItems] =
    useState<string[]>(propSelectedItems);
  const [reset, setReset] = useState<boolean>(false);
  const router = useRouter();

  function selectItem(item: string) {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter(selectedItem => selectedItem !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
  }

  useEffect(() => {
    if (!router.isReady) return;

    const { brand, model, tarif } = router.query;

    if (type === 'brands' && brand) {
      setSelectedItems(Array.isArray(brand) ? brand : [brand]);
    }

    if (type === 'models' && model) {
      setSelectedItems(Array.isArray(model) ? model : [model]);
    }

    if (type === 'tarif' && tarif) {
      setSelectedItems(Array.isArray(tarif) ? tarif : [tarif]);
    }
  }, [router.isReady]);

  useEffect(() => {
    onSelectionUpdate(selectedItems);
  }, [selectedItems]);

  function handleSubFilterUpdate(subItems: string[]) {
    setSelectedItems(subItems);
  }

  function resetFilters() {
    setSelectedItems([]);
    setReset(true);
  }

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'flex w-full flex-row items-center justify-between overflow-hidden bg-zinc-900 p-3 px-5',
          {
            'rounded-2xl': !isOpen,
            'rounded-t-2xl': isOpen,
          }
        )}
      >
        <p>
          {type === 'brands' ? 'Бренд' : type === 'models' ? 'Модель' : 'Тариф'}
        </p>
        <RiArrowDownSLine
          className={classNames(
            'transition-transform duration-200 ease-in-out',
            { 'rotate-180': isOpen }
          )}
        />
      </button>
      {isOpen && (
        <div
          className={classNames(
            'flex flex-col divide-y divide-zinc-900 overflow-hidden bg-zinc-900/50',
            {
              'rounded-b-2xl': isOpen,
            }
          )}
        >
          {type === 'brands' &&
            brandsData.values.map((item: string, index) => (
              <button
                key={index}
                onClick={() => selectItem(item)}
                className={classNames('p-2 px-5 text-start text-sm', {
                  'bg-zinc-700/50': selectedItems.includes(item),
                })}
              >
                {item}
              </button>
            ))}
          {type === 'models' &&
            modelsData.values.map((item, index) => (
              <SubFilterItem
                key={index}
                data={item}
                onSelectionUpdate={handleSubFilterUpdate}
                reset={reset}
                initialSelectedItems={selectedItems}
              />
            ))}
          {type === 'tarif' &&
            Object.entries(tarifData.values).map(([key, value], index) => (
              <button
                key={index}
                onClick={() => selectItem(key)}
                className={classNames('p-2 px-5 text-start text-sm', {
                  'bg-zinc-700/50': selectedItems.includes(key),
                })}
              >
                {value}
              </button>
            ))}
          <button
            onClick={resetFilters}
            className="flex flex-row items-center justify-center gap-2 p-3 text-sm text-zinc-400 md:hover:bg-zinc-800"
          >
            <RiFilterOffLine />
            Очистить фильтр
          </button>
        </div>
      )}
    </div>
  );
};
