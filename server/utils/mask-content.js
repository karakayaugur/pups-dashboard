export const fnMaskQueryParams = (query) => {
  const sensitiveFields = [
    "username",
    "user_name",
    "userName",
    "password",
    "token",
    "secret",
    "cvv",
    "expiry_month",
    "expirymonth",
    "expiryMonth",
    "expiry_year",
    "expiryYear",
    "expiryyear",
    "email",
    "cardNumber",
    "card_number",
    "cardnumber",
    "bank_account_detail",
    "iban",
    "api_key",
    "apikey",
    "apiKey",
    "secret_key",
    "secretkey",
    "secretKey",
    "number",
    "otp",
    "role",
  ];

  return Object.keys(query).reduce((acc, key) => {
    acc[key] = sensitiveFields.includes(key) ? `${key}-***` : query[key];
    return acc;
  }, {});
};
