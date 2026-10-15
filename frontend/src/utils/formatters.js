export const formatNumber = (value) => new Intl.NumberFormat().format(value || 0);

export const capitalize = (value = '') => value.charAt(0).toUpperCase() + value.slice(1);
