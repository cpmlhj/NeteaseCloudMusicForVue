import * as types from './mutations-type'
import {shuffle} from 'common/js/util'
import {playMode, saveSearch, deleteSearchHistory} from 'common/js/config'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const setCustomer = function ({commit, state}, customer) {
  commit(types.SET_CUSTOMER, customer)
}

export const setShade = function ({commit, state}, shade) {
  commit(types.SET_SHADE, shade)
}

export const setPlayList = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    var randomlist = shuffle(list)
    commit(types.SET_PLAY_LIST, randomlist)
    index = findIndex(randomlist, list[index])
  } else if (list.length === 1) {
    commit(types.SET_PLAY_LIST, list)
    commit(types.SET_PLAY_MODE, playMode.loop)
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAY, true)
  commit(types.SET_PLAYING, true)
  commit(types.SET_PERSON_PLAYING, false)
}

export const inserSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequcelist = state.sequencelist.slice()
  let currentIndex = state.currentIndex
  let fpIndex = findIndex(playlist, song)
  console.log(fpIndex)
  // 播放列表中是否已存在歌曲
  currentIndex++
  console.log(currentIndex)
  playlist.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  let fsIndex = findIndex(sequcelist, song)
  console.log(fsIndex)
  if (fsIndex > -1) {
    if (currentIndex > fsIndex) {
      sequcelist.splice(fsIndex, 1)
    } else {
      sequcelist.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequcelist)
  commit(types.SET_PLAY, true)
  commit(types.SET_PLAYING, true)
  commit(types.SET_CURRENT_INDEX, currentIndex)
}

export const setPersonFMList = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
  commit(types.SET_SHOW_PERSON_FM, true)
  commit(types.SET_PLAY, false)
  commit(types.SET_PERSON_PLAYING, true)
}

export const saveSearchHistory = function ({commit, state}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistorys = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearchHistory(query))
}
