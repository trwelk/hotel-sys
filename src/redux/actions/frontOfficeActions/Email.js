import React from 'react';
import { Email, Item, A} from 'react-html-email';
export default function InlineLink({name, children}) {
  return (
  <Email title='link'>
    <Item>
       Hello 
    </Item>
    <Item>
      {children}
    </Item>
  </Email>
)};