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
                        <Item key="wizard">Customization</Item>
                    </TabList>
                    <TabPanels height="size-3600">
                        <Item key="basics">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column"  marginTop={'size-150'}>
                                    Welcome to EZEyes! EZEyes is a reader tool made for people recovering from a traumatic brain injury. To use it, simply load in some text, hit the play button, and read the changing words at the center of the screen. By reducing eye movement, EZEyes makes reading easier and more convenient. This guide is here to help you get the most out of EZEyes - explaining features and things you can do to customize your experience.

                                    <Heading marginBottom={0}>Loading Text</Heading>
                                    Before you start reading, you need to give EZEyes something to read from. You can either read from a local file on your computer or copy-paste text from somewhere else. To load a file, hit "File", then "Load File", then choose a Word doc, PDF, or text file (.txt) to read from. To read text from somewhere else, copy it (Ctrl+C on Windows), click on the reader panel, then paste it in (Ctrl+V on Windows).

                                    <Heading marginBottom={0}>Reading</Heading>
                                    To start reading, click the pause button at the bottom middle of the screen. To stop, click the button again.

                                    <Flex gap='size-150' marginTop={'size-150'}>
                                        <Button variant='primary' onPress={e => setSection('extra')}>
                                            Next Page
                                            <ArrowRightIcon size='XXL'/>
                                        </Button>
                                    </Flex>
                                </Flex>
                            </View>
                        </Item>
                        <Item key="extra">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" marginTop={'size-150'}>
                                    <Heading margin={0}>Navigation</Heading>
                                    Click on a word in the reader panel to move the reader there. You can also click the buttons to the left and right of the play button to go forward or back one word.

                                    <Heading marginBottom={0}>Import Previous</Heading>
                                    If you close EZEyes and want to come back to an article later, you can get back to where you left off by hitting "File", "Import Previous" then the name of the file you loaded before.

                                    <Heading marginBottom={0}>Shortcuts</Heading>
                                    Most actions in EZEyes can be performed by hitting a key on your keyboard. For example, you can press "{settings.keybindings.openSettings}" to open the settings menu.

                                    <Flex gap='size-150' marginTop={'size-150'}>
                                        <Button variant='primary' onPress={e => setSection('basics')}>
                                            <ArrowLeftIcon size='XXL'/>
                                            Previous Page
                                        </Button>
                                        <Button variant='primary' onPress={e => setSection('wizard')}>
                                            Next Page
                                            <ArrowRightIcon size='XXL'/>
                                        </Button>
                                    </Flex>
                                </Flex>
                            </View>
                        </Item>
                        <Item key="wizard">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" marginTop={'size-150'}>
                                    EZEyes is very customizable. Here are a few of the key options with explanations of what they do:
                
                                    <Flex gap='size-150' marginTop={'size-150'}>
                                        <Button variant='primary' onPress={e => setSection('extra')}>
                                            <ArrowLeftIcon size='XXL'/>
                                            Previous Page
                                        </Button>
                                    </Flex>
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
