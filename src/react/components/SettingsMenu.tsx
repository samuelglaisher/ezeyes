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

import { SettingsContext } from '../contexts/SettingsContext';
import { useMenuManager } from '../hooks/useMenuManager';
import { PanelDisplayType, ThemeType, UISize, WPMAttribute, WPMType } from '../SettingsSchema';
import { KeybindInput } from './KeybindInput';
import { ColorSlider } from '@react-spectrum/color';

interface SettingsMenuProps {
    onClose: () => void;
}

function SettingsMenu(props: SettingsMenuProps) {
    const { settings, dispatch } = useContext(SettingsContext);
    const { closeMenu } = useMenuManager();

    return (
        <>
            <Heading>Settings</Heading>
            <Content>
                <Tabs aria-label="Settings Tabs" width={500}>
                    <TabList>
                        <Item key="processing">Processing</Item>
                        <Item key="display">Display</Item>
                        <Item key="filter">Filter</Item>
                        <Item key="overlay">Overlay</Item>
                        <Item key="keybinds">Keybindings</Item>
                    </TabList>
                    <TabPanels height="size-3600">
                        <Item key="processing">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    <Picker
                                        data-testid="speed-mode-picker"
                                        defaultSelectedKey={WPMType.NORMAL}
                                        label="Speed Mode"
                                        selectedKey={settings.processing.wpm.type}
                                        onSelectionChange={(value) => dispatch({ type: 'UPDATE_WPM_TYPE', value: value as WPMType })}>
                                        <Item key={WPMType.NORMAL}>Normal</Item>
                                        <Item key={WPMType.ASSISTED}>Assisted</Item>
                                    </Picker>
                                    <Slider
                                        data-testid="wpm-slider-field"
                                        label={`Words Per Minute`}
                                        minValue={settings.processing.wpm[settings.processing.wpm.type].min}
                                        maxValue={settings.processing.wpm[settings.processing.wpm.type].max}
                                        value={settings.processing.wpm[settings.processing.wpm.type].current}
                                        onChange={(value) => dispatch({ type: 'UPDATE_WPM_SETTING', wpmType: settings.processing.wpm.type, setting: 'current' as WPMAttribute, value: value})}
                                    />
                                    <NumberField
                                        data-testid="word-sequence-length-field"
                                        label="Word Sequence Length"
                                        defaultValue={settings.processing.wordSequenceLength}
                                        minValue={1}
                                        onChange={(value) => dispatch({type: 'UPDATE_WORD_SEQUENCE_LENGTH', value: value})}
                                    />
                                    <NumberField
                                        data-testid="wpm-delta-field"
                                        label="WPM Delta"
                                        defaultValue={settings.processing.wpm.delta}
                                        minValue={1}
                                        onChange={(value) => dispatch({type: 'UPDATE_WPM_DELTA', value: value})}
                                    />
                                </Flex>
                            </View>
                        </Item>
                        <Item key="display">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    <Picker
                                        data-testid="ui-size-picker"
                                        defaultSelectedKey={UISize.LARGE}
                                        label="UI Size"
                                        selectedKey={settings.ui.size}
                                        onSelectionChange={(value) => dispatch({type: 'UPDATE_UI_SIZE', value: value as UISize})}>
                                        <Item key={UISize.MEDIUM}>Medium</Item>
                                        <Item key={UISize.LARGE}>Large</Item>
                                    </Picker>
                                    <Picker
                                        data-testid="theme-picker"
                                        defaultSelectedKey={ThemeType.DARK}
                                        label="Theme"
                                        selectedKey={settings.ui.theme}
                                        onSelectionChange={(value) => dispatch({type: 'UPDATE_UI_THEME', value: value as ThemeType})}>
                                        <Item key={ThemeType.LIGHT}>Light</Item>
                                        <Item key={ThemeType.DARK}>Dark</Item>
                                    </Picker>
                                    <Picker
                                        data-testid="display-type-picker"
                                        defaultSelectedKey={PanelDisplayType.HORIZONTAL}
                                        label="Default Display Type"
                                        selectedKey={settings.ui.defaultDisplayType}
                                        onSelectionChange={(value) => dispatch({type: 'UPDATE_UI_DEFAULT_DISPLAY', value: value as PanelDisplayType})}>
                                        <Item key={PanelDisplayType.HORIZONTAL}>Horizontal</Item>
                                        <Item key={PanelDisplayType.VERTICAL}>Vertical</Item>
                                        <Item key={PanelDisplayType.ZOOM}>Zoom</Item>
                                            <Item key={PanelDisplayType.FLASHCARD}>Flashcard</Item>
                                    </Picker>
                                    <NumberField
                                        data-testid="text-panel-font-size-field"
                                        label="Text Panel Font Size"
                                        defaultValue={settings.textInputPanel.fontSize}
                                        minValue={1}
                                        onChange={(value) => dispatch({type: 'UPDATE_TEXT_INPUT_FONT_SIZE', value: value})}
                                    />
                                    <NumberField
                                        data-testid="reader-panel-font-size-field"
                                        label="Reader Panel Font Size"
                                        defaultValue={settings.readerPanel.fontSize}
                                        minValue={1}
                                        onChange={(value) => dispatch({type: 'UPDATE_READER_PANEL_FONT_SIZE', value: value})}
                                    />
                                </Flex>
                            </View>
                        </Item>
                        <Item key="overlay">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    <fieldset style={{ border: 0 }}>
                                        <Flex direction="column">
                                            <ColorSlider
                                                data-testid="overlay-color-red-slider"
                                                defaultValue="#ff0000"
                                                value={settings.ui.overlayColor}
                                                onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})}
                                                channel="red"
                                            />
                                            <ColorSlider
                                                data-testid="overlay-color-green-slider"
                                                defaultValue="#00ff00"
                                                value={settings.ui.overlayColor}
                                                onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})}
                                                channel="green"
                                            />
                                            <ColorSlider
                                                data-testid="overlay-color-blue-slider"
                                                defaultValue="#0000ff"
                                                value={settings.ui.overlayColor}
                                                onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})}
                                                channel="blue"
                                            />
                                            <ColorSlider
                                                data-testid="overlay-color-alpha-slider"
                                                channel="alpha"
                                                value={settings.ui.overlayColor}
                                                showValueLabel={false}
                                                onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})}
                                            />
                                        </Flex>
                                    </fieldset>
                                </Flex>
                            </View>
                        </Item>
                        <Item key="filter">
                            <View height="size-3600" width="size-5500" overflow="auto" overflow-x="hidden">
                                <Grid
                                    columns={['1fr', '1fr']}
                                    gap="size-200"
                                    autoRows="size-800"
                                >
                                    <Slider
                                        data-testid="blur-slider"
                                        label="Blur"
                                        defaultValue={settings.ui.blur}
                                        minValue={0}
                                        maxValue={10}
                                        step={0.1}
                                        onChange={(value) => dispatch({type: 'UPDATE_UI_BLUR', value: value})}
                                    />
                                    <Slider
                                        data-testid="brightness-slider"
                                        label="Brightness"
                                        defaultValue={settings.ui.brightness}
                                        minValue={0}
                                        maxValue={3}
                                        step={0.1}
                                        onChange={(value) => dispatch({type: 'UPDATE_UI_BRIGHTNESS', value: value})}
                                    />
                                    <Slider
                                        data-testid="contrast-slider"
                                        label="Contrast"
                                        defaultValue={settings.ui.contrast}
                                        minValue={0}
                                        maxValue={3}
                                        step={0.1}
                                        onChange={(value) => dispatch({type: 'UPDATE_UI_CONTRAST', value: value})}
                                    />
                                    <Slider
                                        data-testid="grayscale-slider"
                                        label="Grayscale"
                                        defaultValue={settings.ui.grayscale}
                                        minValue={0}
                                        maxValue={1}
                                        step={0.01}
                                        onChange={(value) => dispatch({type: 'UPDATE_UI_GRAYSCALE', value: value})}
                                    />
                                    <Slider
                                        data-testid="hue-rotate-slider"
                                        label="Hue Rotate"
                                        defaultValue={settings.ui.hueRotate}
                                        minValue={0}
                                        maxValue={360}
                                        step={1}
                                        onChange={(value) => dispatch({type: 'UPDATE_UI_HUE_ROTATE', value: value})}
                                    />
                                    <Slider
                                        data-testid="invert-slider"
                                        label="Invert"
                                        defaultValue={settings.ui.invert}
                                        minValue={0}
                                        maxValue={1}
                                        step={0.01}
                                        onChange={(value) => dispatch({type: 'UPDATE_UI_INVERT', value: value})}
                                    />
                                    <Slider
                                        data-testid="opacity-slider"
                                        label="Opacity"
                                        defaultValue={settings.ui.opacity}
                                        minValue={0}
                                        maxValue={1}
                                        step={0.01}
                                        onChange={(value) => dispatch({type: 'UPDATE_UI_OPACITY', value: value})}
                                    />
                                    <Slider
                                        data-testid="saturate-slider"
                                        label="Saturate"
                                        defaultValue={settings.ui.saturate}
                                        minValue={0}
                                        maxValue={3}
                                        step={0.1}
                                        onChange={(value) => dispatch({type: 'UPDATE_UI_SATURATE', value: value})}
                                    />
                                    <Slider
                                        data-testid="sepia-slider"
                                        label="Sepia"
                                        defaultValue={settings.ui.sepia}
                                        minValue={0}
                                        maxValue={1}
                                        step={0.01}
                                        onChange={(value) => dispatch({type: 'UPDATE_UI_SEPIA', value: value})}
                                    />
                                </Grid>
                            </View>
                        </Item>
                        <Item key="keybinds">
                            <View height="size-3600" overflow="auto">
                                <Grid
                                columns={['1fr', '1fr', '1fr']}
                                gap="size-0"
                                autoRows="size-800"
                                >
                                    <KeybindInput key="play" keycode="play" label="Play/pause" keyValue={settings.keybindings.play} data-testid="play-keybind-input" />
                                    <KeybindInput key="nextWord" keycode="nextWord" label="Next word" keyValue={settings.keybindings.nextWord} data-testid="nextWord-keybind-input" />
                                    <KeybindInput key="prevWord" keycode="prevWord" label="Previous word" keyValue={settings.keybindings.prevWord} data-testid="prevWord-keybind-input" />
                                    <KeybindInput key="openSettings" keycode="openSettings" label="Open settings" keyValue={settings.keybindings.openSettings} data-testid="openSettings-keybind-input" />
                                    <KeybindInput key="openHelp" keycode="openHelp" label="Open help/tutorial" keyValue={settings.keybindings.openHelp}  data-testid="openHelp-keybind-input" />
                                    <KeybindInput key="switchView" keycode="switchView" label="Switch panel view" keyValue={settings.keybindings.switchView} data-testid="switchView-keybind-input" />
                                    <KeybindInput key="importFile" keycode="importFile" label="Import file menu" keyValue={settings.keybindings.importFile} data-testid="importFile-keybind-input" />
                                    <KeybindInput key="prevParagraph" keycode="prevParagraph" label="Previous paragraph" keyValue={settings.keybindings.prevParagraph} data-testid="prevParagraph-keybind-input" />
                                    <KeybindInput key="nextParagraph" keycode="nextParagraph" label="Next paragraph" keyValue={settings.keybindings.nextParagraph} data-testid="nextParagraph-keybind-input" />
                                    <KeybindInput key="prevSentence" keycode="prevSentence" label="Previous sentence" keyValue={settings.keybindings.prevSentence} data-testid="prevSentence-keybind-input" />
                                    <KeybindInput key="nextSentence" keycode="nextSentence" label="Next sentence" keyValue={settings.keybindings.nextSentence} data-testid="nextSentence-keybind-input" />
                                    <KeybindInput key="flipFlashcard" keycode="flipFlashcard" label="Flip flashcard" keyValue={settings.keybindings.flipFlashcard} data-testid="flipFlashcard-keybind-input" />
                                    <KeybindInput key="backToTop" keycode="backToTop" label="Back to top" keyValue={settings.keybindings.backToTop} data-testid="backToTop-keybind-input" />
                                    <KeybindInput key="search" keycode="search" label="Search" keyValue={settings.keybindings.search} data-testid="search-keybind-input" />
                                    <KeybindInput key="increaseSpeed" keycode="increaseSpeed" label="Increase speed" keyValue={settings.keybindings.increaseSpeed} data-testid="increaseSpeed-keybind-input" />
                                    <KeybindInput key="decreaseSpeed" keycode="decreaseSpeed" label="Decrease speed" keyValue={settings.keybindings.decreaseSpeed} data-testid="decreaseSpeed-keybind-input" />
                                </Grid>
                            </View>
                        </Item>
                    </TabPanels>
                </Tabs>
            </Content>
            <ButtonGroup>
                <Button variant="secondary" onPress={closeMenu} data-testid="close-menu-button">Cancel</Button>
            </ButtonGroup>
        </>
    );
}

export default SettingsMenu;
