# Local Entertainment App

This application is for finding fun activities and venues near my neighborhood. The React application allows the user to filter through a list and click map pins for additional information on each location.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Some of Create-React-App's README information that is useful to running this project can be found [below](#table-of-contents).

You can find the most recent and full version of the Create React App guide [here](https://facebook.github.io/create-react-app/docs/getting-started).

Additionally, this application makes use of the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) and [Foursquare Places API](https://developer.foursquare.com/places-api).


## Run the application
1)
    * To retrieve the files you can fork and clone, or directly clone the repository from this page.
    * If you are downloading the files, unzip them, and extract the files to where you want them in your directory.
2)
    * CD into the directory where the root folder of the application is and run ```npm install``` in your terminal or cmd line.
3)
    * Now run ```npm start``` to run a live version of the application in development mode.
      * This will automatically open a new window in your default browser at [http://localhost:3000](http://localhost:3000).
4)
    * To run a production version of the app locally enter ```npm run build```.
      * When the npm building process is complete follow the terminal directions to run a local production build.
5)
    * Alternatively you can visit the live link to this app [here](https://lucid-morse-acb665.netlify.com/).


## Using the application
Local places for fun and entertainment will be marked on the map.

Each marker can be clicked for more information. The filter list can also have its items clicked to bring up additional information at the associated markers.

Using the filter locations field to search will show only markers on the map and list items containing letters matching the query.

## Acknowledgements
Thanks to Ryan Waite for his [load_google_maps()](https://github.com/ryanwaite28/script-store/blob/master/js/react_resolve_google_maps.js)  helper function. Check out more of Ryan's code [here](https://github.com/ryanwaite28).

 Map style provided through [Snazzy Maps](https://snazzymaps.com/). Map style created by Allen Lu, the theme is titled [傑立資訊-Julyinfo](https://snazzymaps.com/style/128056/%E5%82%91%E7%AB%8B%E8%B3%87%E8%A8%8A-julyinfo).

Menu icon (menu.svg) was created by [Cole Bemis](https://www.flaticon.com/authors/cole-bemis). Icon provided through [Flaticon](https://www.flaticon.com/).
Image is licensed as [Creative Commons BY 3.0 ](http://creativecommons.org/licenses/by/3.0/).

## Table of Contents
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Supported Browsers](#supported-browsers)
- [Supported Language Features and Polyfills](#supported-language-features-and-polyfills)

## Folder Structure

Current project folder structure look like this (after npm install):

```
NeighborhoodMap/
  .git/
  .gitignore
  node_modules/
  package.json
  package-lock.json
  public/
    index.html
    favicon.ico
  README.md
  serviceWorker.js
  src/
    App.css
    App.js
    App.test.js
    Components/
      Header.js
      Map.js
      Sidebar.js
    index.css
    index.js
    logo.svg
    menu.svg
  TODO.md
    Utilities/
      MapStyle.js
      Utils.js
```

For the project to build, **these files must exist with exact filenames**:

- `public/index.html` is the page template;
- `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## Supported Language Features and Polyfills

This project supports a superset of the latest JavaScript standard.<br>
In addition to [ES6](https://github.com/lukehoban/es6features) syntax features, it also supports:

* [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016).
* [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017).
* [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
* [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 3 proposal)
* [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal).
* [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and [Flow](https://flowtype.org/) syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

While we recommend using experimental proposals with some caution, Facebook heavily uses these features in the product code, so we intend to provide [codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb) if any of these proposals change in the future.

Note that **the project only includes a few ES6 [polyfills](https://en.wikipedia.org/wiki/Polyfill)**:

* [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) via [`object-assign`](https://github.com/sindresorhus/object-assign).
* [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) via [`promise`](https://github.com/then/promise).
* [`fetch()`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) via [`whatwg-fetch`](https://github.com/github/fetch).

If you use any other ES6+ features that need **runtime support** (such as `Array.from()` or `Symbol`), make sure you are including the appropriate polyfills manually, or that the browsers you are targeting already support them.

Also note that using some newer syntax features like `for...of` or `[...nonArrayValue]` causes Babel to emit code that depends on ES6 runtime features and might not work without a polyfill. When in doubt, use [Babel REPL](https://babeljs.io/repl/) to see what any specific syntax compiles down to.

[BACK TO TOP](#local-entertainment-app)