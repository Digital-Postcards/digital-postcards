# Digital Postcard Project

A collaboration with Stony Brook University CS students May Me Me Maung, Eric Wang, Sai Chaddha, Mahir Alam and Anna Li advised by Professor Joydeep Mitra and TCNJ Professor Satyasikha Chakraborty and her students to devise a way to showcase postcards and tradecards from TCNJ archives on an interactive website.

***Jump to:***\
[Scripts](#scripts)\
[Database](#database)\
[Server](#server)\
[Frontend](#frontend)\
[Deployment](#deployment)

# Scripts

In the project directory, the most important commands you will run:

### `npm start`

Runs both the server and the client side React application IN PRODUCTION BUILD. Make sure that before you attempt to run this locally, you run the "react run build" command to build a production version of the app before running. The page can then be accessed at port 5000.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best 
performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run dev`

Sets up the development environment and starts a server, as well as hot module reloading. You will see the build errors and lint warnings in the console. Run  simultaneously with `node postcardServer.js`. Useful for developing user interface. Make sure to set up api routes correctly in the React application. 

### `npm run web`

Builds and deploys full-stack application locally. Good for overall testing. 

# Codebase

## Database

All the database related scripts can be found in the server/scripts directory. You'll have to run multiple scripts to generate the postcards/tradecards databases. Make sure info-sheet.xlsx, postcard/tradecard image folders, transcripts and all other necessary files is present in the scripts directory (Use the import paths in the createJSON file as a reference). Convert .csv files to .tsv  where ever required. 

*The order of scripts to be run is: extractLocations -> geocoder -> createJSON

Once the databases are generated you'll have to move them, along with the post cards, trade cards and transcripts folders, to the server folder in order for the postcardServer.js file to be able to access them. Alternatively you can modify the paths in postcardServer.js to point to the correct locations.

As of now, model.js, tags.txt, and resources folder in the server directory are all needed for the postcardServer file to work correctly. Do not remove this files until necessary modifications are made so that they are not needed anymore. Apart from that, none of the other generated files, or imported files, should be pushed to the github repository. This will ensure that the repository doesn't have any excess files that will be generated during development. Tip: Use .gitignore to exclude any recurrent excess files.

*Note: The countryScript file was used to parse and clean country name anomalies in an older version of info-sheet. It does not need to be run during database generation. The file is kept for potential future use.

## Server

The postcards (and tradecards) server is handled by the Express backend that operates on the parsing of a JSON file in the file postcardServer.js located in the base directory. That file contains all the Express endpoints that you can modify to fetch backend material as well as implement backend logic. It is in there that the base website is handled. When you visit the website, it is automatically programmed to give back index.html in the build directory. On startup, it will load the JSON file into memory for all future requests. Other endpoints can be found in the file as well.

In addition, the JSON file used in postcardDatabase.js is also programmatcially created by server/createJSON.js. The main function, JSONStartIntiate(), will call all other functions necessary to write the JSON file (that being all of the data supplied by other functions as arguments into postcardMapToJSON).

- imageToArray: Returns a promise of all the postcard images in a given directory as {filepath: string, picData: relative url to image}

- parseTSV: Takes the TSV from the Google Sheets file of the metadata of the postcard and parses it into an array of metadata

- locationPopulate: Compiles all the coordinate data into a JS Object to be used for converting the string locations to (x, y) coordinates.

- transcriptParsing: Returns the description and analysis of a particular postcard after parsing the word document. **PLEASE if you need to modify this function, please modify parseDOCXText which already has the DOCX text given to you as a string through the docxText argument**

## Frontend

App.js contains the React Router that we use currently for the project. With each endpoint that is given, it corresponds to a component in the "pages" folder. Any individual custom component that we create will go into the "components" folder.

|Components| Usage |Description|
|--|--|--|
|popup.js|multiple|Displays a content warning whenever the site is first visited
|navbar.js|multiple|Displays links to each page and a persistent content warning
|reactPostcardCarouselWrapper.js/ reactTradecardCarouselWrapper|home|Displays a moving carousel with selected images
| marker.js | map | Creates a circular marker on the map given the coordinates 
| cardContainer.js | map | Displays all the cards from a selected location on a side panel on the map page
| key.js | map | Displays an interactive key that indicates the color of each empire on the map
|explorePostcardEntry.js/ explorePostcardEntry.js| postcardIndex/ tradecardIndex | Displays a table of postcards/tradecards with an image and other details for each card
|slideshow.js|tradecardPage|Slideshow to view all the tradecards
|tradecardInformation.js|tradecardPage|Separate component for details about each tradecard
|postcardInformation.js|postcardPage|Separate component for details about each postcard

### Home 
- Banner, Tradecard Carousel, Postcard Carousel followed by classification descriptions.

### Explore

- All the possible tags are retrieved through the endpoint on the Express Server.
- On the server side, I extracted all the tags in tags.txt file, read and sent a json response.
- Clicking on each postcard will redirect to the card details page, in the same way as clicking the postcard in the carousel or on the map page.

### Map

- The map is a static image file, with markers rendered on it using Konva.js. 
- A panel on the right displays the cards at a particular location.
- A key above the map displays the colour coding for each empire.

### PostcardsIndex/TradecardsIndex
- Displays all the postcards and tradecards as a table.
- The entries are loaded lazily using `react-infinite-scroll-component`.

### PostcardPage

- Flip functionality to view either side of the postcard.

### TradecardPage

- Slideshow functionality to view all sides of the tradecard.
- Rotate functionality to view tradecard images from different angles.

# Deployment
A stable version of the application and the postcard server are deployed at: http://130.245.156.20/ and http://130.245.156.20/node/ respectively

The linux server is running Apache HTTP Server. Read the [documentation](https://httpd.apache.org/docs/2.4/) to get started. 

SSH to connect to the server and use SFTP to transfer files into it. You can use any third party client like FileZilla to do so. 

### Hosting the React app

The Document Root is currently set to var/www/html. The index.html residing in this directory will be served. You should copy the contents of the build directory in your react application to this directory. Do not remove the nodejs folder from html.

### Hosting the postcardServer.js
The postcard server file is in the nodejs directory in html. The directory also contains package.json, postcardServer.js and a server folder. The server folder further contains the database.json files, the Post Cards and Trade Cards (which contain images) directories, model.js, resources directory  and tags.txt.

The postcard server can be accessed through the `/node` path. The .htaccess file is configured to proxy all traffic ending with this path. The proxy server configuration can be found in `/etc/apache2/sites-available/000-default.conf`, along with the Virtual Host configuration. 

If not done already, the packages in packages.json file must be installed using `npm install`.

The postcardServer.js file can be run using the [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) engine. It's recommended to run using the `sudo` prefix. If pm2 crashes use pm2 logs for debugging.

To view apache2 log files use: `sudo vi /var/log/apache2/error.log`
The main apache2 configuration file is located at: `/etc/apache2/apache2.conf`
