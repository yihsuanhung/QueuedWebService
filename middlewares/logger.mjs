export const logger = () => {
  return (req, res, next) => {
    const t0 = Date.now();
    console.log(`<-- ${req.method} ${req.originalUrl}`);
    res.on("finish", () =>
      console.log(
        `--> ${res.statusCode} ${req.method} ${req.originalUrl} ${
          Date.now() - t0
        }ms`
      )
    );
    next();
  };
};
