import React, { useContext } from 'react';
import {
  Heading,
  Content,
  ButtonGroup,
  Button,
  Flex,
  Item,
  TabList,
  TabPanels,
  Tabs,
  View,
} from '@adobe/react-spectrum';
import ArrowLeftIcon from '@spectrum-icons/workflow/ArrowLeft';
import ArrowRightIcon from '@spectrum-icons/workflow/ArrowRight';

import { SettingsContext } from '../contexts/SettingsContext';
import { useMenuManager } from '../hooks/useMenuManager';
import type {Key} from '@adobe/react-spectrum';

interface HelpMenuProps {
    onClose: () => void;
}

function HelpMenu(props: HelpMenuProps) {
    const { settings, dispatch } = useContext(SettingsContext);
    const { closeMenu } = useMenuManager();
    let [section, setSection] = React.useState<Key>('basics');

    return (
        <>
            <Heading>Tutorial</Heading>
            <Content>
                <Tabs aria-label="Help Tabs" 
                selectedKey={section}
                onSelectionChange={setSection}
                width={500}>
                    <TabList>
                        <Item key="basics">Basics</Item>
                        <Item key="extra">Other Features</Item>
                        <Item key="keybinds">Keybinds</Item>
                        <Item key="wizard">Wizard</Item>
                    </TabList>
                    <TabPanels height="size-3600">
                        <Item key="basics">
                            <View height="size-3000" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    Welcome to EZEyes! EZEyes is a reader tool intended to help people recovering from traumatic brain injuries. To use it, simply load in some text, hit the play button, and keep your focus on the words flashing at the center of the screen. By reducing eye movement, EZEyes makes reading easier and less tiring, so you can spend more time doing it.

                                    <Heading>Loading Text</Heading>
                                    To read from a file on your computer, go to the top left, hit "File", then "Load File". This will open your computer's file manager, where you can choose a Word doc, PDF, or text file to read from. Opening the file will load the text into the reader.

                                    Alternatively, you can paste text you have copied if you have the text input panel selected.
                                    <Heading>Reading Text</Heading>
                                    To start reading, click the pause/unpause button at the bottom middle of the screen. Words will appear at the center of the panel at a fixed rate that can be modified through settings. 
                                </Flex>
                            </View>
                            <Flex position='absolute' bottom='0' gap="size-150">
                                <Button variant='primary' onPress={e => setSection('extra')}>
                                    Next Page
                                    <ArrowRightIcon size='XXL'/>
                                </Button>
                            </Flex>
                        </Item>
                        <Item key="extra">
                            <View height="size-3000" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    asdjlksajlkd
                                </Flex>
                            </View>
                            <Flex position='absolute' bottom='0' gap="size-150">
                                <Button variant='primary' onPress={e => setSection('basics')}>
                                    <ArrowLeftIcon size='XXL'/>
                                    Previous Page
                                </Button>
                                <Button variant='primary' onPress={e => setSection('keybinds')}>
                                    Next Page
                                    <ArrowRightIcon size='XXL'/>
                                </Button>
                            </Flex>
                        </Item>
                        <Item key="keybinds">
                            <View height="size-3000" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    asdlksajlkd
                                </Flex>
                            </View>
                            <Flex position='absolute' bottom='0' gap="size-150">
                                <Button variant='primary' onPress={e => setSection('extra')}>
                                    <ArrowLeftIcon size='XXL'/>
                                    Previous Page
                                </Button>
                                <Button variant='primary' onPress={e => setSection('wizard')}>
                                    Next Page
                                    <ArrowRightIcon size='XXL'/>
                                </Button>
                            </Flex>
                        </Item>
                        <Item key="wizard">
                            <View height="size-3000" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    asdjkasdjasd
                                </Flex>
                            </View>
                            <Flex position='absolute' bottom='0' gap="size-150">
                                <Button variant='primary' onPress={e => setSection('keybinds')}>
                                    Previous Page
                                    <ArrowLeftIcon size='XXL'/>
                                </Button>
                            </Flex>
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
