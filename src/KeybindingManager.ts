// type ActionCallback = () => void;

// interface Keybinding {
//   keybind: string;
//   action: ActionCallback;
// }

// class KeybindingManager {
//   private static keybindingsConfig: Record<string, Keybinding> = {};

//   private constructor() {}

//   public static registerKeybinding(action: string, keybinding: Keybinding) {
//     for (const existingAction in this.keybindingsConfig) {
//       if (
//         this.keybindingsConfig[existingAction].keybind === keybinding.keybind &&
//         existingAction !== action
//       ) {
//         console.error("Keybind is already being used for a different action!");
//         return;
//       }
//     }

//     // Update or add the keybinding for the action
//     this.keybindingsConfig[action] = keybinding;
//   }

//   public static unregisterKeybinding(action: string) {
//     if (!this.keybindingsConfig[action]) {
//         console.error("Keybinding must exist to be unregistered!");
//         return;
//     }

//     delete this.keybindingsConfig[action];
//   }

//   public static getKeybindingsConfig() {
//     return this.keybindingsConfig;
//   }
// }

// export default KeybindingManager;
