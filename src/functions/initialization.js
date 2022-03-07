const makeBoard = () => {
  return [...Array(7)].map(e => Array(7).fill(""));
}

const makeNewPaths = () => {
  const arr = [[1, 1, 1, 1, 0, 0, 0],
              [1, 1, 1, 1, 0, 0, 0],
              [1, 1, 1, 1, 0, 0, 0],
              [3, 3, 3, 4, 2, 2, 2],
              [3, 3, 3, 4, 2, 2, 2],
              [3, 3, 3, 4, 2, 2, 2],
              [3, 3, 3, 4, 2, 2, 2]]
  return arr;
}

export {makeNewPaths, makeBoard}