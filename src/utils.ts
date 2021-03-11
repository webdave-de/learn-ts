export const blockSize = 60;
export const between = (x: number, min: number, max: number) =>
  x >= min && x <= max;

export const colides = (
  x: number,
  y: number,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  return between(x, startX, endX) && between(y, startY, endY);
};
