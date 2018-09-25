import state from './state'

export const customer = state => state.customer

export const shade = state => state.isShowShade

export const slider = state => state.isShowSlider

export const play = state => state.ShowPlayer

export const sequenceList = state => state.sequencelist

export const playList = state => state.playlist

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const playing = state => state.playing

export const mode = state => state.mode

export const loading = state => state.showLoading

export const showPlayList = state => state.showPlayList

export const showPersonFM = state => state.showPersonFM

export const personPlaying = state => state.isPersonFMPlaying

export const artists = state => state.artistsDetail

export const artistPageIndex = state => state.artistPageIndex

export const stationsDetail = state => state.stationsDetail

export const searchPageIndex = state => state.searchPageIndex

export const currentSearch = state => state.currentSearch

export const searchHistory = state => state.searchHistory
