This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Libraries & Toolchains

The frontend system utilizes multiple libraries and tools that provide benefits in different aspects of the user interface. When committing to the frontend repository these tools should be used properly and where applicable. The content below gives short descriptions of the tooling.

### JEST & Enzyme Testing

Both of these utilities provide an isolated JavaScript testing framework that is used for frontend testing.

Implementation example:

```
test("Settings page should be loaded correctly", () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={["/settings"]}>
            <Route />
        </MemoryRouter>,
    );
    expect(wrapper.find(SettingsPage)).toHaveLength(1);
});
```

All new components should include relevant tests using the thes two toolchains.

More documentation [here](https://jestjs.io/) & [here](https://enzymejs.github.io/enzyme/)

### Material UI

To keep the UI consistent the team has used the Material UI library where possible.
Implementation example:

```
<TextField
  className="text-area spacing"
  id="standard-basic"
  label="Location"
  onChange={handleLocationChange}
/>
```

Where possible, material ui components should be adopted and implemented according to the provided documentation.

More documentation [here](https://material-ui.com/)

### React Router

React router is a common library used to handle routing between pages in a webapp.

Implementation example:

```
<Switch>
  <Route exact path="/" component={Login} />
    <Route path="/settings">
      <ThemeContext.Provider value={[theme, setTheme]}>
        <SettingsPage />
      </ThemeContext.Provider>
    </Route>
```

New pages that are added should following the same routing structure setup in `Route.js`.

More documentation [here](https://reacttraining.com/react-router/web/guides/quick-start)

### Tailwind

Tailwind is a CSS framework that the team has used to add consistency styling.

Implementation example:

```
<h2 class="text-lg">Calendar</h2>
<div class="text-purple-500">Support</div>
```

The root level `tailwind.js` file contains a list of the different CSS variants.

More documentation [here](https://tailwindcss.com/)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify (despite referring to `npm`, it can still be useful)
