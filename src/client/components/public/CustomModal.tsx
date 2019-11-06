import * as React from 'react';
import ReactDom from 'react-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, } from 'reactstrap';
import Form from '../public/Form';

export interface CustomModal {
    isShowing: any,
    hide: any,
    id: number
}

const CustomModal = ({ isShowing, hide, id }) => isShowing ? ReactDom.createPortal(
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