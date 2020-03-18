# Add new user

Used to register the user for the application

**URL** : `/api/users/add`

**Method** : POST

** Auth required** : NO

**Data constraints**

```json
{
	"Username" : "[Unique email address]",
	"Password" : "[Password the user chooses]"
}
```
**Data example**:
```json
{
	"Username" : "jyao413@aucklanduni.ac.nz",
	"Password"  : "softwareengineering"	
}
```
## Success response

**Code** : `200 OK`

**Content examples**

For user that wants to register their account without doing it before
```json
{
    "_id": "1234",
    "Successful": "True"
}
```
For user that wants to register their account again
```json
{
    "_id": " ",
    "Successful": "False"
}
```

# Notes: 

User should not be able to register twice, and the username (email) of the account must be unique

# Get all users

Get users registerd

**URL** : `/api/users`

**Method** : `GET`

**Auth required** : `YES`

## Success response

**Code** : `200 OK`

**Content examples**

Returns all registered users
```json
{

	"name" : "Someone",
        "email" : "someone@gmail.com",
        "password"  : "",
        "_id" : "325235",
        "_v" : ""

}
```

# Schedule a task

Used to schedule a task

**URL** : `/api/schedule/post`

**Method** : `POST`

**Auth required** : NO

**Data constraints**:
```json
{
	"Title" : "Name for schedule task",
	"Description"  : "[Description for task]",
	"Start_Date" : "[Time of creation]",
	"End_Date" : "[Time to finish task by]",
	"User_id" : "[Users google ID]",
	"Location" : "[Location of their task]",
	"Color" : "[Preferences of task color]"
}
```
**Data example**:

With all fields filled
```json
{
	"id" : "1234",
	"Title" : "Eat dinner",
	"Description"  : "Eat dinner for tonight",
	"Start_Date" : "2020-03-12T09:50:00.000",
	"End_Date" : "2020-03-19T10:55:00.000",
	"User_id" : "jyao413@aucklanduni.ac.nz",
	"Location" : "Home",
	"Color" : "Red"
}
```
With only mandatory fields filled
```json
{
	"id" : "1234",
	"Title" : "Eat dinner",
	"Description"  : "Eat dinner for tonight",
	"Start_Date" : "2020-03-12T09:50:00.000",
	"End_Date" : "2020-03-19T10:55:00.000",
	"User_id" : "jyao413@aucklanduni.ac.nz",
	"Location" : "Home",
	"Color" : " "
}
```

## Success response

**Code** : `200 OK`

**Content examples**

For a successful task scheduled
```json
{
    "task_id" : "1234",
    "Successful" : "True"
}
```
For an unsuccessful task scheduled
```json
{
    "task_id" : "1234",
    "Successful" : "False"
}
```

# UpdateTask

Used to update a user’s task

**URL** : `/api/schedule/:taskid`

**URL parameters** : `taskid = the id of the task the user wants to change`

**Method** : `PUT`

**Auth required** : `NO`

**Data Constraints**:
```json
{
    	"id" : "1234",
	"Title" : "[Name for schedule task]",
	"Description"  : "[Description for task]",
	"Start_Date" : "[Time of creation]",
	"End_Date" : "[Time to finish task by]",
	"Location" : "[Location of their task]",
	"Color" : "[Preferences of task color]"
}
```
**Data example**:
```json
{
    	"id" : "1234",
	"Title" : "Eat breakfast",
	"Description" : "Eat breakfast for today",
	"Start_Date" : "2020-03-12T08:50:00.000",
	"End_Date" : "2020-03-19T09:55:00.000",
	"Location" : "Home",
	"Color" : "Red"
}
```
## Success response

**Code** : `200 OK`

**Content examples**

If the user enters a valid update and task ID
```json
{
    "task_id" : "1234",
    "Successful" : "True"
}
```
# GetTasks

Get the tasks of a user 

**URL** : `/api/schedule/get/:username`

**URL parameters** : `username = the username of the current login`

**Method** : `GET`

**Auth required** : `YES`

## Success response

**Code** : `200 OK`

**Content examples**

Returns all the tasks the current user has
```json
{

	"id" : "1234",
        "Title" : "Eat dinner",
        "Description"  : "Eat dinner for tonight",
        "Start_Date" : "2020-03-12T21:50:00.000",
        "End_Date" : "2020-03-12T22:55:00.000",
        "User_id" : "jyao413@aucklanduni.ac.nz",
        "Location" : "Home",
        "Color" : "Red"
},
{
        "id" : "1231241244",
        "Title" : "Eat lunch",
        "Description"  : "Eat lunch for today",
        "Start_Date" : "2020-03-12T13:50:00.000",
        "End_Date" : "2020-03-12T11:55:00.000",
        "User_id" : "jyao413@aucklanduni.ac.nz",
        "Location" : "Home",
        "Color" : "Red"
}
```
# DeleteTask

Used to delete a user’s task

**URL** : `/api/schedule/:taskid`

**URL parameters** : `taskid = the id of the task the user wants to change`

**Method** : `DELETE`

**Auth required** : `NO`

**Data Constraints**:
```json
{
    "id" : "[ID of the task]"
}
```
**Data example**:
```json
{
    "id" : "1234"
}
```

## Success response

**Code** : `200 OK`

**Content examples**

If the user enters a valid task ID
```json
{
    "task_id" : "1234",
    "Deleted" : "True"
}
```
If the user enters an invalid task ID
```json 
{
    "task_id" : "1234",
    "Deleted" : "False"
}
```

# Get Google Authentication

Get authentication token for user

**URL** : `/api/auth/google`

**URL parameters** : `email = the email of the user`

**Method** : `GET`

**Auth required** : `YES`

## Success response

**Code** : `200 OK`

**Content examples**

Returns all the tasks the current user has
```json
{
	"response" : "OK"
}
```
