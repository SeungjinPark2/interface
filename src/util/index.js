export const amountEncoder = (balance) => {
  let ret = "";
  let count = 1;

  for (let i = balance.length - 1; i >= 0; --i) {
    if (i >= 0 && i < balance.length - 1 && count++ % 3 == 0) {
      ret = "," + ret;
    }
    ret = balance.at(i) + ret;
  }

  return ret;
};
