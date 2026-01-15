# DevTinder Api's

## Auth Router

- POST /signup
- POST /login
- POST /logout

## profile router

- GET profile/view
- PATCH profile/edit
- PATCH profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userrouter

- GET /user/connection
- GET /user/requests
- GET /user/feed - Gets you the profiles of the router users on platform
