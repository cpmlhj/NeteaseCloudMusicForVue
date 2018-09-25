import axios from 'axios'
export default class Song {
  constructor ({id, singer, name, type, img, url, duration, alias}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.type = type
    this.img = img
    this.url = url
    this.duration = duration
    this.alias = alias
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    var data = {id: this.id}
    return new Promise((resolve, reject) => {
      axios('lyric', {params: data}).then((res) => {
        if (res.data.code === 200 && res.data.lrc) {
          this.lyric = res.data.lrc.lyric
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.id,
    singer: musicData.singer,
    name: musicData.name,
    type: musicData.type,
    img: `${musicData.musicImg}?imageView&thumbnail=360y360&quality=75&tostatic=0`,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    duration: musicData.duration,
    alias: musicData.alias
  })
}

export function initSong (musicData) {
  return new Song({
    id: musicData.id,
    singer: musicData.artists[0].name,
    name: musicData.name,
    type: musicData.album.name,
    img: `${musicData.album.picUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    duration: musicData.duration
  })
}

export function initSonglit (list) {
  var songs = []
  if (!list[0].album) {
    list.forEach((item) => {
      let musicData = {
        id: item.id,
        singer: item.ar[0].name,
        name: item.name,
        type: item.al.name,
        musicImg: 'http://p3.music.126.net/pZtbShq4lKbZIIUxoVRnIg==/19176582300629051.jpg',
        duration: item.dt
      }
      songs.push(createSong(musicData))
    })
    return songs
  } else {
    list.forEach((item) => {
      let musicData = {
        id: item.id,
        singer: item.album.artists[0].name,
        name: item.name,
        type: item.album.name,
        musicImg: item.album.picUrl,
        duration: item.duration
      }
      return songs.push(createSong(musicData))
    })
  }
}

export function getUrl (id) {
  var data = {
    id: id
  }
  return new Promise((resolve, reject) => {
    axios('music/url', {params: data}).then((res) => {
      resolve(res.data.data[0].url)
    })
  })
}
