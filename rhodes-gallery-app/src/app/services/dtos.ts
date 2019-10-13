export class Biography {
  id: number;
  code: string;
  order: number;
  text: string;
}

export class Book {
  id: number;
  code: string;
  name: string;
  url: string;
  order: string;
  imageUrl: string;
  description: string;
}

export class PoemType {
  id: number;
  code: string;
  description: string;
}

export class Poem {
  id: number;
  code: string;
  name: string;
  poemText: string;
  poemTypeId: number;
}

export class PoemFormatted extends Poem {
  poemFormatted: string;
}
