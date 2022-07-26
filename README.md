
# Apni Coaching

A Complete Solution of Offline Coaching as well as for the Online Coaching.

It handles four types of user(Admin, Teacher, Student & Parents). 
 
 All of them are assigned there separate work.
This Website is Made from using MERN Technique which also includes ML, DL for chatbot & face Recognisation in Frontend.




## Acknowledgements

 - [Face  Recognisation](https://justadudewhohacks.github.io/face-api.js/docs/index.html)
 - [Awesome Components](https://mui.com/)
 - [Server Host](https://dashboard.heroku.com/)
 - [Client Host](https://www.netlify.com/)


## External API Reference

#### Get All News 

```http
  GET https://saurav.tech/NewsAPI/top-headlines/category/general/in.json
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | doesn't require any API KEY|




## Authors

- [@Deepak Yadav](https://github.com/deepakyadav0223)
- [@Shreenav Khandelwal](https://github.com/shreenav)


## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/Making-Ice-Cream/bookish-octo-spork/blob/master/LICENSE)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://img.shields.io/twitter/url?style=social)



## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Deployment

Before that you have to ensure that you had installed Heroku CLI & have a Heroku Account.

For the deployment on Heroku using Heroku-CLI

```bash
  heroku login -i
```
Now create the app name which will be same as Site URL
```bash
   heroku create <YOUR_APP_NAME>
```
Now push the code to heroku using git
```bash
    git push heroku <Branch_name>
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_ATLAS_URL` : `<Enter the Mongo DB URL>`

`ANOTHER_API_KEY`


## Features

- Great & Compatible UI
- Face Recognition for Attendence
- Chat with Bot
- Chat & Meet App
- Payment Interface Integrated



## Tech Stack

**Client:** React, Redux, face-api.js

**Server:** Node, Express

**DataBase:** MongoDB

**Connecting-FrameWork:** RESTFUL-API


## Support

For support, email deepakrao0223@gmail.com 


## Installation

Install Apni-Coaching with npm

Make Sure that you have installed npm, node.js

To install this project run

```bash
  git remote add <Remote_name> <Remote_Url>
  git pull origin master

```

To install the Client dependencies, go to Client directory

```bash
     npm install
```

To install the Server dependencies, go to Server directory

```bash
     npm install
```

Now run the Server, after going to it's directory
```bash
     node index.js
```
  
Now run the Client, after going to it's directory
```bash
     npm start
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/Making-Ice-Cream/bookish-octo-spork.git
```

Go to the project directory

```bash
  cd <my-project>
```

Install dependencies & go to their client directory

```bash
  npm install
```

Install dependencies & go to their server directory

```bash
  npm install
```

Start the server

```bash
  node index.js
```
To start the React App
```bash
   npm Start
```

