# ebay-template
Template for generating eBay descriptions

1. clone repo
2. go to `<repo-directory>/ebay-template/`
3. create `.env` file (for the content, contact [@lukasweidich](https://github.com/lukasweidich))
4. `npm i`
5. `node src/util/AuthTokenRetriever.js` (fetches a new auth token every 2hrs, is running in background)
6. `npm start`
7. visit `localhost:3000` and enter eBay item id
