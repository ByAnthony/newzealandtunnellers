export function displayBiographyDates(
  birth: string | null,
  death: string | null,
) {
  if (birth !== null && death !== null) {
    return `${birth}-${death}`;
  }
  if (birth !== null && death === null) {
    return `${birth}-†?`;
  }
  if (birth === null && death !== null) {
    return `?-${death}`;
  }
  return '?-†?';
}
