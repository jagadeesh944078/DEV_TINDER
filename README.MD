### Episode 3

- create a repository
- Initialize the respository
- node_modules,package.json,package.lock.json
- create the server
- listen to the server
- write request handler for /test & /hello
- install nodemon and update scripts inside package.json
- what are dependencies

- **what is the use of "-g" while npm install**
- here -g means its not tied to any specific project that package is avaiable as terminal command,not added to package.json,other package without -g will be added in package.json and its for that specific project

- **diffrence between caret and tilde (^ vs ~)**
- in package.json you see for each library version ^5.2.1 something like that (^) caret is for minor and patch updates also we have (~) tilde its for patch updates,this updates automatically if any version released.

- **diffrence between package.json and package.lock.json shall we need to push into github package.lock.json?**
- package.json defines version ranges, whereas package-lock.json locks the exact versions that are installed.yes we need to push to github because Prevents “works on my machine” issues.& Safer Production builds

- **app.listen** means to start the server and listen on a specific port for incoming requests & callback function is executed once the server starts successfully.

- **app.use** is a method to define middleware functions that will be executed for every incoming request to the server. & Here function we call it as **request handler**

- initilize git
- .gitignore
- Create remote repo on github
- push all code to remote origin

### Episode 4

- play with routes and routes extensions ex: /hello, /hello/2, /xyz
- Order of routes matter alot
- Install Postman app and make a workspace/collection test API Call
- Write Logic to Handle Get,Post,Delete api calls and test them on Postman
- Explore routing and use of ?, +, (), \* in the routes
- use regex in routes /a/ , /.\*fly$/
- Reading Query Parameters in Routes (req.queryGIT )
- Reading the Dynamic Routes (req.params)

- **Order of the routes matter a lot**

- **basically sequence of order matters** here suppose if you write **app.use("/")** first then anything which matches with "/" will go into this route only.suppose **app.use("/test")** anything that comes after /test it will go into this route handler only.

- but if you write **/test123** then it will not go into **/test** because its diffrent string

- **http methods**
- GET,POST,PATCH,PUT,DELETE

- whenever you type any url top of the browser by default it makes GET API call.
- we can make api call from browser console by using fetch method.
- we can use postman to test the api's.

- **app.use will match the all HTTP methods to test**
