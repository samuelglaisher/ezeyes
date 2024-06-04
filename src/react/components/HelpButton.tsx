import React from 'react';
import HelpIcon from '@spectrum-icons/workflow/Help';
import { Button } from '@adobe/react-spectrum';
import { useMenuManager } from '../hooks/useMenuManager';
import { MenuType } from '../contexts/MenuManagerContext';

function HelpButton() {
    const { openMenu } = useMenuManager();

    return (
        <Button
            variant="secondary"
            onPress={() => openMenu(MenuType.HELP)}
            UNSAFE_style={{
                padding: '17px 27px'
            }}
        >
            <HelpIcon size='XXL'/>
        </Button>
    );
}

export default HelpButton;
