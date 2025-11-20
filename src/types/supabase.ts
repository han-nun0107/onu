export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      movies: {
        Row: {
          id: number;
          name: string;
          data: Json | null;
        };
        Insert: {
          id?: never;
          name: string;
          data?: Json | null;
        };
        Update: {
          id?: never;
          name?: string;
          data?: Json | null;
        };
      };
    };
  };
};
