/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {

  const options = {
    sensitivity: "case",
    caseFirst: "upper",
  };

  const sorted = [...arr].sort((a, b) => {
  return  a.localeCompare(b, ["ru", "en"], options);
  });

  return param === "desc" ? sorted.reverse() : sorted;
}
