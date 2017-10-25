import React from 'react'
import { Resource, Delete } from 'admin-on-rest'
import { BookCreate, BookEdit, BookList, BookShow } from '../components/book';

export default (
    <Resource
      key='books'
      name='books'
      list={ BookList }
      create={ BookCreate }
      edit={ BookEdit }
      show={ BookShow }
      remove={Delete}
    />
);
