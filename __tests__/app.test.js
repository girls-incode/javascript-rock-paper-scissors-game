import {RpsGame} from '../rps-game';
import '@testing-library/jest-dom';
jest.mock('../rps-game');

describe('Game test', () => {
  let rpsGame, size;

  beforeAll(() => {
    rpsGame = new RpsGame();
    size = 3;
  });

  it('should call the class constructor', () => {
      expect(RpsGame).toHaveBeenCalledTimes(1);
      expect(rpsGame).toBeTruthy();
  });

  it('should determine the winner', () => {
    const spy = jest.spyOn(rpsGame, 'getWinner');
    let status = ['tie', 'win', 'lose'];
    const winner = jest.fn((p1, p2) => {
      return ((p2 - p1 + 3) % 3)
    });
    rpsGame.getWinner(0, 1);
    expect(rpsGame.getWinner).toHaveBeenCalled();
    expect(rpsGame.getWinner).toHaveBeenCalledWith(0, 1);
    
    expect(winner(0,0)).toBe(0);
    expect(winner(0,1)).toBe(1);
    expect(winner(0,2)).toBe(2);

    expect(winner(1,0)).toBe(2);
    expect(winner(1,1)).toBe(0);
    expect(winner(1,2)).toBe(1);

    expect(winner(2,0)).toBe(1);
    expect(winner(2,1)).toBe(2);
    expect(winner(2,2)).toBe(0);
  });
});
