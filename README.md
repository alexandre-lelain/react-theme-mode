<div align="center">

<h1>🌗 react-theme-mode</h1>

<p>Hook to manage your theme mode in React.</p>

<br/>

[![npm version](https://img.shields.io/npm/v/react-theme-mode.svg?style=flat)](https://www.npmjs.com/package/react-theme-mode)
[![ci status](https://github.com/alexandre-lelain/react-theme-mode/workflows/CI/badge.svg)](https://github.com/alexandre-lelain/react-theme-mode/actions?query=workflow%3ACI)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/alexandre-lelain/react-theme-mode/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/alexandre-lelain/react-theme-mode/pulls)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![build formats](https://img.shields.io/badge/module%20formats-cjs%2C%20esm-green.svg)](https://github.com/alexandre-lelain/react-theme-mode)
[![bundle size](https://badgen.net/bundlephobia/min/react-theme-mode@latest)](https://bundlephobia.com/result?p=react-theme-mode@latest)

<br/>

</div>

## Menu

- [Motivation](#motivation)
- [Requirements](#requirements)
- [Get Started](#get-started)
- [API](#api)
- [Contributing](#contributing)

## Motivation

Do you often find yourself in a situation where you have to implement once more the **theme mode** management in your React application ?

Would you like your **theme mode** to be saved in your users' browser for future visits ?

Well, if so, **react-theme-mode** was made for you. It handles all those features for you. It comes you with a pair of Provider and Hook
that will provide you with the following features:

- Management of the **theme mode** across all your React application.
- The Hook comes with a simple interface: the theme and a setter.
- The **theme mode** picked by your users will automatically be saved to their **localStorage**.
- Next time your users visit your application, their saved **theme mode** will be used by default.

> **Note**: react-theme-mode is also Server-Side-Rendering friendly! :)

## Requirements

Since the library was built using React, you will need the following dependancy to make it work:

- **[react >= 16.8.0](https://www.npmjs.com/package/react)**

## Get Started

### Installation

`yarn add react-theme-mode` or `npm add react-theme-mode`.

### Imports

**react-theme-mode** is shipped in both **cjs** and **esm** formats, so you can use either ES5 or ES6+ imports:

ES6

```js
import { useThemeMode } from 'react-theme-mode'
```

ES5

```js
const { useThemeMode } = require('react-theme-mode')
```


Also: **react-theme-mode** is **tree-shakeable** and **side-effects free**!

### Usage

You only need **two steps** to get started:

#### 1. The Provider 

Since **react-theme-mode** is built using React's *Context*, you will need to wrap your React application, or at least the part
of your application that will consume the Hook inside the `<ThemeModeProvider>` component:

```js
import { ThemeModeProvider } from 'react-theme-mode'
import SomeComponent from './SomeComponent'

const App = () => {
  return (
    <ThemeModeProvider defaultTheme="dark">
      <SomeComponent />
    </ThemeModeProvider>
  )
}
```

Please note that the *defaultTheme* prop is mandatory in case the client doesn't have any theme saved in the broswer yet.

You may be rendering your React application on **server-side** using **CSS-in-JS** solutions - in this case, since the views are built on the server,
there is no **localStorage** to access to. You will need to pass the `isSSR` prop to the `<ThemeModeProvider>` so that it re-renders the views on runtime,
to take into account the theme mode stored in the **localStorage**.

#### 2. The Hook

You can then consume the **useThemeMode()** hook and manage your theme from `SomeComponent`:


```js
import { useThemeMode } from 'react-theme-mode'

const SomeComponent = () => {
  const [theme, setTheme] = useThemeMode()
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('light')}>light theme</button>
    </div>
  )
}
```

The `setTheme()` function will automatically save the new theme in the *localStorage* for future visits. You can disable
this default behavior using the *noStorage* prop. See the [API](#api) section below for more references.

> Since the `useThemeMode()` hook is using a Context, you can manage your theme from **anywhere** inside your React application.

## API

### ThemeModeProvider

A React provider. Provides a state management for the theme mode. You need to wrap any of your components that consume the **useThemeMode()** hook inside it.
It acts mainly as a initializer of your theme.

#### Props

| Props         | Type          | Default Value  | Description |
| ------------- |:-------------:| :-------------:| :------------- |
| defaultTheme* | string        |                | The default theme mode. The provider will fallback to this value if it does not find the saved mode in the **localStorage**. Required.  |
| isSSR         | boolean       | false          | If you are rendering your front-end on **server-side**, and using **CSS-in-JS** solutions, set this prop to `true`. Since **localStorage** is not available on server-side, we need to update the internal state during runtime, and re-render the react views.  |
| noStorage     | boolean       | false          | By default, the theme-mode selected by the vistor is saved in the **localStorage**. Use this prop if you don't want to save it nor use it as initial value. |

#### Example

```jsx
<ThemeModeProvider defaultTheme="dark">
  <SomeComponent />
</ThemeModeProvider>
```

### useThemeMode()

A React hook. You can use this hook to manage your theme across your application on runtime. Just like *React.setState()*, the hook returns an array of *2* elements: the theme and its setter.

By default, it will look for the value stored in the **localStorage**. If it does not
exist, it will fallback to the *defaultTheme* you give it. If no *defaultTheme* is given, it will return `null`.

#### Returns

- **Array *[string | null, (string) => void]***: the array containing the theme and its setter.

#### Example

```js
const [theme, setTheme] = useThemeMode()
...
setTheme('dark')
```


## Contributing

Any contribution would be more than welcome.

Found any bugs or you have some ideas ? Please, open an issue or a PR! :)

**The following commands are executed with [yarn](https://yarnpkg.com/lang/en/), but you can of course use any package manager tool like npm or npx.**

To install dependencies:

```shell
yarn install
```

To build the project:
```shell
yarn build
```

To run the tests:
```shell
yarn test
```

Before you commit:
```shell
yarn validate
```
