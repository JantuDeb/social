# [IONVU SOCIAL CONNECT](https://ionvu-connect.netlify.app/) - This is a social media app where you can post your thoughts and follow each other to communicate


![image](https://user-images.githubusercontent.com/63020886/169635770-4d975262-27b8-4cfa-84d8-34fdc75e2d83.png)

# Fetures
- POST 
  - CREATE POST
  - DELETE POST
  - EDIT POST
  - LIKE POST
  - DISLIKE POST
- BOOKMARK
  - ADD TO BOOKMARK
  - REMOVE FROM BOOKMARK
- Explore
  - Explore all the posts 
- Feed
  - Explore post created by followers
- Theme
  - Change background
  - Change font
  - Change accent color
- Follow & Unfollow a user
- Search user
- Auth
  - Login 
  - Signup
  - Logout

# How to Install and Run this Project
Clone or fork this repository to run this locally and use the following commands.

```bash
git clone https://github.com/JantuDeb/ionvu-social-connect.git

cd ionvu-store 

npm install

npm start

```
`src/utils/axios-instance.js`

*use the bellow configuration for axios*
```js
    const defaultConfig = {
    baseURL: " https://social-media-backendapi.herokuapp.com/api/v1/"
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    };
```

# How to use and customize backend api
> [GitHub Repository for backend api](https://github.com/JantuDeb/social-api.git)

`.env` 
```
PORT=4000
JWT_SECRET=secret
JWT_EXPIRY=3d
MONGO_URL=<mongodb url>
CLOUDINARY_URL=<cloudinary url>
CLOUDINARY_NAME=<cloudinary name>
CLOUDINARY_API_KEY= <your api key>
CLOUDINARY_API_SECRET=<your secret key>
```
>You have to create a mongodb cluster at MOngodb Atlas and a cloudinary account for storing images and video
```bash
git clone https://github.com/JantuDeb/social-api.git

cd social-api

npm install

npm start

```
