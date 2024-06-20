import { CarCard } from '@/components/Card/CarCard';
import CardSkeleton from '@/components/Card/CardSkeleton';
import { PaginationComponent } from '@/components/Search/PaginationComponent';
import { SearchComponent } from '@/components/Search/SearchComponent';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Home() {
  const [searchString, setSearchString] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const {
    data: carsData,
    error,
    isLoading,
  } = useSWR<SearchCars>(
    `${process.env.API_URL}?w=catalog-cars&${searchString}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  return (
    <>
      <section className="mx-auto grid h-full w-fit grid-cols-4 place-items-start gap-5 py-8">
        <div className="w-full min-w-72">
          <SearchComponent
            selectedPage={page}
            selectedPageUpdate={setPage}
            searchStringUpdate={setSearchString}
          />
        </div>
        <div className="col-span-3 grid w-full grid-cols-3 gap-3">
          {isLoading
            ? [...Array(10)].map((_, index) => <CardSkeleton key={index} />)
            : carsData &&
              carsData.list.map(car => <CarCard key={car.id} car={car} />)}
          <PaginationComponent
            onPageUpdate={setPage}
            currentPage={page}
            totalPages={carsData ? carsData.pages : 1}
          />
        </div>
      </section>
    </>
  );
}
