const Ship = (sName, size, sCoord, sOrient) => {
  if (sCoord[0] < 0 || sCoord[1] < 0) return false;

  const setFootprint = (size, coord, orient) => {
    let arr = [];
    if (orient == "h") {
      for (let i = 0; i < size; i++) arr.push([coord[0], coord[1] + i]);
    } else {
      for (let i = 0; i < size; i++) arr.push([coord[0] + i, coord[1]]);
    }
    return arr;
  };

  const shipName = sName;
  const footprint = setFootprint(size, sCoord, sOrient);
  const hits = Array(size).fill(0);
  let isSunk = false;

  const name = () => name;

  const loc = () => footprint;

  const dmg = () => hits;

  const sunk = () => isSunk;

  const hit = (row, col) => {
    for (let i = 0; i < footprint.length; i++) {
      if (footprint[i][0] == row && footprint[i][1] == col) {
        hits[i] = [row, col];
        checkSunk();
        return hits;
      }
    }
    return false;
  };

  const checkSunk = () => {
    for (let i = 0; i < hits.length; i++) {
      if (hits[i] == 0) return isSunk;
    }
    isSunk = true;
    return isSunk;
  };

  return { name, loc, dmg, sunk, hit };
};

module.exports = { Ship: Ship };
