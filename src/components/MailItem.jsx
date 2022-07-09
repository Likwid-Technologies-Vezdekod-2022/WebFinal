import React from 'react';
import {
  Cell,
} from "@vkontakte/vkui";

import { Icon12Circle } from '@vkontakte/icons';

function MailItem({ idx, mail, updateSelectedMails }) {
  return (
    <Cell mode="selectable"
        className='mail-item'
        onChange={e => updateSelectedMails(e.target.checked, idx)}>
            
        <div className='mail-item__header'>
          <div className='mail-item__header'>
            {!mail.read && 
              <Icon12Circle color='ff0000' width={15} height={15} />
            }

            <p className='mail-item__name'>{mail.author.name}</p>
          </div>

          <p>{mail.dateTime}</p>
        </div>

        <p className='mail-item__title'>{mail.title}</p>
        <p className='mail-item__text'>{mail.text}</p>
    </Cell>
  )
}

export default MailItem