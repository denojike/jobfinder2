import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //   return startIndex;
  //Convert array to lodash wrapper and paginate
  // Convert back to regular array with .value
  return _(items).slice(startIndex).take(pageSize).value();
}
