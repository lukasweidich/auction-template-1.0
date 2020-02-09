# DemIT eBay Description Generator
Generate Descriptions for your eBay Products

1. clone repo
2. go to `repo directory`
3. create `.env` file (for the content, contact [@lukasweidich](https://github.com/lukasweidich))
4. `npm i`
5. `node src/util/AuthTokenRetriever.js` (fetches a new auth token every 2hrs, is running in background)
> for testing purposes, the [cron](https://www.npmjs.com/package/node-cron) job is set to execute every 15 seconds `cron.schedule('*/15 * * * * *'[...]`, so run it for at least 15 seconds, to make sure that a new token will be retrieved. then, you may terminate the AuthTokenRetriever and start the app. the retrieved token is valid for 2hrs.
6. `npm start`
7. visit `localhost:3000` and enter eBay item id
