const asyncHandler = (requestHandler) => {
  Promise.resolve(requestHandler(res, req, next)).catch((err) => next(err));
};

export { asyncHandler };
