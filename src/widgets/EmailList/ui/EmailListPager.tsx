import React, { useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { emailsListActions } from '@/widgets/EmailList/model/slice/emailsListSlice';
import { getEmailListPage } from '@/widgets/EmailList/model/selectors/getEmailListPage';
import { getEmailListCount } from '@/widgets/EmailList/model/selectors/getEmailListCount';
import { EMAIL_LIST_LIMIT } from '@/widgets/EmailList/model/const/constVariables';
import { fetchEmails } from '@/widgets/EmailList/model/services/fetchEmails';

export const EmailListPager = () => {
    const dispatch = useAppDispatch();

    const page = useSelector(getEmailListPage);
    const count = useSelector(getEmailListCount);

    const handleNextPageClick = useCallback(() => {
        if (page + 1 > Math.floor(count / EMAIL_LIST_LIMIT)) return;
        dispatch(emailsListActions.setPage(page + 1));
    }, [ dispatch, page, count ]);

    const handlePrevPageClick = useCallback(() => {
        if (page - 1 < 0) return;
        dispatch(emailsListActions.setPage(page - 1));
    }, [ dispatch, page ]);

    useEffect(() => {
        dispatch(fetchEmails({
            limit: EMAIL_LIST_LIMIT,
            offset: page * EMAIL_LIST_LIMIT,
        }));
    }, [ dispatch, page ]);

    return (
        <div>
            <Button
                disabled={ page - 1 < 0 }
                onClick={ handlePrevPageClick }
            >
                &lt;
            </Button>
            <Form.Label>
                {page + 1}
            </Form.Label>
            <Button
                disabled={ (page + 1 >= Math.ceil(count / EMAIL_LIST_LIMIT)) }
                onClick={ handleNextPageClick }
            >
                &gt;
            </Button>
        </div>
    );
};
