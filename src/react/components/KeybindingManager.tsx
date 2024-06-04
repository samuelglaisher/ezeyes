import useKeybindings from '../hooks/useKeybindings';

/* istanbul ignore next */
export const KeybindingManager = (): JSX.Element => {
  const dummyUpdateFunction = () => {};
  const defaultSpeed = 1;

  useKeybindings(dummyUpdateFunction, defaultSpeed);

  return null;
};

export default KeybindingManager;
