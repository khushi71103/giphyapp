export interface GifImage {
    url: string;
    width: string;
    height: string;
  }
  
  export interface Gif {
    id: string;
    title: string;
    images: {
      original: GifImage;
      fixed_width: GifImage;
      fixed_height: GifImage;
    };
  }