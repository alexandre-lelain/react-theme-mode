// We need to disable TS because we are checking that an error is thrown when the mode's type mismatch.
// @ts-nocheck
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import ThemeModeProvider from '../ThemeModeProvider'
import useThemeMode from '../useThemeMode'

describe('useThemeMode()', () => {
  Storage.prototype.getItem = jest.fn()
  Storage.prototype.setItem = jest.fn()

  test('it returns an array with the mode and the setter', () => {
    const Consumer = () => {
      const [mode, setMode] = useThemeMode()
      expect(mode).toEqual('light')
      expect(setMode).toBeInstanceOf(Function)
      return <p>hello, world</p>
    }
    render(
      <ThemeModeProvider defaultMode="light">
        <Consumer />
      </ThemeModeProvider>,
    )
  })

  test('it updates the mode when the setter is called', () => {
    const Consumer = () => {
      const [mode, setMode] = useThemeMode()
      return (
        <p data-testid="my-p" onClick={() => setMode('dark')}>
          {mode}
        </p>
      )
    }
    const { getByTestId } = render(
      <ThemeModeProvider defaultMode="light">
        <Consumer />
      </ThemeModeProvider>,
    )
    const myP = getByTestId('my-p')
    expect(myP).toHaveTextContent('light')

    fireEvent.click(myP)
    expect(myP).toHaveTextContent('dark')
  })

  test('it should throw an error when a non-string mode is provided to the setter', () => {
    const Consumer = () => {
      const [mode, setMode] = useThemeMode()
      expect(() => setMode(42)).toThrow()

      return (
        <p data-testid="my-p" onClick={() => setMode(42)}>
          {mode}
        </p>
      )
    }
    const { getByTestId } = render(
      <ThemeModeProvider defaultMode="light">
        <Consumer />
      </ThemeModeProvider>,
    )
    const myP = getByTestId('my-p')
    expect(myP).toHaveTextContent('light')
  })

  test('it uses the mode saved in storage by default, even if a defaultMode is provided', () => {
    Storage.prototype.getItem = jest.fn(() => 'opal')

    const Consumer = () => {
      const [mode] = useThemeMode()
      expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1)
      expect(mode).toEqual('opal')
      return <p data-testid="my-p">{mode}</p>
    }
    const { getByTestId } = render(
      <ThemeModeProvider defaultMode="light">
        <Consumer />
      </ThemeModeProvider>,
    )
    const myP = getByTestId('my-p')
    expect(myP).toHaveTextContent('opal')
  })

  test('it saves the mode in storage by default', () => {
    global.mode = 'light'
    Storage.prototype.getItem = jest.fn(() => global.mode)
    Storage.prototype.setItem = jest.fn(
      (key, newMode) => (global.mode = newMode),
    )

    const Consumer = () => {
      const [mode, setMode] = useThemeMode()
      return (
        <p data-testid="my-p" onClick={() => setMode('ghost')}>
          {mode}
        </p>
      )
    }
    const { getByTestId } = render(
      <ThemeModeProvider defaultMode="light">
        <Consumer />
      </ThemeModeProvider>,
    )
    const myP = getByTestId('my-p')
    expect(Storage.prototype.getItem()).toEqual('light')

    fireEvent.click(myP)
    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1)
    expect(Storage.prototype.getItem()).toEqual('ghost')
  })

  test('it does not use the mode saved in storage if "noStorage" prop is provided.', () => {
    Storage.prototype.getItem = jest.fn(() => 'light')

    const Consumer = () => {
      const [mode] = useThemeMode()
      expect(mode).toEqual('opal')
      return <p data-testid="my-p">{mode}</p>
    }
    const { getByTestId } = render(
      <ThemeModeProvider defaultMode="opal" noStorage>
        <Consumer />
      </ThemeModeProvider>,
    )
    const myP = getByTestId('my-p')
    expect(myP).toHaveTextContent('opal')
  })
})
