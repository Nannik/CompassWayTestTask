import React, { memo } from 'react';
import {
    Col, Form, Row, Spinner,
    Accordion,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getEmailListEmails } from '../model/selectors/getEmailListEmails';
import { getEmailListIsLoading } from '../model/selectors/getEmailListIsLoading';
import { getEmailListError } from '../model/selectors/getEmailListError';
import { EmailListPager } from '@/widgets/EmailList/ui/EmailListPager';
import Email from '@/widgets/EmailList/ui/Email';

export const EmailList = memo(() => {
    const emails = useSelector(getEmailListEmails);
    const isLoading = useSelector(getEmailListIsLoading);
    const error = useSelector(getEmailListError);

    const bodyBlock = isLoading ? (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    ) : (
        <Accordion>
            {emails.map((email) => (
                <Email
                    key={ email.id }
                    itemKey={ email.id.toString() }
                    recipient={ email.recipient }
                    subject={ email.subject }
                    message={ email.message }
                />
            ))}
        </Accordion>
    );

    return (
        <>
            <Row className="mb-4">
                <Form.Text
                    className="fs-4"
                >
                    Emails list
                </Form.Text>
            </Row>

            <Row className="mb-4 justify-content-center">
                <Col className="d-flex justify-content-center">
                    <EmailListPager />
                </Col>
            </Row>

            <Row className="mb-4 justify-content-center">
                { error && (
                    <Form.Text>
                        {error}
                    </Form.Text>
                ) }
            </Row>

            <Row className="mb-4 justify-content-center">
                { bodyBlock }
            </Row>
        </>
    );
});
