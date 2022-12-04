# Steps

**First make sure that you have both Mongodb and Node installed or it won't work.**
> ### Clone the repository
Run the following command in your terminal:
```
git clone https://github.com/shikot0/Realtime-chat-app {Name}
```
This will clone the repository into whatever directory you are currently in.
The `{Name}` argument is the name that you want the repository to be saved as.
> ### Download the dependencies:
cd into the app directory and run the following command:
```
npm install
```
Repeat this process for the server directory.

> ### Start the app
Run the following command in both the server and the app directory.
```
npm start
```
This will start a react app and initialize the server.
You may have to run the app and the server on a different ports, if something is already running on port 3000. If this is the case then you can modify the port that is being used by the server in the [.env](./server/.env) file and then do the same for the host in the [API Routes Directory](./app/src/utils/APIRoutes.js).

If you are still facing issues then repeat the process from step 1.