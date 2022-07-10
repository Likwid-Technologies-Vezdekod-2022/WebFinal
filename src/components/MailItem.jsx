import React, { useEffect, useState } from 'react';
import {
  Cell,
  Avatar
} from "@vkontakte/vkui";

import { Icon12Circle } from '@vkontakte/icons';

import available from './AvailableTheme.module.css';

function MailItem({ idx, mail, updateSelectedMails, appearance }) {

  const [category, setCategory] = useState('');

  useEffect(() => {
    if (mail.confidence) setCategory('CONFIDENCE');
    else if (mail.finance) setCategory('FINANCE');
    else if (mail.flag) setCategory('FLAG');
    else if (mail.important) setCategory('IMPORTANT');
    else if (mail.newThread) setCategory('NEW THREAD');
  }, [])

  return (
    <Cell mode="selectable"
        className='mail-item'
        before={<Avatar src={mail.author.avatar} />}
        onChange={e => updateSelectedMails(e.target.checked, idx)}>
            
        <div className='mail-item__header'>
          <div className='mail-item__header'>
            {!mail.read && 
              <span className={appearance === 'available'? available.mailItemNew : 'mail-item__new'}>NEW</span>
            }

            <p className='mail-item__name'>{mail.author.name}</p>

            {category &&
              <span className={appearance === 'available'? available.mailItemCategory : 'mail-item__category'}>{category}</span>
            }
          </div>

          <p>{mail.dateTime}</p>
        </div>

        <p className='mail-item__title'>{mail.title}</p>
        <p className='mail-item__text'>{mail.text}</p>
    </Cell>
  )
}

export default MailItem