import axios from 'axios'
import {initSong} from 'common/js/song'

export function getPersonFm () {
  return new Promise((resolve, reject) => {
    axios('personal_fm').then((res) => {
      if (res.data.code === 200) {
        var ret = []
        res.data.data.forEach((res) => {
          ret.push(initSong(res))
        })
        resolve(ret)
      } else {
        reject('error')
      }
    })
  })
}
