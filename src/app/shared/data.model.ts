export interface Picture {
  breeds: Breeds[];
  height: number;
  id: string;
  url: string;
}

export interface Breeds {
  id: string;
  name: string;
}
