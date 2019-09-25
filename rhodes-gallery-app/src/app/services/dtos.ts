export class Book {
  id: number;
  code: string;
  name: string;
  url: string;
  imageUrl: string;
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
