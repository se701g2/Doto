# Register

Used to register the user for the application

**URL** : `/api/schedule/post`

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

# Login

Used to log the user into the application

**URL** : `/api/login`

**Method** : `POST`

**Auth required** : YES

**Data constraints**:
```json
{
	"Username" : "[Unique email address]",
	"Password"  : "[Password the user chooses]"
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

**Code** : 200 OK

**Content examples**

For a user with ID 1234 on the database where the user has saved their login information:
```json
{
    "name": "Jason",
    "email": "jyao413@aucklanduni.ac.nz",
    "_id": "1234", 
        "Picture": "imgur.com/ao12r",
        "Preferences": "blue",
    "__v": "0"
}
```
Notes: 

User first has to register


# Schedule a task

Used to schedule a task

**URL** : `/api/schedule/post`

**Method** : `POST`

**Auth required** : NO

**Data constraints**:
```json
{
	"id" : "Unique id for task]",
	"Title" : "Name for schedule task",
	"Description"  : "[Description for task]",
	"Start_Date" : "[Time of creation]",
	"End_Date" : "[Time to finish task by]",
	"User_id" : "[Users email]",
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
