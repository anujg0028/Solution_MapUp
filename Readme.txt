Hi everyone,

First I thank the MapUp organiztion for giving me the chance to upgrade myself.

Now in my project we have 2 module:

1) Auth Server: for basic authentication
2) Main Solution module: in which we have our feature code

Now first we have to start both the servers, then use postman to hit the APIs url.

The flow of the code will be like:

1) The new user will do registration first by entering its userId, password and other necessary details [API url for registration: localhost:4000/auth/register]

2) After registration the user then perform login by again entering its userId and password. The user gets access token and refresh token to access the features of our main code [API url for login: localhost:4000/auth/login] {Till now we are working in authServer}

3) Now after getting access token, the user used it to access the main feature code by passing the access token as the auth bearer token [API url for feature code: localhost:3000/users/user]
{to pass the token in postman, go in auth option and select bearer token and then past the access token in the box} 

4)Now if the access token is correct the user will get the require result from our feature code module and if the token is incorrect the user will get the 401 authentication error  {Now we are working in our main feature file}

5)If the access token get expire then the user can used the refresh token to get new access token [APIs for getting new access token : localhost:4000/auth/token]

6) Now when the user has done all its require work then it can call logout API to get logout
[API url for logout: localhost:4000/auth/logout]

7) After logout the refresh token and the access token will get expire and the user will now not be able to access our feature code unless he/she again do login and get new access token and refresh token


Since I am Fresher, I tried my best to understand the turfJs but I am facing a lot of problems and also have lot of doubts.

Thanks