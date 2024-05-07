import React, { useContext } from 'react';
import {
  Heading,
  Content,
  ButtonGroup,
  Button,
  Flex,
  Slider,
  Picker,
  Item,
  TabList,
  TabPanels,
  Tabs,
  NumberField,
  View,
  Grid,
} from '@adobe/react-spectrum';

import {ColorArea, ColorSlider} from '@react-spectrum/color';
import {parseColor} from '@react-stately/color';
import { SettingsContext } from '../contexts/SettingsContext';
import { useMenuManager } from '../hooks/useMenuManager';
import { PanelDisplayType, ThemeType, UISize, WPMAttribute, WPMType } from '../SettingsSchema';
import { KeybindInput } from './KeybindInput';

interface HelpMenuProps {
    onClose: () => void;
}

function HelpMenu(props: HelpMenuProps) {
    const { settings, dispatch } = useContext(SettingsContext);
    const { closeMenu } = useMenuManager();

    return (
        <>
            <Heading>Tutorial</Heading>
            <Content>
                <Tabs aria-label="Settings Tabs" width={500}>
                    <TabList>
                        <Item key="basics">Basics</Item>
                        <Item key="extra">Other Features</Item>
                        <Item key="keybinds">Keybinds</Item>
                        <Item key="wizard">Wizard</Item>
                    </TabList>
                    <TabPanels height="size-3600">
                        <Item key="basics">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    lksadjlksad
                                </Flex>
                            </View>
                        </Item>
                        <Item key="extra">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    asdjlksajlkd
                                </Flex>
                            </View>
                        </Item>
                        <Item key="keybinds">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    asdlksajlkd
                                </Flex>
                            </View>
                        </Item>
                        <Item key="wizard">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    asdjkasdjasd
                                </Flex>
                            </View>
                        </Item>
                    </TabPanels>
                </Tabs>
            </Content>
            <ButtonGroup>
                <Button variant="secondary" onPress={closeMenu}>Close</Button>
            </ButtonGroup>
        </>
    );
}

export default HelpMenu;
