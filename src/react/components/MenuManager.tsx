import React, { useContext } from 'react';
import { Dialog, DialogContainer, Heading } from '@adobe/react-spectrum';
import { MenuManagerContext, MenuType } from '../contexts/MenuManagerContext';
import SettingsMenu from './SettingsMenu';
import { useMenuManager } from '../hooks/useMenuManager';

export const MenuManager: React.FC = () => {
  const { currentMenu } = useContext(MenuManagerContext);
  const { closeMenu } = useMenuManager();

  const renderModalContent = () => {
    switch (currentMenu) {
      case MenuType.SETTINGS:
        return <SettingsMenu onClose={closeMenu} />;
      default:
        return null;
    }
  };

  return (
    <DialogContainer onDismiss={closeMenu} type="modal" isDismissable>
      {currentMenu && (
        <Dialog>
          {renderModalContent()}
        </Dialog>
      )}
    </DialogContainer>
  );
};
