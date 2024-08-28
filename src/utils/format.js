const formatCurrency = (amount) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: "0",
  }).format(value);
};

export const formatQuantity = (quantity, noun) => {
  return quantity === 1 ? `${quantity} ${noun}` : `${quantity}${noun}s`;
};
export const formatDate = (date, onlyMonth) => {
  const options = {
    year: "numeric",
    month: "long",
  };
  if (!onlyMonth) {
    options.day = "numeric";
  }

  return new Intl.DateTimeFormat("en-US", options
  ).format(date);
};

export default formatCurrency;
