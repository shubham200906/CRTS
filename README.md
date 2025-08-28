# My First React Project

This project is a simple React application that demonstrates how to create and handle forms in React. It sets up a form with two input fields: one for a username and one for a password. The inputs are **controlled components**, meaning their values are managed by React state using the `useState hook`.

When the user types into the input fields, the `handleUsername` and `handlePassword` functions update the state with the current values. When the form is submitted, the `formSubmit` function prevents the page from refreshing and logs the entered username and password to the `console`.

The project uses `ReactDOM’s createRoot` to render the main component into the root div. The main component, `MyApp`, contains the form and its event handlers.