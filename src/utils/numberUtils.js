export const formatCurrency = (value) => {
  if (!value) return 0;
  return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
};
