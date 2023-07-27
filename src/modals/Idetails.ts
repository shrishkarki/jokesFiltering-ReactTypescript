export interface Idetails {
  error: boolean;
  amount: number;
  jokes?: (JokesEntity)[] | null;
}
  export interface JokesEntity {
  category: string;
  type: string;
  setup?: string | null;
  delivery?: string | null;
  flags: Flags;
  safe: boolean;
  id: number;
  lang: string;
  joke?: string | null;
}
export interface Flags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}
export interface Istate {
  loading: boolean;
  jokes: JokesEntity[];
  errorMsg: string;
}



