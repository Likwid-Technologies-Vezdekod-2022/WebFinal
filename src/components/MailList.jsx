import React, { useState } from 'react';
import {
    Header,
    List,
} from "@vkontakte/vkui";

import MailItem from './MailItem';

function MailList({ mails, updateSelectedMails }) {
    return (
        <List
        header={<Header mode="secondary">Items</Header>}>
            {mails.map((mail, idx) =>
                <MailItem 
                    mail={mail}
                    key={idx}
                    updateSelectedMails={updateSelectedMails}
                    idx={idx}
                />
            )}
        </List>
    )
}

export default MailList