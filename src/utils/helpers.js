export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const generateData = (arr, size) => {
  if (!arr) return;

  return arr.slice(size - 10, size);
}

export const customSymbol = (symbol, selectedValue) => {
  if (!symbol || !selectedValue) return;

  return {
    symbol: JSON.parse(`${JSON.stringify(symbol).split(selectedValue)[0]}"`),
    filter: JSON.parse(`"/${selectedValue}`)
  }
}

export const round2Decimals = (num) => {
  const number = num === '' ? 0 : num;

  return parseFloat(number).toFixed(2);
}

export const removeTraillingZero = (num) => {
  if (!num) return;

  return num.replace(/(\.0+|0+)$/, '');
}

export const checkIncrease = (num) => {
  if (!num) return;

  return num > 0 ? true : false
}

export const intToString = (num) => {
  num = num.toString().replace(/[^0-9.]/g, '');
  if (num < 1000) {
    return num;
  }

  let si = [
    {v: 1E3, s: 'K'},
    {v: 1E6, s: 'M'},
    {v: 1E9, s: 'B'},
    {v: 1E12, s: 'T'},
    {v: 1E15, s: 'P'},
    {v: 1E18, s: 'E'}
  ];
  
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }

  if (si[index].s === 'K') {
    return numberWithCommas(round2Decimals(num));
  } else {
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
  }
}
