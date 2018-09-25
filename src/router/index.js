import Vue from 'vue'
import Router from 'vue-router'
import Community from 'components/community/community'
import Video from 'components/video/video'
import Music from 'components/music/music'
import MusicFind from 'components/music-find/music-find'
import MusicMine from 'components/music-mine/music-mine'
import MusicVideoStation from 'components/music-videoStation/music-videoStation'
import Login from 'components/login/login'
import Sheet from 'components/song-sheet/song-sheet'
import AllSheet from 'components/all-sheet/all-sheet'
import SongGrounding from 'components/song-grounding/song-grounding'
import album from 'base/album/album'
import rank from 'components/rank/rank'
import rankList from 'base/rank-list/rank-list'
import SingerDetail from 'components/singer-detail/singer-detail'
import StationDetail from 'base/video-station-detail/video-station-detail'
import Search from 'components/search/search'
import searchDetail from 'components/search-detail/search-detail'
import Comment from 'base/comment/comment'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/music'
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
      children: [
        {
          path: 'find',
          name: 'find',
          component: MusicFind,
          children: [
            {
              path: 'allsheet',
              component: AllSheet,
              children: [
                {
                  path: 'sheet/:id',
                  component: Sheet
                }
              ]
            },
            {
              path: 'sheet/:id',
              name: 'sheet',
              component: Sheet
            },
            {
              path: 'songgrounding',
              component: SongGrounding,
              children: [
                {
                  path: 'album/:id',
                  component: album
                }
              ]
            },
            {
              path: 'rank',
              component: rank,
              children: [
                {
                  path: 'list/:id',
                  component: rankList
                },
                {
                  path: 'artists',
                  component: SingerDetail
                },
                {
                  path: 'album/:id',
                  component: album
                }
              ]
            }
          ]
        },
        {
          path: 'mine',
          name: 'mine',
          component: MusicMine,
          children: [
            {
              path: 'sheet/:id',
              component: Sheet
            }
          ]
        },
        {
          path: 'videoStation',
          name: 'FM',
          component: MusicVideoStation,
          children: [
            {
              path: 'detail',
              component: StationDetail
            }
          ]
        }
      ]
    },
    {
      path: '/video',
      name: 'video',
      component: Video
    },
    {
      path: '/community',
      name: 'community',
      component: Community
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [
        {
          path: 'detail',
          name: 'searchDetail',
          component: searchDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: SingerDetail
    },
    {
      path: '/album/:id',
      component: album
    },
    {
      path: '/sheet/:id',
      component: Sheet
    },
    {
      path: '/station',
      component: StationDetail
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: Comment
    }
  ]
})
