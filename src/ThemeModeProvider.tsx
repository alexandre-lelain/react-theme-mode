import React from 'react'
import PropTypes from 'prop-types'
import { isSSR } from 'js-extra'

const MODE_KEY = 'theme-mode'

const ThemeModeContext = React.createContext(ThemeMode)

const saveMode = (mode: string): void => (isSSR() ? null : localStorage.setItem(MODE_KEY, mode))

const getMode = (): string | null => (isSSR() ? null : localStorage.getItem(MODE_KEY))

/**
 * ThemeModeProvider
 * Provides a state management for the theme-mode. By default, it
 * will look for the value stored in the localStorage. If it does not
 * exist, it will fallback to the initial mode you give it. If no initial
 * mode is given, it will return null.
 */
const ThemeModeProvider = ({ children, defaultMode, noStorage = false }) => {
  const [mode, setMode] = React.useState(defaultMode)

  const onSetMode = (mode: string) => {
    setMode(mode)
    !noStorage && saveMode(mode)
  }

  return <ThemeModeContext.Provider value={[mode, onSetMode]}>{children}</ThemeModeContext.Provider>
}

export type ThemeMode = [string, () => void]

export interface ThemeModeProviderType {
  /**
   * Any node you want to render inside the Provider.
   */
  children?: React.ReactNode
  /**
   * The initial & default mode. The provider will fallback to this value
   * if it does not find the saved mode in the localStorage. Required.
   */
  defaultMode: string
  /**
   * By default, the theme-mode selected by the vistor is saved in the localStorage.
   * Use this prop if you don't want to save it.
   */
  noStorage?: boolean
}

ThemeModeProvider.propTypes = {
  children: PropTypes.node,
  defaultMode: PropTypes.string.isRequired,
  noStorage: PropTypes.bool,
}

export default ThemeModeProvider
