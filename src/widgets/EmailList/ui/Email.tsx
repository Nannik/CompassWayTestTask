import React, { memo } from 'react';
import { Accordion } from 'react-bootstrap';
import parse from 'html-react-parser';

interface EmailProps {
    recipient: string
    subject: string
    message: string
    itemKey: string
}

const Email = memo((props: EmailProps) => {
    const {
        recipient,
        subject,
        message,
        itemKey,
    } = props;

    return (
        <Accordion.Item eventKey={ itemKey.toString() }>
            <Accordion.Header>Subject: {subject}. Recipient: {recipient}</Accordion.Header>
            <Accordion.Body>
                {parse(message)}
            </Accordion.Body>
        </Accordion.Item>
    );
});

export default Email;
