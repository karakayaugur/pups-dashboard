const reqHeaderHandler = (headers = []) => {
  return (req, res, next) => {
    const _headers = {
      ...req.headers,
    };

    for (const key in _headers) {
      if (_headers[key] === undefined) {
        delete _headers[key];
      }
    }
    req["proxy_headers"] = _headers;
    next();
  };
};

export default reqHeaderHandler;
