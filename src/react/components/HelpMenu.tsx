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
  Grid
} from '@adobe/react-spectrum';
import { PanelDisplayType, ThemeType, UISize, WPMAttribute, WPMType } from '../SettingsSchema';
import ArrowLeftIcon from '@spectrum-icons/workflow/ArrowLeft';
import ArrowRightIcon from '@spectrum-icons/workflow/ArrowRight';

import {ColorArea, ColorSlider} from '@react-spectrum/color';
import { SettingsContext } from '../contexts/SettingsContext';
import { useMenuManager } from '../hooks/useMenuManager';
import type {Key} from '@adobe/react-spectrum';

interface HelpMenuProps {
    onClose: () => void;
}

function HelpMenu(props: HelpMenuProps) {
    const { settings, dispatch } = useContext(SettingsContext);
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
                                <Flex direction="column" marginTop={'size-150'} gap="size-150">
                                    EZEyes is very customizable. Here are a few of the key options with explanations of what they do:
                                    <br/><br/>

                                    This setting changes how fast the reader advances. Speed mode adjusts the range of reader speeds - choose normal for fast speeds, and assisted for more relaxed speeds, or if you have issues with processing speed.
                                    <Picker
                                        defaultSelectedKey={WPMType.NORMAL}
                                        label="Speed Mode"
                                        selectedKey={settings.processing.wpm.type}
                                        onSelectionChange={(value) => dispatch({ type: 'UPDATE_WPM_TYPE', value: value as WPMType })}>
                                        <Item key={WPMType.NORMAL}>Normal</Item>
                                        <Item key={WPMType.ASSISTED}>Assisted</Item>
                                    </Picker>
                                    <Slider
                                        label={`Words Per Minute`}
                                        minValue={settings.processing.wpm[settings.processing.wpm.type].min}
                                        maxValue={settings.processing.wpm[settings.processing.wpm.type].max}
                                        value={settings.processing.wpm[settings.processing.wpm.type].current}
                                        onChange={(value) => dispatch({ type: 'UPDATE_WPM_SETTING', wpmType: settings.processing.wpm.type, setting: 'current' as WPMAttribute, value: value})}
                                    />
                                    <br/>

                                    Switch this to "Large" to increase the size of all buttons.
                                    <Picker
                                        defaultSelectedKey={UISize.LARGE}
                                        label="UI Size"
                                        selectedKey={settings.ui.size}
                                        onSelectionChange={(value) => dispatch({type: 'UPDATE_UI_SIZE', value: value as UISize})}>
                                        <Item key={UISize.MEDIUM}>Medium</Item>
                                        <Item key={UISize.LARGE}>Large</Item>
                                    </Picker>
                                    <br/>

                                    This controls the size of words in the reader. Increase it if you have trouble making out the words.
                                    <NumberField label="Reader Panel Font Size" defaultValue={settings.readerPanel.fontSize} minValue={1} onChange={(value) => dispatch({type: 'UPDATE_READER_PANEL_FONT_SIZE', value: value})}/>
                                    <br/>

                                    This controls the size of words in the text input panel, where you can click to navigate through the document.
                                    <NumberField label="Text Panel Font Size" defaultValue={settings.textInputPanel.fontSize} minValue={1} onChange={(value) => dispatch({type: 'UPDATE_TEXT_INPUT_FONT_SIZE', value: value})}/>
                                    <br/>
                                    
                                    This determines which display mode shows when EZEyes starts up. To see what each of these displays looks like, press "{settings.keybindings.switchView}" to cycle through them.
                                    <Picker
                                        defaultSelectedKey={PanelDisplayType.HORIZONTAL}
                                        label="Default Display Type"
                                        selectedKey={settings.ui.defaultDisplayType}
                                        onSelectionChange={(value) => dispatch({type: 'UPDATE_UI_DEFAULT_DISPLAY', value: value as PanelDisplayType})}>
                                        <Item key={PanelDisplayType.HORIZONTAL}>Horizontal</Item>
                                        <Item key={PanelDisplayType.VERTICAL}>Vertical</Item>
                                        <Item key={PanelDisplayType.ZOOM}>Zoom</Item>
                                        <Item key={PanelDisplayType.FLASHCARD}>Flashcard</Item>
                                    </Picker>
                                    <br/>
                                    
                                    Use the 3 color sliders to change the color and increase the alpha to add a color overlay to EZEyes. This is especially useful if you have Irlen Syndrome.
                                    <fieldset style={{ border: 0 }}>
                                        <ColorSlider defaultValue="#ff0000" value={settings.ui.overlayColor} onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})} channel="red" />
                                        <ColorSlider defaultValue="#00ff00" value={settings.ui.overlayColor} onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})} channel="green" />
                                        <ColorSlider defaultValue="#0000ff" value={settings.ui.overlayColor} onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})} channel="blue" />
                                        <ColorSlider channel="alpha" value={settings.ui.overlayColor} onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})} />
                                    </fieldset>
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
                <Button variant="secondary" onPress={props.onClose}>Close</Button>
            </ButtonGroup>
        </>
    );
}

export default HelpMenu;
