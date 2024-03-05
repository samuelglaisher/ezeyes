import React, { useContext } from "react";
import HorizontalPanel from "./panelviews/HorizontalPanel";
import ZoomView from "./panelviews/ZoomView";
import FlashcardView from "./panelviews/FlashcardView";
import VerticalPanel from "./panelviews/VerticalPanel";
import { PanelDisplayType } from "../SettingsSchema";
import { usePanel } from '../hooks/usePanel';
import { PanelContext } from "../contexts/PanelContext";
import { PanelViewportContext } from "../contexts/PanelViewportContext";
import "../styles/index.css";
import SettingsButton from "./SettingsButton";
import { MenuManager } from './MenuManager'
import { Button, ButtonGroup, Flex, Footer, Header } from "@adobe/react-spectrum";
import ChevronDoubleRight from '@spectrum-icons/workflow/ChevronDoubleRight';
import ChevronDoubleLeft from '@spectrum-icons/workflow/ChevronDoubleLeft';
import Play from '@spectrum-icons/workflow/Play';
import Pause from '@spectrum-icons/workflow/Pause';


const PanelViewport: React.FC = () => {
    const { isPlaying } = useContext(PanelContext);
    const { activeView } = useContext(PanelViewportContext);

    const { togglePlayPause, navigateForward, navigateBackward} = usePanel();

    return (
        <>
            <Header margin="size-100">
                <Flex justifyContent="center" width="100%">
                    <SettingsButton />
                </Flex>
            </Header>

            <main>
                <div id="panel-viewport">
                    <MenuManager/>
                    {activeView === PanelDisplayType.HORIZONTAL && <HorizontalPanel />}
                    {activeView === PanelDisplayType.VERTICAL && <VerticalPanel />}
                    {activeView === PanelDisplayType.ZOOM && <ZoomView />}
                    {activeView === PanelDisplayType.FLASHCARD && <FlashcardView />}
                </div>
            </main>

            <Footer>
                <Flex justifyContent="center" width="100%">
                    <ButtonGroup justifySelf="center" alignSelf="center" align="center" margin="size-100">
                        <Button variant="secondary" onPress={navigateBackward}>
                            <ChevronDoubleLeft />
                        </Button>
                        <Button variant="secondary" onPress={togglePlayPause} autoFocus>
                            {isPlaying ? <Pause /> : <Play />}
                        </Button>
                        <Button variant="secondary" onPress={navigateForward} autoFocus>
                            <ChevronDoubleRight />
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Footer>
        </>
    );
};

export default PanelViewport;
