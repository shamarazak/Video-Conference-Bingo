//Check if two arrays are equal
export const arraysAreEqual = (array1: number[], array2: number[]): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
};

//Generate all possible winning patterns
export const generateWinningPatterns = (PARSED_SIZE: number) => {
  const rows: number[][] = [];
  const columns: number[][] = [];
  const diagonals: number[][] = [[], []];

  //Generate rows and columns
  for (let i = 0; i < PARSED_SIZE; i++) {
    const row = [];
    const column = [];
    for (let j = 0; j < PARSED_SIZE; j++) {
      row.push(i * PARSED_SIZE + j);
      column.push(i + j * PARSED_SIZE);
    }
    rows.push(row);
    columns.push(column);
  }

  //Generate diagonals
  for (let i = 0; i < PARSED_SIZE; i++) {
    diagonals[0].push(i * (PARSED_SIZE + 1));
    diagonals[1].push((i + 1) * (PARSED_SIZE - 1));
  }

  return [...rows, ...columns, ...diagonals];
};

//Shuffle an array
export const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
