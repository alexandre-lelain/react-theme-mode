import React from 'react'
import { ThemeModeContext, ThemeModeType } from './ThemeModeProvider'

const useThemeMode = (): ThemeModeType => React.useContext(ThemeModeContext)

export default useThemeMode
