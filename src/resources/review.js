import React from 'react'
import { Resource, Delete } from 'admin-on-rest'
import { ReviewCreate, ReviewEdit, ReviewList, ReviewShow } from '../components/review';

export default (
    <Resource
      key='reviews'
      name='reviews'
      list={ ReviewList }
      create={ ReviewCreate }
      edit={ ReviewEdit }
      show={ ReviewShow }
      remove={Delete}
    />
);
