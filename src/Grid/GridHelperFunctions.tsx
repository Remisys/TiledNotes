import { CardModel } from "../Card/Card";

export const DEFAULT_WIDTH = 4;
export const DEFAULT_HEIGHT = 4;
export interface Point2D {
  x: number;
  y: number;
}
/**
 * Figure out if point is inside a square
 * pStart is element-wise lower than pEnd
 * @param p point coords
 * @param pStart top left coords of square
 * @param pEnd down right coords of square
 * @returns is the point inside a square
 */
export const pointInsideSquare = (
  p: Point2D,
  pStart: Point2D,
  pEnd: Point2D
) => {
  const { x, y } = p;
  const { x: xs, y: ys } = pStart;
  const { x: xe, y: ye } = pEnd;
  return xs <= x && x <= xe && ys <= y && y <= ye;
};
/**
 * Return cells of the grid that are still free
 * @param cards all cards which have used up the spaces in the grid
 * @param w width of the grid
 * @param h height of the grid
 */
export const getFreeSpaces = (
  cards: CardModel[],
  w = DEFAULT_WIDTH,
  h = DEFAULT_HEIGHT
): Point2D[] => {
  /**
   * Can I pick this free point? Or does a card occupy this free spot?
   * @param p point to be inquiried
   * @returns is this point still free i.e. not used by any card
   */
  const isCoordinateOccupied = (p: Point2D) =>
    cards.some(({ startPos, endPos }) =>
      pointInsideSquare(p, startPos, endPos)
    );

  const results = [];
  for (let y = 1; y <= h; y++) {
    for (let x = 1; x <= w; x++) {
      if (!isCoordinateOccupied({ x, y })) results.push({ x, y });
    }
  }
  return results;
};
