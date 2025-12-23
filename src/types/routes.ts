export interface Route {
  id: number;
  title: string;
  description?: string;
  distance: string;
  elevation: string;
  duration: string;
  location?: string;
  komootLink?: string;
  photos: string[];
}
