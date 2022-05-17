export const Ship = (title, width) => {
  let sName = title;
  let hits = new Array(width).fill(0);

  const name = () => sName;

  const size = () => hits.length;

  const hit = (loc) => {
    if (typeof loc != "number" || loc < 0 || loc >= hits.length) return false;
    hits[loc] = 1;
    return true;
  };

  const isSunk = () => {
    for (let i = 0; i < hits.length; i++) {
      if (hits[i] == 0) return false;
    }
    return true;
  };

  return { name, size, hit, isSunk };
};
