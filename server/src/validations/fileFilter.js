export const imageFileFilter = (_, file, next) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    next(null, true);
  } else {
    next(null, false);
    return next(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};
