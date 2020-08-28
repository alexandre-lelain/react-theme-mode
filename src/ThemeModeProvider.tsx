import React from 'react'
import PropTypes from 'prop-types'

const MODE_KEY = 'theme-mode'

const isSSR = () => typeof window === 'undefined'

export const ThemeModeContext = React.createContext<ThemeModeType>([
  null,
  () => undefined,
])

const saveMode = (mode: string): void =>
  isSSR() ? undefined : localStorage.setItem(MODE_KEY, mode)

const getMode = (): string | null =>
  isSSR() ? null : localStorage.getItem(MODE_KEY)

/**
 * ThemeModeProvider
 * Provides a state management for the theme-mode. By default, it
 * will look for the value stored in the localStorage. If it does not
 * exist, it will fallback to the defaultTheme you give it. If no defaultTheme
 * is given, it will return null.
 */
const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({
  children,
  defaultTheme = null,
  isSSR = false,
  noStorage = false,
}) => {
  const initialMode = React.useMemo(() => {
    if (!noStorage && !isSSR) {
      return getMode() ?? defaultTheme
    }
    return defaultTheme
  }, [defaultTheme, noStorage, isSSR])
  const [mode, setMode] = React.useState(initialMode)

  React.useEffect(() => {
    const savedMode = getMode()
    if (isSSR && !!savedMode && defaultTheme !== savedMode) {
      setMode(savedMode)
    }
  }, [defaultTheme])

  const onSetMode = (mode: string): void => {
    const modeType = typeof mode
    if (modeType !== 'string') {
      throw new Error(
        `The theme mode must be a string, however you provided: ${modeType}. Please check the value you sent to useThemeMode()[1].`,
      )
    }
    setMode(mode)
    !noStorage && saveMode(mode)
  }

  return (
    <ThemeModeContext.Provider value={[mode, onSetMode]}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export type ThemeModeType = [string | null, (mode: string) => void]

export interface ThemeModeProviderProps {
  /**
   * Any node you want to render inside the Provider.
   */
  children?: React.ReactNode
  /**
   * The initial & default theme mode. The provider will fallback to this value
   * if it does not find the saved mode in the localStorage. Required.
   */
  defaultTheme: string
  /**
   * If you are rendering your front-end on server-side, and using CSS-in-JS solutions,
   * set this prop to true. Since localStorage is not available on server-side, we
   * need to update the internal state during runtime, and re-render the react views.
   */
  isSSR?: boolean
  /**
   * By default, the theme-mode selected by the vistor is saved in the localStorage,
   * Use this prop if you don't want to save it nor use it as initial value.
   */
  noStorage?: boolean
}

ThemeModeProvider.propTypes = {
  children: PropTypes.node,
  defaultTheme: PropTypes.string.isRequired,
  isSSR: PropTypes.bool,
  noStorage: PropTypes.bool,
}

export default ThemeModeProvider
