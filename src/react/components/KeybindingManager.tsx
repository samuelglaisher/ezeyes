import useKeybindings from '../hooks/useKeybindings';

const KeybindingManager = (): JSX.Element => {
  const dummyUpdateFunction = () => {};
  const defaultSpeed = 1;

  useKeybindings(dummyUpdateFunction, defaultSpeed);

  return null;
};

export default KeybindingManager;
