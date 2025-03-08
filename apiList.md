# apiList APIs


## authRouter
POST/signup
POSt/login
POST/logout

## Profilerouter
GET/profile/view
PATCH/profile/edit
PATCH/profile/password

## connectionRequestRouter 
POST/request/send/interested/:userID
POST/request/send/ignored/:userID
POST/request/review/accepted/:requestId
POST/request/review/rejected/:requestId


## userRouter 
GET/user/connections
GET/user/requests/received
GET/user/feed--gets the profiles of other users on platform