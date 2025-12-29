### Episode 1

- **Monolith vs Microservices**

- **Development Speed**
- Monolith its slower whereas in Microservices Its faster because in Monolith we work on single repo code reviews becomes slower (there is a huge debate on this)

- **Scalability**
- very tough in monorepo,small services scaling is easy.

- **Deployement**
- separate separate deployement for microservices,single deployment in Monorepo

- **Tech Stacks**
- we can use diffrence Tech Stacks in microservice architecture

- **Infra Cost**
- Infra cosr higher in microservice because separate separate services for each repo

- **Complexity**
- complexity high for small project in microservice for larger projects higher for monorepo

- **Fault Isolation**
- if any small thing crash in monolith complete app crashed,but in microservice only that service will be crashed.

- **Testing**
- we can write separate Test cases in microservice but writing end to end test cases in very tough

- **Ownership**
- separate separate ownership for microservices,central ownership in monorepo

- **Maintainence & Rewarmps**
- its easy in microservice small service only so we can Rewarmp it if we want,but monorepo its difficult

- **Debugging**
- its tough for both,there will blaming also like your service faulty etc..,but monorepo silghltly easier

### Episode 3

- create a repository
- Initialize the repository
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

### Episode 5

- multiple route handlers play with code
- next()
- next function and errors along with res.send()
- app.use("/route", rh1, rh2, rh3, rh4, rh5);
- what is middleware
- how to expressjs basically handles requests behind the scenes
- diffrence between app.all & app.use
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user routes except /user/login
- error handling using app.use("/", (err,req,res,next) => {})

- in below code you can see mulitple arguments,first one is router, second one is route handler, even you can pass multiple route handlers as arguments
-      app.use("/user", (req, res) => {res.send("hello server")}, () => {})

- **Case 1**

```
 app.use(
  "/user",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    res.send("User Info 1");
    next();
  },
  (req, res) => {
    res.send("User Info 2");
  }
);
```

- **Case 2**

```
app.use(
  "/user",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
    res.send("User Info 1");
  },
  (req, res) => {
    res.send("User Info 2");
  }
);
```

- **Case 3**

```
 app.use(
  "/user",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res) => {
    res.send("User Info 2");
  }
);
```

- **Case 4**

```
app.use(
  "/user",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  }
);
```

- **Case 5**
- **you can can send all route handler inside array or 2 in one array and remaining as it is,here also it will work same as without arrays**

```
app.use(
  "/user",
  [(req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  }
  (req, res) => {
    res.send("hello from 5th server)
  }]
);
```

**Case 6**

- **it will go to next route and print User Info GET Method2**

```
app.get("/user", (req, res) => {
  next();
});

app.get("/user", (req, res) => {
  res.send("User Info GET Method2");
});
```

**Case 7**

- **it will not even go to second route because these are separate routes**

```
app.get("/user", (req, res) => {
  res.send("User Info GET Method2");
});

app.get("/user", (req, res) => {
  next();
});


```

- **The functions you put in the middle called as middleware**

### Episode 6

- create a free cluster on MongoDb official website(Mongo atlas)
- Install mongoose library
- connect your application to the Database "Connection-url"/devTinder, here devTinder is database name
- call the connectDB function and connect to the database before starting application on 7777
- Create a userschema & user model
- Create /signup api to add data to database
- push some documents using api calls from postman
- error handling using try, catch

- we use mongoose to talk to the datebase,so to create models,schema's we use mongoose
- refer documentation for creating schemas
- before storing anything in the collection you have to create schema for collection
- schema means what are the all thing you stored in that particular collection(user collection)
