import * as React from 'react';
import ReactDom from 'react-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Form from '../public/Form';

export interface CustomModalProps {
    isShowing: any,
    hide: any,
    id: any
}

const CustomModal: React.SFC<CustomModalProps> = ({ isShowing, hide, id }) => isShowing ? ReactDom.createPortal(
    <>
        <Modal isOpen={isShowing} toggle={hide}>
            <ModalHeader>
                Pick a store!
            </ModalHeader>
            <ModalBody>
                <Form
                    id={id}
                    cantsee={hide}
                />
            </ModalBody>
        </Modal>
    </>, document.body
) : null;

export default CustomModal;