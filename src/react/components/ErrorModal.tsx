import React from 'react';
import { Dialog, DialogContainer, Heading, Content, Divider } from '@adobe/react-spectrum';

interface ErrorModalProps {
    error: any,
    resetErrorBoundary: any
}

// TODO: look into https://react-spectrum.adobe.com/react-spectrum/AlertDialog.html
// TODO: develop error handling strategy for these: https://stackoverflow.com/a/57943193
function ErrorModal(props: ErrorModalProps) {
    return (
        (
            <DialogContainer onDismiss={props.resetErrorBoundary} type="modal" isDismissable>
            <Dialog>
                <Heading>⚠️ Something Went Wrong</Heading>
                <Divider />
                <Content>
                    <pre>{props.error.message}</pre>
                    <p>To report this error, send us a message here: <a href="mhurm00@gmail.com">mhurm00@gmail.com</a></p>
                </Content>
            </Dialog>
            </DialogContainer>

        )
    );
}

export default ErrorModal;
