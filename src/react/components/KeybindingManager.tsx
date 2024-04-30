import useKeybindings from '../hooks/useKeybindings';

/* istanbul ignore next */
const KeybindingManager = (): JSX.Element => {
  useKeybindings();

  return null;
};

export default KeybindingManager;
