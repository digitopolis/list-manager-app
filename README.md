# My Media Shelf

## Description

My Media Shelf Is a way for users to keep track of the things they're reading, watching, playing, etc. – and to make lists of similar content. The same way one might make a playlist of their favorite rainy day songs, this allows a user to create curated lists of items across all media types. By keeping track of the items they've completed, they can also see their history and any patterns in their media consumption! The app is currently [available online here](https://mm-list-manager-app.herokuapp.com/) – while instructions for running it locally are below.

### Running Locally

To clone the project, install dependencies, and get it running on your local machine:

```bash
$ git clone git@github.com:digitopolis/list-manager-app.git
$ cd list-manager-app
$ npm install
```

then, you can run:

```bash
$ npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```bash
$ npm test
```

When running the server locally, be sure to update the api endpoints in `./src/apiEndpoints.ts` with the local addresses

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Features

## Navigation

The navigation bar on the left (or top, on narrow screens/devices) provides access to all of the app's features:

#### To log out and return to the sign in/sign up page

<img width="161" alt="Screen Shot 2020-10-15 at 3 17 10 PM" src="https://user-images.githubusercontent.com/41033651/96192233-74da2b80-0efa-11eb-84b8-f5ae1273854e.png">
#### To see a user's lists or create a new list

<img width="247" alt="Screen Shot 2020-10-15 at 3 16 05 PM" src="https://user-images.githubusercontent.com/41033651/96192025-144aee80-0efa-11eb-8c3f-93d2523e2813.png">

#### To add a new item to any existing list

<img width="160" alt="Screen Shot 2020-10-15 at 3 15 46 PM" src="https://user-images.githubusercontent.com/41033651/96192129-35abda80-0efa-11eb-9593-ffdd9bf485e1.png">

#### To see a user's history/stats

<img width="145" alt="Screen Shot 2020-10-15 at 3 15 56 PM" src="https://user-images.githubusercontent.com/41033651/96192191-5e33d480-0efa-11eb-9759-e7f0b0c832b9.png">

## Creating an Account/Signing in

From the [main page](https://mm-list-manager-app.herokuapp.com/) a user has the option of creating a new account or logging into an existing one.

## Resetting Password

If the user has forgotten their password, there's a link under the login form to start the recovery process. After entering the email address associated with the account, they will receive an email with instructions to set a new password, including a unique single-use token to verify and authorize the change.

## Profile

The profile page shows each of the user's lists and some of the items on each. If a list contains more than 5 items,

## Creating New Lists

To create a new list, a user enters a name and (optionally) a description

<img width="551" alt="Screen Shot 2020-10-15 at 3 29 59 PM" src="https://user-images.githubusercontent.com/41033651/96192759-8ff96b00-0efb-11eb-96dd-4518e84655fa.png">

## Adding Items

When adding a new item, a user can supply a few pieces of information. The only required fields are 'Title' and 'Medium' – the 'Genre' tags are optional, but are used for compiling the user's historical data. An option is available for adding a custom tag as well. Finally, the user can choose which list to add the new item to before submitting.

<img width="560" alt="Screen Shot 2020-10-15 at 3 29 28 PM" src="https://user-images.githubusercontent.com/41033651/96192788-a1427780-0efb-11eb-8be6-5f97d82b252e.png">

## Stats

A user's stats page shows their historical data for favorite genres (across all media types), as well as favorite media types.

## Built with

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Formik](https://formik.org/) - React form library
- [Ant Design](https://ant.design/) - React UI component library
- [Chart.js](https://www.chartjs.org/) - Data visualization

# Author

[Matt Readout](https://github.com/digitopolis)
