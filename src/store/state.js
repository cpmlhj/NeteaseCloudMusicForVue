import {playMode, loadSearch} from 'common/js/config'

const state = {
  customer: {},
  isShowShade: false,
  isShowSlider: false,
  ShowPlayer: false,
  playlist: [],
  sequencelist: [],
  currentIndex: '',
  playing: false,
  mode: playMode.sequence,
  showLoading: false,
  showPlayList: false,
  showPersonFM: false,
  isPersonFMPlaying: false,
  artistsDetail: {},
  artistPageIndex: '',
  stationsDetail: {},
  searchPageIndex: 0,
  currentSearch: '',
  searchHistory: loadSearch()
}

export default state
