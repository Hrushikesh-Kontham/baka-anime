const ANILIST_URL = 'https://graphql.anilist.co'
const cache = {}

const query = async (key, graphqlQuery, variables = {}) => {
  if (cache[key]) return cache[key]
  const response = await fetch(ANILIST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query: graphqlQuery, variables })
  })
  if (!response.ok) throw new Error('AniList API error: ' + response.status)
  const data = await response.json()
  if (data.errors) throw new Error(data.errors[0].message)
  cache[key] = data.data
  return data.data
}

export const getTrending = () => query('trending', `
  {
    Page(page: 1, perPage: 48) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title { romaji english }
        coverImage { extraLarge color }
        bannerImage
        averageScore
        episodes
        status
        genres
        format
        nextAiringEpisode { timeUntilAiring episode }
      }
    }
  }
`)

export const getPopularThisSeason = () => query('seasonal', `
  {
    Page(page: 1, perPage: 48) {
      media(sort: POPULARITY_DESC, type: ANIME, season: SPRING, seasonYear: 2026) {
        id
        title { romaji english }
        coverImage { extraLarge color }
        bannerImage
        averageScore
        episodes
        status
        genres
        format
      }
    }
  }
`)

export const getAllTimePopular = () => query('popular', `
  {
    Page(page: 1, perPage: 48) {
      media(sort: POPULARITY_DESC, type: ANIME, status: FINISHED) {
        id
        title { romaji english }
        coverImage { extraLarge color }
        bannerImage
        averageScore
        episodes
        status
        genres
        format
      }
    }
  }
`)

export const getTopRated = () => query('toprated', `
  {
    Page(page: 1, perPage: 48) {
      media(sort: SCORE_DESC, type: ANIME, status: FINISHED) {
        id
        title { romaji english }
        coverImage { extraLarge color }
        averageScore
        episodes
        status
        genres
        format
      }
    }
  }
`)

export const getSeasonalAnime = () => query('seasonal_page', `
  {
    Page(page: 1, perPage: 48) {
      media(sort: POPULARITY_DESC, type: ANIME, season: SPRING, seasonYear: 2026) {
        id
        title { romaji english }
        coverImage { extraLarge color }
        bannerImage
        averageScore
        episodes
        status
        genres
        format
        nextAiringEpisode { timeUntilAiring episode }
      }
    }
  }
`)

export const getAniListAnimeById = (id) => query('anime_' + id, `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title { romaji english native }
      coverImage { extraLarge color }
      bannerImage
      averageScore
      episodes
      status
      genres
      format
      seasonYear
      studios { nodes { name isAnimationStudio } }
      nextAiringEpisode { timeUntilAiring episode }
      description
      trailer { id site }
      relations {
        edges {
          relationType
          node {
            id
            title { romaji english }
            coverImage { extraLarge }
            type
            format
          }
        }
      }
      recommendations(perPage: 6) {
      nodes {
        mediaRecommendation {
          id
          title { romaji english }
          coverImage { extraLarge }
          averageScore
          format
          episodes
        }
      }
    }
    }
  }
`, { id })

export const searchAniList = (search) => query('search_' + search, `
  query ($search: String) {
    Page(page: 1, perPage: 48) {
      media(search: $search, type: ANIME) {
        id
        title { romaji english }
        coverImage { extraLarge color }
        bannerImage
        averageScore
        episodes
        status
        genres
        format
      }
    }
  }
`, { search })