## iOS friendly Create-React-App Service Worker

### Note: I haven't tested this example but this is how I solved the issue for my project.

### MIT license - use as you like.

[As noted by Speckles](https://stackoverflow.com/a/55612041/5553768), it appears that iOS will update the serviceworker prior to launching the app.<br/>

This means the `onupdatefound` event isn't very useful for prompting the user for a refresh.<br/>

See in App.js we register the serviceworker and pass in a callback for the SW to let us know when the new SW has been installed.<br/>

Because Safari has already installed the SW before launching, `registerValidSW()` doesn't catch the `installing state`.<br/>

This work-around checks at the top of `registerValidSW()` if the browser is Safari - `if (navigator.vendor === 'Apple Computer, Inc.')`, and checks if the state of the registration is `waiting`.<br/>

If so, then it executes our callback which sets the `promptRefresh` attribute in App.js state to true which in turn renders our refresh prompt.<br/>

The `onClick()` event for the button gets the SW registration and posts the skip waiting message: `reg.waiting.postMessage({ type: 'SKIP_WAITING' });` followed by a reload of the page.
