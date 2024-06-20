import { FC, useEffect, useState } from 'react';
import { FilterItem } from './FilterItem';
import { useRouter } from 'next/router';

interface Props {
  selectedPage: number;
  selectedPageUpdate: (selectedPage: number) => void;
  searchStringUpdate: (searchString: string) => void;
}

export const SearchComponent: FC<Props> = ({
  selectedPage,
  selectedPageUpdate,
  searchStringUpdate,
}) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTarifs, setSelectedTarifs] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { page, brand, model, tarif } = router.query;

    if (page) {
      let _page: number = Number(page);
      selectedPageUpdate(_page);
    }

    if (brand) {
      setSelectedBrands(Array.isArray(brand) ? brand : [brand]);
    }

    if (model) {
      setSelectedModels(Array.isArray(model) ? model : [model]);
    }

    if (tarif) {
      setSelectedTarifs(Array.isArray(tarif) ? tarif : [tarif]);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      const query = new URLSearchParams();

      query.append('page', selectedPage.toString());

      selectedBrands.forEach(brand => {
        query.append('brand', brand);
      });

      selectedModels.forEach(model => {
        query.append('model', model);
      });

      selectedTarifs.forEach(tarif => {
        query.append('tarif', tarif);
      });

      searchStringUpdate(query.toString());
      router.push(`?${query.toString()}`, undefined, { shallow: true });
    }
  }, [
    router.isReady,
    selectedBrands,
    selectedModels,
    selectedTarifs,
    selectedPage,
  ]);

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        <FilterItem
          onSelectionUpdate={setSelectedBrands}
          type="brands"
          defaultOpenState={true}
          selectedItems={selectedBrands}
        />
        <FilterItem
          onSelectionUpdate={setSelectedModels}
          type="models"
          selectedItems={selectedModels}
        />
        <FilterItem
          onSelectionUpdate={setSelectedTarifs}
          type="tarif"
          selectedItems={selectedTarifs}
        />
      </div>
    </>
  );
};
