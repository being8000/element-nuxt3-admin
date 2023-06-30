import moment from "moment";
// toFixed兼容方法
function toFixed(number: number, n: number) {
  if (n > 20 || n < 0) {
    throw new RangeError("toFixed() digits argument must be between 0 and 20");
  }
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  if (typeof n === "undefined" || n === 0) {
    return (Math.round(number * 10 ** n) / 10 ** n).toFixed(n);
  }
  let r2 =
    Math.round(Math.round(number * 10 ** (n + 2) * 10) / 10) / 10 ** (n + 2);
  r2 = Math.round((r2 * 10 ** (n + 1)) / 10) / 10 ** n;
  return r2.toFixed(n);
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
function toThousand(
  num: number | string,
  symbol: boolean = true,
  decimalLength: number = 2
) {
  const prefix = symbol ? "₱" : "";
  return (
    prefix +
    toFixed(+num || 0, decimalLength).replace(/^-?\d+/g, (m) =>
      m.replace(/(?=(?!\b)(\d{3})+$)/g, ",")
    )
  );
}

/**
 * Upper case first char
 * @param {String} string
 */
function uppercaseFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const useUtilites = () => {
  return {
    toThousand,
    uppercaseFirst,
    moment,
  };
};
