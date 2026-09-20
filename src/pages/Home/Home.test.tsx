import { http, HttpResponse } from 'msw'
import { server } from '../../test/mocks/node'
import { BASE_URL } from '../../api/characters'
import { render, within } from '@testing-library/react'
import { charactersMockData } from '../../test/mocks/characters'
import Home from './Home'

const setup = () => render(<Home />)

describe('Home', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should display loading while the api call is in progress', () => {
    const home = setup()
    expect(home.getByRole('status').textContent).toBe('Loading characters...')
  })

  it('should render character cards after the api call resolves', async () => {
    const home = setup()
    const mainSection = home.getByTestId('mainSection')
    const characterItems = await within(mainSection).findAllByRole('img')

    expect(characterItems.length).toBe(charactersMockData.length)
    expect(home.getByRole('status').textContent).toBe(
      `${charactersMockData.length} characters found.`,
    )
  })

  it('should display "No characters found." when there are not results', async () => {
    server.use(
      http.get(BASE_URL, () => {
        return HttpResponse.json({ error: 'Nothing found' }, { status: 404 })
      }),
    )
    const home = setup()
    const mainSection = home.getByTestId('mainSection')
    const imgElements = await within(mainSection).findAllByRole('img')

    expect(imgElements.length).toBe(1)
    expect(imgElements[0].getAttribute('alt')).toBe(
      'not characters found image',
    )
    expect(home.getByRole('alert').textContent).toBe('No characters found.')
  })

  it('should display "Something went wrong." when the api call fails', async () => {
    server.use(
      http.get(BASE_URL, () => {
        return HttpResponse.json(
          { error: 'unable to connect' },
          { status: 500 },
        )
      }),
    )
    const home = setup()
    const mainSection = home.getByTestId('mainSection')
    const imgElements = await within(mainSection).findAllByRole('img')

    expect(imgElements.length).toBe(1)
    expect(imgElements[0].getAttribute('alt')).toBe(
      'Something went wrong image',
    )
    expect(home.getByRole('alert').textContent).toBe('Something went wrong.')
  })
})
