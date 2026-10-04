# Blog Post (Backend)
To Provide a versatile environment for sharing post with file formate like Image and Video.
This plateform can also used for business and job seeking purposes. Business owners can show case their product to other usrs.
User can send requiest to other user to make friends, posts are suggest to users based on there interests.
They can customize their profile by adding Profile Pictures.

Backend language : JavaScript(Nodejs + Expressjs)  
DataBase : PostgreSQL  
Authentication : JWT and OAuth  

Responese Code from backend
use normal http status code for the status like 200,201,400,404 etc..

These all are custom code used for specifing the status for the request
code:
```
Done ---> success
InvalidRefreshToken ---> Invalid or expired Refresh token
InvalidAccessToken ---> Invalid or expired Access token
UserAlreadyThere ---> Username or email already in use
UserNotExist ---> Username or Email is not signup
InvalidCredentials ---> Invalid user credentials
Internal ---> Internal server errors
```