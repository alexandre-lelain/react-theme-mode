import React from 'react'
import { render } from '@testing-library/react'

import ThemeModeProvider from '../ThemeModeProvider'

describe('<ThemeModeProvider>', () => {
  test('it renders any child', () => {
    const { getByText } = render(
      <ThemeModeProvider defaultMode="light">
        <p>hello, world</p>
      </ThemeModeProvider>,
    )
    const myP = getByText('hello, world')
    expect(myP).toBeInTheDocument()
  })

  test('it renders multiple children', () => {
    const { getByText } = render(
      <ThemeModeProvider defaultMode="light">
        <p>hello</p>
        <p>world</p>
      </ThemeModeProvider>,
    )
    const hello = getByText('hello')
    const world = getByText('hello')

    expect(hello).toBeInTheDocument()
    expect(world).toBeInTheDocument()
  })
})
