const { getSizeLabel } = require('./index');

describe('getSizeLabel', () => {
  describe('XS size (0-35 lines)', () => {
    test('returns XS for 0 lines', () => {
      expect(getSizeLabel(0)).toBe('XS');
    });

    test('returns XS for 1 line', () => {
      expect(getSizeLabel(1)).toBe('XS');
    });

    test('returns XS for 35 lines (boundary)', () => {
      expect(getSizeLabel(35)).toBe('XS');
    });
  });

  describe('S size (36-60 lines)', () => {
    test('returns S for 36 lines (boundary)', () => {
      expect(getSizeLabel(36)).toBe('S');
    });

    test('returns S for 50 lines', () => {
      expect(getSizeLabel(50)).toBe('S');
    });

    test('returns S for 60 lines (boundary)', () => {
      expect(getSizeLabel(60)).toBe('S');
    });
  });

  describe('M size (61-120 lines)', () => {
    test('returns M for 61 lines (boundary)', () => {
      expect(getSizeLabel(61)).toBe('M');
    });

    test('returns M for 90 lines', () => {
      expect(getSizeLabel(90)).toBe('M');
    });

    test('returns M for 120 lines (boundary)', () => {
      expect(getSizeLabel(120)).toBe('M');
    });
  });

  describe('L size (121-240 lines)', () => {
    test('returns L for 121 lines (boundary)', () => {
      expect(getSizeLabel(121)).toBe('L');
    });

    test('returns L for 180 lines', () => {
      expect(getSizeLabel(180)).toBe('L');
    });

    test('returns L for 240 lines (boundary)', () => {
      expect(getSizeLabel(240)).toBe('L');
    });
  });

  describe('XL size (241-600 lines)', () => {
    test('returns XL for 241 lines (boundary)', () => {
      expect(getSizeLabel(241)).toBe('XL');
    });

    test('returns XL for 400 lines', () => {
      expect(getSizeLabel(400)).toBe('XL');
    });

    test('returns XL for 600 lines (boundary)', () => {
      expect(getSizeLabel(600)).toBe('XL');
    });
  });

  describe('XXL size (601+ lines)', () => {
    test('returns XXL for 601 lines (boundary)', () => {
      expect(getSizeLabel(601)).toBe('XXL');
    });

    test('returns XXL for 1000 lines', () => {
      expect(getSizeLabel(1000)).toBe('XXL');
    });

    test('returns XXL for very large PRs', () => {
      expect(getSizeLabel(10000)).toBe('XXL');
    });
  });
});
