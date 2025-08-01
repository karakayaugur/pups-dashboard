function handleError(res, statusCode = 500) {
  return function (response) {
    if (!response.ok) {
      return res.status(statusCode).json({
        code: "52400",
        message: response.statusText || "There is no API connection!",
      });
    }
    return response;
  };
}

function handleData() {
  return function (response) {
    return response.json();
  };
}

export { handleError, handleData };
