interface Search {
  name: string;
  type: string;
}

interface Brands extends Omit<Search, 'type'> {
  code: string;
  values: string[];
}

interface Models extends Search {
  values: {
    brand: string;
    models: string[];
  }[];
}

interface Tarif extends Search {
  values: {
    [key: string]: string;
  };
}
