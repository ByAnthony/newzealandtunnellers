export function displayBiographyDates(
  birth: string | null,
  death: string | null,
) {
  if (birth && death) {
    return `${birth}-${death}`;
  }
  if (birth && !death) {
    return `${birth}-†?`;
  }
  if (!birth && death) {
    return `?-${death}`;
  }
  return "?-†?";
}
