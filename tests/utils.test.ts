import { Keybindings } from '../src/react/SettingsSchema';
import { getSmallestLargerValue, getLargestLesserValue, isInRange, isValidKeybinding, compare } from '../src/utils';

describe('getSmallestLesserValue', () => {
    test('testing that smallest larger value is found for number in list', () => {
        expect(getSmallestLargerValue([0,2,90,4,1,12,123], 2)).toBe(4);
    });

    test('testing that smallest larger value is found for number not in list', () => {
        expect(getSmallestLargerValue([0,2,90,4,1,12,123], 5)).toBe(12);
    });
});

describe('getLargestLesserValue', () => {
    test('testing that largest smaller value is found for number in list', () => {
        expect(getLargestLesserValue([0,2,90,4,1,12,123], 12)).toBe(4);
    });

    test('testing that largest smaller value is found for number not in list', () => {
        expect(getLargestLesserValue([0,2,90,4,1,12,123], 6)).toBe(4);
    });
});

describe('isInRange', () => {
    test('testing that value is in range', () => {
        expect(isInRange(5, 0, 10)).toBe(true);
    });

    test('testing that value is not in range', () => {
        expect(isInRange(11, 0, 10)).toBe(false);
    });
});

describe('isValidKeybinding', () => {
    test('validates single character keys', () => {
      expect(isValidKeybinding('play' as keyof Keybindings, 'a')).toBeTruthy();
      expect(isValidKeybinding('nextWord' as keyof Keybindings, '1')).toBeTruthy();
    });

    test('validates known special keys', () => {
      expect(isValidKeybinding('prevWord' as keyof Keybindings, 'return')).toBeTruthy();
      expect(isValidKeybinding('openSettings' as keyof Keybindings, 'escape')).toBeTruthy();
    });

    test('validates combination of valid keys', () => {
      expect(isValidKeybinding('switchView' as keyof Keybindings, 'mod+option+del')).toBeTruthy();
    });

    test('rejects unknown special keys', () => {
      expect(isValidKeybinding('importFile' as keyof Keybindings, 'fancyKey')).toBeFalsy();
    });

    test('validates modifiers with single character', () => {
      expect(isValidKeybinding('prevParagraph' as keyof Keybindings, 'mod+a')).toBeTruthy();
    });

    test('rejects invalid combinations', () => {
      expect(isValidKeybinding('nextParagraph' as keyof Keybindings, 'mod+option+chocolate')).toBeFalsy();
    });

    test('verify case sensitivity', () => {
      expect(isValidKeybinding('prevSentence' as keyof Keybindings, 'MOD+A')).toBeFalsy();
    });

    test('validates known key codes', () => {
      expect(isValidKeybinding('nextSentence' as keyof Keybindings, '*')).toBeTruthy();
      expect(isValidKeybinding('flipFlashcard' as keyof Keybindings, 'tab')).toBeTruthy();
    });

    test('rejects combinations with invalid length characters', () => {
      expect(isValidKeybinding('backToTop' as keyof Keybindings, 'mod+abc')).toBeFalsy();
    });

    test('validates using aliases', () => {
      expect(isValidKeybinding('play' as keyof Keybindings, 'alt')).toBeTruthy();
      expect(isValidKeybinding('nextWord' as keyof Keybindings, 'meta')).toBeTruthy();
      expect(isValidKeybinding('prevWord' as keyof Keybindings, 'enter')).toBeTruthy();
      expect(isValidKeybinding('openSettings' as keyof Keybindings, 'esc')).toBeTruthy();
      expect(isValidKeybinding('switchView' as keyof Keybindings, '+')).toBeFalsy();
      expect(isValidKeybinding('switchView' as keyof Keybindings, 'shift++')).toBeFalsy();
    });

    //Test setting each keybinding to a valid key
    Object.keys({ play: '', nextWord: '', prevWord: '', openSettings: '', switchView: '', importFile: '', prevParagraph: '', nextParagraph: '', prevSentence: '', nextSentence: '', flipFlashcard: '', backToTop: '' }).forEach(key => {
      test(`ensures '${key}' accepts valid keybinding`, () => {
        expect(isValidKeybinding(key as keyof Keybindings, 'a')).toBeTruthy();
        expect(isValidKeybinding(key as keyof Keybindings, 'ctrl+a')).toBeTruthy();
        expect(isValidKeybinding(key as keyof Keybindings, 'ctrl+shift+a')).toBeTruthy();
        expect(isValidKeybinding(key as keyof Keybindings, 'meta+a')).toBeTruthy();
        expect(isValidKeybinding(key as keyof Keybindings, 'meta+shift+a')).toBeTruthy();
        expect(isValidKeybinding(key as keyof Keybindings, 'fa')).toBeFalsy();
      });
    });
  });

  describe('compare', () => {
    it('returns the initial object if either input is not an object', () => {
      const initial = { a: 1 };
      const saved = "notAnObject";
      const result = compare(initial, saved);
      expect(result).toEqual(initial);
    });

    it('returns the initial object for non-object initial input', () => {
      const initial = "notAnObject";
      const saved = { a: 1 };
      const result = compare(initial, saved);
      expect(result).toEqual(initial);
    });

    it('returns initial object when saved object has no matching keys', () => {
      const initial = { a: 1, b: 2 };
      const saved = { c: 3 };
      const result = compare(initial, saved);
      expect(result).toEqual(initial);
    });

    it('handles nested objects when saved object has non-matching keys', () => {
      const initial = { a: { b: 1 } };
      const saved = { a: { c: 2 } };
      const result = compare(initial, saved);
      const expected = { a: { b: 1 } };
      expect(result).toEqual(expected);
    });

    it('handles multiple nested objects with matching and non-matching keys', () => {
      const initial = { a: { b: 1, c: { d: 3 } } };
      const saved = { a: { b: 2, c: { e: 4 } } };
      const result = compare(initial, saved);
      const expected = initial;
      expect(result).toEqual(expected);
    });

    it('handles when saved is null', () => {
      const initial = { a: { b: 1, c: { d: 3 } } };
      const saved = null as any;
      const result = compare(initial, saved as any);
      const expected = initial;
      expect(result).toEqual(expected);
    });
  });
