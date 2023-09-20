# Todo App

_Steps to run the project..._

### Frontend setup

`cd client && npm install`

`npm run build`

### Backend Setup

`cd server && npm install`

Create a `.env` file in `server` folder and add the following vairables

```
PORT=4000
DB_URI=<your mongodb uri>
NODE_ENV='DEVELOPMENT'

SECRET_KEY=<any key you want>
JWT_EXPIRE=7d
COOKIE_EXPIRE=3
```

Then run `npm start` in the server folder

The website will be now up on
`http://localhost:4000`😁
