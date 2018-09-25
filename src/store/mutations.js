import * as types from './mutations-type'

export const mutations = {
  [types.SET_CUSTOMER] (state, customer) {
    state.customer = customer
  },
  [types.SET_SHADE] (state, shade) {
    state.isShowShade = shade
  },
  [types.SET_SLIDER] (state, slider) {
    state.isShowSlider = slider
  },
  [types.SET_PLAY] (state, play) {
    state.ShowPlayer = play
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequencelist = list
  },
  [types.SET_PLAY_LIST] (state, list) {
    state.playlist = list
  },
  [types.SET_PLAYING] (state, flag) {
    state.playing = flag
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_PLAY_LOADING] (state, flag) {
    state.showLoading = flag
  },
  [types.SET_SHOW_PLAY_LIST] (state, flag) {
    state.showPlayList = flag
  },
  [types.SET_SHOW_PERSON_FM] (state, flag) {
    state.showPersonFM = flag
  },
  [types.SET_PERSON_PLAYING] (state, flag) {
    state.isPersonFMPlaying = flag
  },
  [types.SET_ARTISTS_DETAIL] (state, Object) {
    state.artistsDetail = Object
  },
  [types.SET_ARTIST_PAGE_INDEX] (state, number) {
    state.artistPageIndex = number
  },
  [types.SET_STATIONS_DETAIL] (state, object) {
    state.stationsDetail = object
  },
  [types.SET_SEARCH_PAGE_INDEX] (state, index) {
    state.searchPageIndex = index
  },
  [types.SET_CURRENT_SEARCH] (state, string) {
    state.currentSearch = string
  },
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  }
}

export default mutations
