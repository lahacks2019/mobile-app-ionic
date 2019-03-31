export interface User {
  id: string;
  email: string;
  pictureURL: string;
  fbID: string;
  identity?: 'individual' | 'restaurant';
  defaultLocation?: string;
  rating?: number;
  reviews?: number;
  benefits?: string;
}
