import React from 'react';
import {CardActions} from 'material-ui/Card';
import {
  List, Datagrid, Edit, Create, Show, SimpleShowLayout, SimpleForm,
  DateField, TextField,
  TextInput, DateInput,
  EditButton,ShowButton, DeleteButton, RefreshButton, ListButton, CreateButton
} from 'admin-on-rest';
import {configList, configEdit, configCreate, configShow} from '../config/book';

export const BookList = (props) => (
  <List
    actions={<BookListActions/>}
    {...props}
  >
    <Datagrid>
      {configList.id && <TextField source="id" />}
      {configList.isbn && <TextField source="isbn" />}
      {configList.description && <TextField source="description" />}
      {configList.author && <TextField source="author" />}
      {configList.title && <TextField source="title" />}
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
  <Edit
    actions={<BookEditActions/>}
    title={<BookTitle />}
    {...props}
  >
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
  <Show
    actions={<BookShowActions/>}
    title={<BookTitle />}
    {...props}
  >
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

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

const BookListActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    {configList.buttons.create && <CreateButton basePath={basePath} />}
    {configList.buttons.refresh && <RefreshButton basePath={basePath} record={data} />}
  </CardActions>
);

const BookShowActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    {configShow.buttons.edit && <EditButton basePath={basePath} record={data}/>}
    {configShow.buttons.list && <ListButton basePath={basePath}/>}
    {configShow.buttons.delete && <DeleteButton basePath={basePath} record={data}/>}
    {configShow.buttons.refresh && <RefreshButton basePath={basePath} record={data}/>}
  </CardActions>
);

const BookEditActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    {configShow.buttons.show && <ShowButton basePath={basePath} record={data}/>}
    {configShow.buttons.list && <ListButton basePath={basePath}/>}
    {configShow.buttons.delete && <DeleteButton basePath={basePath} record={data}/>}
    {configShow.buttons.refresh && <RefreshButton basePath={basePath} record={data}/>}
  </CardActions>
);
