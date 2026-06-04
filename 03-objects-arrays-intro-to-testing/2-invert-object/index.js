/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns the new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  const result = {};

  if (obj == null) {
    return undefined;
  }

  for (const key in obj) {
    const value = obj[key];
    result[value] = key;
	}
	
  return result;
}
