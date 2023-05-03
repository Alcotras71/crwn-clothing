export const errorGuard = (err: unknown) => {
  if (err instanceof Error) {
    return err.message;
  } else {
    return err;
  }
}
