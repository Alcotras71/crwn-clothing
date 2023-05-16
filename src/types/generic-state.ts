export type GenericState<T> = T & {
  isLoading: boolean;
  error: unknown;
};
