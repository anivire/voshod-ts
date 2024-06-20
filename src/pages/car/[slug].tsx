import { CarPageCard } from '@/components/Card/CarPageCard';
import CardPageSkeleton from '@/components/Card/CardPageSkeleton';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import RiArrowLeftLine from '~icons/ri/arrow-left-line';

export default function CarPage() {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: carData,
    error,
    isLoading,
  } = useSWR<SearchCarProfile>(
    `${process.env.API_URL}?w=catalog-car&id=${slug}`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  console.log(carData);

  return (
    <>
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-5 py-8">
        <button
          onClick={() => router.back()}
          className="flex w-fit flex-row items-center gap-2 rounded-xl bg-zinc-900/50 p-3 px-5 text-sm text-zinc-400"
        >
          <RiArrowLeftLine /> Назад
        </button>
        {isLoading ? (
          <CardPageSkeleton />
        ) : (
          carData && carData && <CarPageCard car={carData.item} />
        )}
      </section>
    </>
  );
}
