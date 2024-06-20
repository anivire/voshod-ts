import { FC } from 'react';
import RiFileDamageLine from '~icons/ri/file-damage-line';
import { ImageGallery } from './ImageGallery';

interface Props {
  car: CarProfile;
}

export const CarPageCard: FC<Props> = ({ car }) => {
  return (
    <>
      <div className="flex w-full flex-row overflow-hidden rounded-2xl bg-zinc-900">
        <div className="h-full">
          {!car.images ? (
            <div className="flex h-[450px] w-[450px] flex-row items-center justify-center gap-3 bg-zinc-950/50 text-sm text-zinc-400">
              <RiFileDamageLine />
              <p>Нет изображения</p>
            </div>
          ) : (
            <ImageGallery images={car.images} />
          )}
        </div>
        <div className="flex flex-col gap-2 p-5">
          <p>
            {car.brand} <span className="text-amber-500">{car.model}</span>
          </p>
          <p className="text-2xl font-semibold">{car.price} ₽</p>
          <div className="flex flex-row items-center gap-3">
            {car.number && <p>{car.number}</p>}
            {car.tarif && <p className="text-zinc-400">{car.tarif}</p>}
          </div>
        </div>
      </div>
    </>
  );
};
