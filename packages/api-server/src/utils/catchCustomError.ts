/**
 * catchCustomError
 * @param opts Opts to pass to Query / Mutation Function
 * @param fn Query / Mutation Function
 * @param customErrProps error props to include / overwrite
 */
export const catchCustomError = async <TOpts, UFuncReturned>(
  opts: TOpts,
  fn: (opts: TOpts) => Promise<UFuncReturned>,
  customErrProps: any
): Promise<UFuncReturned> => {
  return await new Promise((res, rej) =>
    fn(opts)
      .then((toReturn) => res(toReturn))
      .catch((err: any) => rej({ ...err, ...customErrProps }))
  );
};
