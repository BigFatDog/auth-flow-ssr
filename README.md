# Full stack auth flow with server side rendering


# Main features (enabled by nextjs)
* Server Side Rendering
* Separate bundling for each page
* Use service worker to preload scripts asynchronously
* Pre data fetching. Page are immediately ready on the first visit

# Technology Stack
Nextjs, Apollo, React, Redux, Redux-saga, Express, MongoDB, Re-select

# Background
This is an alternative architecture to [auth-flow-react-apollo-saga](https://github.com/BigFatDog/auth-flow-react-apollo-saga). This project has similar technology stack and code base
with [auth-flow-react-apollo-saga](https://github.com/BigFatDog/auth-flow-react-apollo-saga). The major difference is this project is based on [Next.js](https://github.com/zeit/next.js/) framework.


## Setup
1. install mongodb
2. clone this project from https://github.com/BigFatDog/auth-flow-ssr.git
3. npm install
4. npm run start
5. visit localhost:3030

## Features
This application aims to demonstrate a full stack login/register flow.

* based on access token and refresh token. Tokens are stored in http-only cookie.
* verify token on route change (implemented via High-Order-Component)
* jwt middleware for both web endpoint and apollo endpoint
* authentication status is stored as immutable object in Redux store
* failures of verifying tokens will redirect user to login page
* handling error messages in i18n

Common failures
* lost server connection
* opertation timeout
* MongoDB down

Login failures
* User not found
* Invalid credentials

Register failures
* user already exists
* email already exists

## Implementation
### Project Structure
I started this project with [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate). The following adjustments are made per my own needs:
1. server code are compiled to build/server
2. .graphql support
3. server logic are in ES6, built and run with babel-node
4. add apollo server and client
5. axios is used for rest call
6. fontawesome 5

### Web Server authentication v.s. GraphQL authentication
It has been introduced in this awesome tutorial: [Apollo Tutorial](https://dev-blog.apollodata.com/a-guide-to-authentication-in-graphql-e002a4039d1).
I chose the web server approach.

## Limitations
* Apollo WebSocket failures haven't been verified
* No 3rd party auth support. (passport-facebook, passport-github)
* No tests

## Credits
* [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate) the initial project structure
* [Apollo Universal Starter Kit](https://github.com/sysgears/apollo-universal-starter-kit) implementation of access token and refresh token

## License
MIT

