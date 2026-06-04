import axios from 'axios'

const BASE_URL = 'https://api.jikan.moe/v4'

const api = axios.create({
  baseURL: BASE_URL,
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getTopAnime = async () => {
  await delay(500)
  return api.get('/top/anime')
}

export const getAiringAnime = async () => {
  await delay(1000)
  return api.get('/top/anime?filter=airing')
}

export const getUpcomingAnime = async () => {
  await delay(1500)
  return api.get('/top/anime?filter=upcoming')
}

export const getAnimeById = async (id) => {
  await delay(500)
  return api.get(`/anime/${id}`)
}

export const searchAnime = async (query) => {
  await delay(500)
  return api.get(`/anime?q=${query}`)
}

export const getAnimeCharacters = async (id) => {
  await delay(1000)
  return api.get(`/anime/${id}/characters`)
}

export const getAnimeRecommendations = async (id) => {
  await delay(1500)
  return api.get(`/anime/${id}/recommendations`)
}

export const getSeasonalAnime = async () => {
  await delay(500)
  return api.get('/seasons/now')
}

export const getAnimeGenres = async () => {
  await delay(500)
  return api.get('/genres/anime')
}