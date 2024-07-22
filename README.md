## Zania Test App: 

About app:

This is a frontend app. In this repository, we focus on the `part-1`, `part-3`, `part-4`, and `part-5` as mentioned in the test doc. `part-2` is related to Python and I have not worked on Python. So I skipped the backend part of this section.

## Steps to start this app:
- `npm i`
- `npm run dev`
  
## Steps to start the app with docker:
- `docker compose up --build` [If docker and docker-compose installed properly]

## Main libraries used in this app:
- Tailwindcss: For styling.
- React-beautiful-dnd: For implementing the drag and drop functionality.
- Msw: For implementing the mock server.
- Localforage: For setting up the browser storage i.e. indexDB.
- Notistack: For displaying the notifications.

## Approach
- We are creating the mock server using the `Msw` package and implemented the following APIs
  - [POST] /api/v1/albums: To store the details.
  - [GET] /api/v1/albums: To get the details.
 You can check the `src/lib/workerHandlers.ts` file for more details.

- We are doing the following when the app start: [Before home component rendering]
  - We are checking if data is already stored in browser storage. In our case, we are using the indexDB, so we are checking accordingly.
  - If data is not there then we are storing the JSON data directly into the indexDB. 
 Check method `/lib/bootStrap.ts` for more details.
  - If data is already stored in the browser then we are not doing anything.

- Now, when the home component renders, the following things will happen:
  - It would call the mock server API `[GET /api/v1/albums]` for fetching the data.
  - After 5 seconds, it would check if there is any layout changes [if the user has drag and drop any item].
  - If changes are found, we call the mock server API `[POST /api/v1/albums]` to store the document items and it stores those items in browser storage i.e. indexDB. 
  - The functionality work continues. 

- We are displaying error messages and loader during the API call.  

- Apart from this, we are also displaying the message 'Changes Detected!! New Snapshop saving is in progress... ' and once changes stored, then also, we are displaying success notification to the user.

## Please have a look at the hypothetical API design doc:
<a href="https://docs.google.com/document/d/1Q1E_n4wT_yiZ65DOb2F0ucR8VZQHyYciB59nRuguMNk/edit?usp=sharing" target="_blank">Refer this link to view the API design doc</a>


