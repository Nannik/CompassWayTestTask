import React, { memo, ReactNode } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

interface ModalProps {
    title: string
    show: boolean
    onHide: () => void
    children: ReactNode
    footer: ReactNode
}
export const Modal = memo((props: ModalProps) => {
    const {
        show,
        onHide,
        children,
        footer,
        title,
    } = props;

    return (
        <BootstrapModal show={ show } onHide={ onHide }>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{title}</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body
                className="p-3"
            >
                {children}
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                {footer}
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
});
