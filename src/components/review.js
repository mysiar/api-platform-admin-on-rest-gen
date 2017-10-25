import React from 'react';
import {CardActions} from 'material-ui/Card';
import {
  List, Datagrid, Edit, Create, Show, SimpleShowLayout, SimpleForm,
  DateField, TextField,
  TextInput, DateInput,
  EditButton,ShowButton, DeleteButton, RefreshButton, ListButton, CreateButton
} from 'admin-on-rest';
import {configList, configEdit, configCreate, configShow} from '../config/review';

export const ReviewList = (props) => (
  <List
    actions={<ReviewListActions/>}
    {...props}
  >
    <Datagrid>
      {configList.id && <TextField source="id" />}
      {configList.rating && <TextField source="rating" />}
      {configList.body && <TextField source="body" />}
      {configList.book && <TextField source="book" />}
      {configList.author && <TextField source="author" />}
      {configList.publicationDate && <TextField source="publicationDate" />}
      {configList.buttons.show && <ShowButton />}
      {configList.buttons.edit && <EditButton />}
      {configList.buttons.delete && <DeleteButton />}
    </Datagrid>
  </List>
);

const ReviewTitle = ({record}) => {
  return <span>Review {record && record.id ? ` : ${record.id}` : ''}</span>;
};

export const ReviewEdit = (props) => (
  <Edit
    actions={<ReviewEditActions/>}
    title={<ReviewTitle />}
    {...props}
  >
    <SimpleForm>
      {configEdit.id && <TextInput source="id" />}
      {configEdit.rating && <TextInput source="rating" />}
      {configEdit.body && <TextInput source="body" />}
      {configEdit.book && <TextInput source="book" />}
      {configEdit.author && <TextInput source="author" />}
      {configEdit.publicationDate && <DateInput source="publicationDate" />}
    </SimpleForm>
  </Edit>
);

export const ReviewCreate = (props) => (
  <Create title='Create a Review' {...props}>
    <SimpleForm>
      {configCreate.id && <TextInput source="id" />}
      {configCreate.rating && <TextInput source="rating" />}
      {configCreate.body && <TextInput source="body" />}
      {configCreate.book && <TextInput source="book" />}
      {configCreate.author && <TextInput source="author" />}
      {configCreate.publicationDate && <DateField source="publicationDate" />}
    </SimpleForm>
  </Create>
);

export const ReviewShow = (props) => (
  <Show
    actions={<ReviewShowActions/>}
    title={<ReviewTitle />}
    {...props}
  >
    <SimpleShowLayout>
      {configShow.id && <TextField source="id" />}
      {configShow.rating && <TextField source="rating" />}
      {configShow.body && <TextField source="body" />}
      {configShow.book && <TextField source="book" />}
      {configShow.author && <TextField source="author" />}
      {configShow.publicationDate && <TextField source="publicationDate" />}
    </SimpleShowLayout>
  </Show>
);

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

const ReviewListActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    {configList.buttons.create && <CreateButton basePath={basePath} />}
    {configList.buttons.refresh && <RefreshButton basePath={basePath} record={data} />}
  </CardActions>
);

const ReviewShowActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    {configShow.buttons.edit && <EditButton basePath={basePath} record={data}/>}
    {configShow.buttons.list && <ListButton basePath={basePath}/>}
    {configShow.buttons.delete && <DeleteButton basePath={basePath} record={data}/>}
    {configShow.buttons.refresh && <RefreshButton basePath={basePath} record={data}/>}
  </CardActions>
);

const ReviewEditActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    {configShow.buttons.show && <ShowButton basePath={basePath} record={data}/>}
    {configShow.buttons.list && <ListButton basePath={basePath}/>}
    {configShow.buttons.delete && <DeleteButton basePath={basePath} record={data}/>}
    {configShow.buttons.refresh && <RefreshButton basePath={basePath} record={data}/>}
  </CardActions>
);
