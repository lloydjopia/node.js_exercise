# Node.js Exercise Application

This is an application made with the requirements on the course provided in the training titled backend-nodejs.

# requirements
* Run mySql server and import mysql data __fileDump20200827.sql__ found in the root folder.

# Usage

This application can be run using
```node
npm start
```
In the browser, by navigating to
```
domain_name:port
```
(e.g localhost:3000)

Index of the application with its UI will be shown.

## Home-Page
The home page will contain a hero image and some dummy content. This also has the navigation with links. (Users that will redirect to /users).

Users Button - Redirects the user to Users (/users)

## Users-Page
The Users page will display all the users with the following details:
* __Image__ - Can be default photo or provided/uploaded my user.
* __Name__ - Name of the specific user displayed.
  * Clickable - When clicked, the user will be redirected to the user page (__/users/id__)
* __Email__ - Email of the specific user displayed.

## User (View)
The User View will display specific user's details:
* __Image__ - Can be default photo or provided/uploaded my user.
* __Name__ - Name of the specific user displayed.
* __Email__ - Email of the specific user displayed.

An __Edit__ button will be availabe at the buttom for the user to be able to edit the details of the user. This button will redirect the user to be redirected to the User Edit Page (__/users/:id/edit__)

## User (edit)
In the User (edit) page, the user can edit specific user.
The user can edit the following:
* __Image__ - Can be default photo or provided/uploaded my user.
* __Name__ - Name of the specific user displayed.
* __Email__ - Email of the specific user displayed.

A form will be available for user input:
* __Upload Photo__ - Lets the user choose a photo with the formats: __jpg,jpeg or png__
  * note: Image is not required, I just base it on the requirements. No image provided means the user will have the default photo else the photo provided.
* __Name__ - Minimum of 4, maximum of 60 characters and required.
* __Email__ - valid email and required.

## Navigation
__Node.js Excersise__ on the top will always redirects the user back to home page.

# API (graphql)
### __Getting User(s)__
__Getting all the Users Query:__

```
{
  users {
    uId
    uName
    uEmail
  }
}
```
Can be configured base on what data is needed.

__Getting a specific User Query:__

```
{
  user(id: 1) {
    uId
    uName
    uEmail
  }
}
```
Can be configured base on what data is needed.


### __Updating User__

__Mutation format:__
```
mutation updateUser($id: Int!, $name: String!, $email: String!) {
  updateUser(id: $id, name: $name, email: $email) {
		...userFields
  }
}

fragment userFields on User {
  uId
  uName
  uEmail
}
```

__Variables:__
```
{
  "id": 1,
  "name": "sample string",
  "email": "Sample@email.com"
}
```