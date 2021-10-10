# API ROUTES DOCUMENTATION

## AUTH ROUTES

- ##### sign up route - method `POST` http://zxi4gxhng.herokuapp.com/api/v1/auth/sign-up : access public

### dsescription: sign up user

###### example

```json
{
  "name": "",
  "email": "",
  "password": ""
}
```

###### payload

```
{
    "message": "User created",
    "success": true,
    "data": {
        "uid": "60d6ee8ebe6a103c2804408a",
        "name": "full name",
        "email": "xxxxxx@mail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDZlZThlYmU2YTEwM2MyODA0NDA4YSIsImlhdCI6MTYyNDY5ODUxMH0.jcig2uHeUI4KjYfcqGdsgtbNc24d5LoQO-6ErxUoJlg"
    }
}

```

- ##### login route - method `POST` http://zxi4gxhng.herokuapp.com/api/v1/auth/sign-in : access public

### dsescription: login user

###### example

```json
{
  "email": "string",
  "password": "string"
}
```

###### payload

```
{
    "message": "User login successful",
    "success": true,
    "data": {
        "uid": "60d6ee8ebe6a103c2804408a",
        "name": "full name",
        "email": "xxxxxx@mail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDZlZThlYmU2YTEwM2MyODA0NDA4YSIsImlhdCI6MTYyNDY5ODUxMH0.jcig2uHeUI4KjYfcqGdsgtbNc24d5LoQO-6ErxUoJlg"
    }
}
```

## USERS ROUTES

- ##### Get user grades - method `GET` http://zxi4gxhng.herokuapp.com/api/v1/users/ : access private

### dsescription: get all user grade course.

<b>access token requried to access this route</b>

```javascript
POSTMAN -
  { headers: { Authorization: `Bearer xxxxxxxxxxx-token-given-on-login` } };
```

###### payload

```
{
    "message": "Success: Data",
    "success": true,
    "data": [
        {
            "score": 75,
            "_id": "60b4eb6474fbe900150f4046",
            "userID": "60b4919f34b16c00157682a2",
            "subID": "60b491b734b16c00157683a3",
            "isTaken": "2021-05-31T13:57:56.343Z",
            "createdAt": "2021-05-31T13:57:56.355Z",
            "updatedAt": "2021-05-31T13:57:56.355Z",
            "isPass": "B",
            "__v": 0
        },

    ]
}
```

## PROGRESS ROUTES

- ##### add progress route - method `POST` http://zxi4gxhng.herokuapp.com/api/v1/progress/subjectID : access private

NOTE `@params = subjectID -> 60b491b734b16c00157683a3`

### dsescription: add users score to course.

<b>access token requried to access this route</b>

```javascript
POSTMAN -
  { headers: { Authorization: `Bearer xxxxxxxxxxx-token-given-on-login` } };
```

###### example

```
  score: number
```

###### payload

```
{
    "message": "Progress saved",
    "success": true,
    "data": {
        "score": 80,
        "_id": "60d6f9fefafda400155407f5",
        "userID": "60b4919f34b16c00157683a2",
        "subID": "60b491b734b16c00157683a3",
        "isTaken": "2021-06-26T09:57:18.182Z",
        "createdAt": "2021-06-26T09:57:18.217Z",
        "updatedAt": "2021-06-26T09:57:18.217Z",
        "isPass": "B",
        "__v": 0
    }
}
```

- ##### get subject score - method `GET` http://zxi4gxhng.herokuapp.com/api/v1/progress/subjectID : access private

NOTE `@params = subjectID -> 60b491b734b16c00157683a3`

### dsescription: get users score on a particular course.

<b>access token requried to access this route</b>

```javascript
POSTMAN -
  { headers: { Authorization: `Bearer xxxxxxxxxxx-token-given-on-login` } };
```

###### payload

```
{
    "message": "Data recived",
    "success": true,
    "data": {
        "score": 80,
        "_id": "60d6f9fefafda400155407f5",
        "userID": "60b4919f34b16c00157683a2",
        "subID": "60b491b734b16c00157683a3",
        "isTaken": "2021-06-26T09:57:18.182Z",
        "createdAt": "2021-06-26T09:57:18.217Z",
        "updatedAt": "2021-06-26T09:57:18.217Z",
        "isPass": "B",
        "__v": 0
    }
}
```

## SUBEJECTS ROUTES

- ##### add progress route - method `POST` http://zxi4gxhng.herokuapp.com/api/v1/subjects : access private admin

<b>NOTE: only admin can assess this routes</b>

### dsescription: add subject to database.

<b>access token requried to access this route</b>

```javascript
POSTMAN -
  { headers: { Authorization: `Bearer xxxxxxxxxxx-token-given-on-login` } };
```

###### example

```json
{
 "name": "Fractions Thru Algebra, Section 1 - Real Numbers and Their Graphs",
  "link": "https://localhost:3000/real-numbers-and-their-graphs",
  "summary": "write a quick summary of this Subject",
  "questions": [ // array
        {
            "question": "Circle all of the natural numbers in the following list",
            "options": [
                {
                 "option": "-1.7, 1.2, 3/4, 3,",
                 "answer": false
                },
                 {
                 "option": "3, 5, 199",
                 "answer": true
                },
                 {
                 "option": "1.2, 3/4, 5/1",
                 "answer": false
                },
                 {
                 "option": "5, -41/37 1.2, 3/4, 199",
                 "answer": false
                }
            ] // array
        },
    ],
    "meta_title": "Subject title",
     "meta_description": "Subject meta description",
     "meta_keywords": "keywords here......"
}
   Short

{
 "name": "",
  "link": "", // youtube link to video
  "summary": "",
  "questions": [ // array
        {
            "question": "",
            "options": [
                {
                 "option": "",
                 "answer": boolean
                },
            ]
        },
    ],
    "meta_title": "",
     "meta_description": "",
     "meta_keywords": ""
}

```

- ##### get all subject route - method `GET` http://zxi4gxhng.herokuapp.com/api/v1/subjects : access private admin

<b>NOTE: only admin can assess this routes</b>

### dsescription: get all subjects.

<b>access token requried to access this route</b>

```javascript
POSTMAN -
  { headers: { Authorization: `Bearer xxxxxxxxxxx-token-given-on-login` } };
```

###### payload

```json
{
  "message": "Success: Data",
  "success": true,
  "data": []
}
```
