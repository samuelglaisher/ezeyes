import { initialSettings, Keybindings } from "./react/SettingsSchema";

export function getLargestLesserValue(elems: number[], target: number) {
    let max = -Infinity;
    elems = elems.sort((a,b) => a - b);

    for (let i = 0; i < elems.length; i++) {
        if (elems[i] < target && elems[i] > max) {
            max = elems[i];
        }
    }

    return max;
  }

export function getSmallestLargerValue(elems: number[], target: number) {
    let min = Infinity;
    elems = elems.sort((a,b) => a - b);

    for (let i = 0; i < elems.length; i++) {
        if (elems[i] > target && elems[i] < min) {
            min = elems[i];
        }
    }

    return min;
}

export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

export const isValidKeybinding = (key: keyof Keybindings, value: string): boolean => {
  if (!(key in initialSettings.keybindings)) {
    return false;
  }

  interface SpecialAliases {
      option: string;
      command: string;
      return: string;
      escape: string;
      plus: string;
      mod: string;
      [key: string]: string | boolean;
    }

    const _SPECIAL_ALIASES: SpecialAliases = {
      'option': 'alt',
      'command': 'meta',
      'return': 'enter',
      'escape': 'esc',
      'plus': '+',
      'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
    };

    var _KEYCODE_MAP = {
      106: '*',
      107: '+',
      109: '-',
      110: '.',
      111 : '/',
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: '\''
  };

  const _MAP = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    20: 'capslock',
    27: 'esc',
    32: 'space',
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    45: 'ins',
    46: 'del',
    91: 'meta',
    93: 'meta',
    224: 'meta'
  };

    var keys = value.split('+');
    var isValidKey = function(key: string) {
      var normalizedKey = _SPECIAL_ALIASES[key] as string || key;
      return Object.values(_MAP).includes(normalizedKey) ||
              Object.values(_KEYCODE_MAP).includes(normalizedKey) ||
              Object.values(_SPECIAL_ALIASES).includes(normalizedKey) ||
              (normalizedKey.length === 1 && normalizedKey.match(/[a-z0-9]/i));
    };

    return keys.every(isValidKey);
  }

/**
 * Compare two objects and return the differences
 * @param inital
 * @param saved
 * @returns
 */
export function compare(inital: Object, saved: Object) {
  if (saved === undefined || saved === null) {
    return inital;
  }

  const initKeys = Object.keys(inital);
  const savedKeys = Object.keys(saved);
  var obj = {};

  if (typeof inital !== "object" || typeof saved !== "object") {
    return inital;
  }

  for (var key of initKeys) {
    if (saved.hasOwnProperty(key)){
      Object.entries(inital).forEach(init => {
        if (init[0] === key) {
          Object.entries(saved).forEach(save => {
            if (save[0] === key) {
              Object.assign(obj, {[key]: compare(init[1], save[1])})
            }
          });
        }
      });
    } else {
      Object.entries(inital).forEach(init => {
        if (init[0] === key) {
          Object.assign(obj, {[key]: init[1]});
        }
      });
    }
  }

  return obj;
}
