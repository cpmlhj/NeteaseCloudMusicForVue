import storage from 'good-storage'
const SEARCH_KEY = '_SEARCH_'
const maxLen = 5
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}
function inserArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  console.log(index)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

export function saveSearch (query) {
  let storages = storage.get(SEARCH_KEY, [])
  inserArray(storages, query, (item) => {
    return item === query
  }, maxLen)
  storage.set(SEARCH_KEY, storages)
  return storages
}

function deleteSearch (arr, compare) {
  let index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function deleteSearchHistory (query) {
  let storages = storage.get(SEARCH_KEY, [])
  deleteSearch(storages, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, storages)
  return storages
}
