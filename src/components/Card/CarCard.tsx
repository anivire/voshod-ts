import Image from 'next/image';
import { FC } from 'react';
import RiFileDamageLine from '~icons/ri/file-damage-line';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import { useRouter } from 'next/router';

interface Props {
  car: Car;
}

export const CarCard: FC<Props> = ({ car }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex w-72 flex-col overflow-hidden rounded-2xl bg-zinc-900">
        <div className="h-36">
          {!car.image ? (
            <div className="flex h-full w-full flex-row items-center justify-center gap-3 bg-zinc-950/50 text-sm text-zinc-400">
              <RiFileDamageLine />
              <p>Нет изображения</p>
            </div>
          ) : (
            <Image
              src={car.image}
              alt={`Изображение для ${car.brand} ${car.model}`}
              width={250}
              height={150}
              className="h-full w-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 p-5">
          <p>
            {car.brand} <span className="text-amber-500">{car.model}</span>
          </p>
          <p className="text-2xl font-semibold">{car.price} ₽</p>
          <div className="flex flex-row items-center gap-3">
            <p>{car.number}</p>
            <p className="text-zinc-400">{car.tarif}</p>
          </div>
          <button
            onClick={() => router.push(`/car/${car.id}`)}
            className="mt-3 flex flex-row items-center justify-between gap-3 rounded-xl bg-amber-900 px-3 py-2 text-sm md:hover:bg-amber-800"
          >
            Смотреть <RiArrowRightLine />
          </button>
        </div>
      </div>
    </>
  );
};
