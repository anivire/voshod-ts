import Image from 'next/image';
import { FC, useState } from 'react';
import RiArrowRightLine from '~icons/ri/arrow-right-line';
import RiArrowLeftLine from '~icons/ri/arrow-left-line';

interface Props {
  images: CarImage[];
}

export const ImageGallery: FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="relative mx-auto w-full max-w-md overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map(image => (
            <Image
              key={image.id}
              src={image.image}
              alt={`Изображение автомобиля ${image.id}`}
              width={450}
              height={450}
              className="h-[450px] w-[450px]"
            />
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 mx-3 -translate-y-1/2 transform rounded-full bg-zinc-900 p-3"
            >
              <RiArrowLeftLine />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 mx-3 -translate-y-1/2 transform rounded-full bg-zinc-900 p-3"
            >
              <RiArrowRightLine />
            </button>
          </>
        )}
      </div>
    </>
  );
};
