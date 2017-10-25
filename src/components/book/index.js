import React from 'react';
import {
  List, Datagrid, Edit, Create, Show, SimpleShowLayout, SimpleForm,
  DateField, TextField,
  DisabledInput, TextInput, DateInput,
  EditButton,ShowButton, DeleteButton
} from 'admin-on-rest';
import {configList, configEdit, configCreate, configShow} from '../../config/book';

export const BookList = (props) => (
  <List {...props}>
    <Datagrid>
      {configList.id && <TextField source="id" />}
      {configList.isbn && <TextField source="isbn" />}
      {configList.author && <TextField source="author" />}
      {configList.title && <TextField source="title" />}
      {configList.description && <TextField source="description" />}
      {configList.publicationDate && <TextField source="publicationDate" />}
      {configList.buttons.show && <ShowButton />}
      {configList.buttons.edit && <EditButton />}
      {configList.buttons.delete && <DeleteButton />}
    </Datagrid>
  </List>
);

const BookTitle = ({record}) => {
  return <span>Book {record && record.id ? ` : ${record.id}` : ''}</span>;
};

export const BookEdit = (props) => (
  <Edit title={<BookTitle />} {...props}>
    <SimpleForm>
      {configEdit.id && <TextInput source="id" />}
      {configEdit.isbn && <TextInput source="isbn" />}
      {configEdit.description && <TextInput source="description" />}
      {configEdit.author && <TextInput source="author" />}
      {configEdit.title && <TextInput source="title" />}
      {configEdit.publicationDate && <DateInput source="publicationDate" />}
    </SimpleForm>
  </Edit>
);

export const BookCreate = (props) => (
  <Create title='Create a Book' {...props}>
    <SimpleForm>
      {configCreate.id && <TextInput source="id" />}
      {configCreate.isbn && <TextInput source="isbn" />}
      {configCreate.description && <TextInput source="description" />}
      {configCreate.author && <TextInput source="author" />}
      {configCreate.title && <TextInput source="title" />}
      {configCreate.publicationDate && <DateField source="publicationDate" />}
    </SimpleForm>
  </Create>
);

export const BookShow = (props) => (
  <Show title={<BookTitle />} {...props}>
    <SimpleShowLayout>
      {configShow.id && <TextField source="id" />}
      {configShow.isbn && <TextField source="isbn" />}
      {configShow.description && <TextField source="description" />}
      {configShow.author && <TextField source="author" />}
      {configShow.title && <TextField source="title" />}
      {configShow.publicationDate && <TextField source="publicationDate" />}
    </SimpleShowLayout>
  </Show>
);
