# Digital Postcard Project 
A collaboration with Stony Brook University CS students May Me Me Maung, Eric Wang, Sai Chaddha, and Mahir Alam advised by Professor Joydeep Mitra and TCNJ Professor Satyasikha Chakraborty and her students to devise a way to showcase postcards and tradecards from TCNJ archives on an interactive website.

## Important Scripts

In the project directory, the most important commands you will run:

### `npm start`

Runs both the server and the client side React application IN PRODUCTION BUILD. Make sure that before you attempt to run this locally, you run the "react run build" command to build a production version of the app before running. The page can then be accessed at port 5000. 

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Codebase
## Server side
The server side is handled by the Express backend that operates on the parsing of a JSON file in the file postcardServer.js located in the base directory. That file contains all the Express endpoints that you can modify to fetch backend material as well as implement backend logic. It is in there that the base website is handled. When you visit the website, it is automatically programmed to give back index.html in the build directory. On startup, it will load the JSON file into memory for all future requests. Other endpoints can be found in the file as well. 

In addition, the JSON file used in postcardDatabase.js is also programmatcially created by server/createJSON.js. The main function, JSONStartIntiate(), will call all other functions necessary to write the JSON file (that being all of the data supplied by other functions as arguments into postcardMapToJSON). 
- imageToArray: Returns a promise of all the postcard images in a given directory as {filepath: string, picData: base_64 image encoded string}
- parseTSV: Takes the TSV from the Google Sheets of the metadata of the postcard and parses it into an array of metadata
- locationPopulate: Compiles all the coordinate data into a JS Object to be used for converting the string locations to (x,y) coordinates.
- transcriptParsing: Returns the description and analysis of a particular postcard after parsing the word document. **PLEASE if you need to modify this function, please modify parseDOCXText which already has the DOCX text given to you as a string through the docxText argument**


## Front End
App.js contains the React Router that we use currently for the project. With each endpoint that is given, it corresponds to a component in the "page" folder. Any individual custom component that we create will go into the "components" folder.

### Home Page
- Popup Component (popup.js) that basically just shows the content with z-index positioning over everything else. It is used to pop up the trigger warning when the home screen pops up as a warning to everyone.
- Image Banner (just a regular image tag)
- The essay is also supposed to go on this page, but since it is not yet prepared, we will leave
- Carousel (reactCarouselWrapper.js)l: Custom-made component. Renders all the images and uses CSS animations to transfer them to the right place and animate them. Note that the CSS id selectors used are hard coded.

### Explore
- All the possible tags are retrieved through the endpoint on the Express Sserver.
- On the server side, I extracted all the tags in tags.txt file, read and sent a json response.
- Clicking on each postcard will redirect to the card details page, in the same way as clicking the postcard in the carousel or on the map page.
- At the time of writing this documentation, the logic behind choosing tags has not yet been implemented. The right side shows all the postcards that are currently in the file system.

### Map
- The map is mainly implemented using React Leaflet and Leaflet.js.
- The tile layer is requested from Thunderforest on a free tier usage with my personal gmail. Feel free to explore different services and create api keys with another account.
- The clusters are implemented using react-leaflet-marker-cluster package. There are two clusters for postcards and trade cards. 
- The original zoom control was replaced for a possibly better user interface.

### Postcard
- Currently just shows all of the postcards that are already retrieved through the "getAll" endpoint.
- The component used to show brief postcard descriptions on the map page is reused here

### Card Details
- Details Component with conditional rendering from whether it is a postcard or a tradecard.
- Flipping functionality: Using lifting of state in the PostcardPage component in postcardPage.js. It changes the state by passing the function by props to the Postcard Information component which gets used in the onClick property (props.flipFunction). The state is passed via props to the TradeCardViewer component (tradecardViewer.js) which the props get put into isFlipped property to trigger the flipping functionality.
- Tradecard Viewer Component (tradecardViewer.js)  is what I used before to render the images. It still works, but it will most likely be overhauled for something a bit more simpler and easier to maintain.
- Postcard Information Component just displays the information about the postcard that was retrieved from the server.
