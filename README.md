<div align="center">

<h1>🌗 react-theme-mode</h1>

<p>Hook to manage your theme mode in React.</p>

<br/>

[![npm version](https://img.shields.io/npm/v/react-theme-mode.svg?style=flat)](https://www.npmjs.com/package/react-theme-mode)
[![ci status](https://travis-ci.org/alexandre-lelain/react-theme-mode.svg?branch=master)](https://travis-ci.org/alexandre-lelain/react-theme-mode)
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

Since **react-theme-mode** is built using React's Context, you will need to wrap your React application, or at least the part
of your application that will consume the Hook inside the `ThemeModeProvider` component:

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

You can then consume the **useThemeMode()** hook from `SomeComponent`:


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
this default behavior using the *noStorage* prop. See the API section below for more references.

## API

### ThemeModeProvider

Provides a state management for the theme mode. You need to wrap any of your components that consume the **useThemeMode()** hook inside it.
It acts mainly as a initializer of your theme.

#### Props

| Props         | Type          | Default Value  | Description |
| ------------- |:-------------:| :-------------:| :------------- |
| defaultMode*  | string        |                | The default mode. The provider will fallback to this value if it does not find the saved mode in the localStorage. Required.  |
| noStorage     | boolean       |   false        | By default, the theme-mode selected by the vistor is saved in the localStorage. Use this prop if you don't want to save it nor use it as initial value. |

#### Example

```jsx
<ThemeModeProvider defaultTheme="dark">
  <SomeComponent />
</ThemeModeProvider>
```

### useThemeMode()

You can use this hook to manage your theme across your application on runtime. Just like *React.setState()*, the hook returns an array of *2* elements: the theme and its setter.

By default, it will look for the value stored in the **localStorage**. If it does not
exist, it will fallback to the *defaultTheme* you give it. If no *defaultTheme* is given, it will return null.

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