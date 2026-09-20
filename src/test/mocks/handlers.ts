import { http, HttpResponse } from 'msw'
import { BASE_URL } from '../../api/characters'
import { charactersMockData } from './characters'

export const handlers = [
  http.get(BASE_URL, () => {
    return HttpResponse.json({
      info: {},
      results: charactersMockData,
    })
  }),
]
