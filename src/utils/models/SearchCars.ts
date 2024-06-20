type CarImage = {
  id: number;
  image: string;
};

interface Car {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  image: string | null;
  tarif: string[];
}

interface CarProfile extends Omit<Car, 'image'> {
  images: CarImage[];
}

interface SearchCars {
  result: number;
  page: number;
  pages: number;
  per_page: number;
  list: Car[];
}

interface SearchCarProfile {
  result: number;
  item: CarProfile;
}
