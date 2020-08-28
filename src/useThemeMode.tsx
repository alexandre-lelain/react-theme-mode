import React from 'react'
import { ThemeModeContext, ThemeModeType } from './ThemeModeProvider'

/**
 * useThemeMode
 * Hook to retrieve the current theme mode and to update it in the context.
 * Returns an array of two elements:
 * - theme: string | null
 * - (theme: string) => void
 */
const useThemeMode = (): ThemeModeType => React.useContext(ThemeModeContext)

export default useThemeMode
