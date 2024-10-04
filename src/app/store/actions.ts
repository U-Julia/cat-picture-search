export class GetPictures {
  static readonly type = '[Picture] Get';
}

export class GetPicturesByLimit {
  static readonly type = '[ByLimit] Get';

  constructor(
    public limit: number
  ) {}
}

export class GetPicturesByBreeds {
  static readonly type = '[ByBreeds] Get';

  constructor(
    public breed: string[]
  ) {}
}
