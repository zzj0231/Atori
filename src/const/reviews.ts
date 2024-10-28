import frierenUrl from '../../public/diary/frieren.png'
import humanBondage from '../../public/diary/human-bondage.jpg'

export enum RE_LABEL {
  'notion' = '小说',
  'biography' = '传记',
  'history' = '历史',
  'economy' = '经济',
  'human' = '人文',
  'science' = '科学',
  'movie' = '电影',
  'animate' = '动漫',
  'grow' = '成长',
  'life' = '生活',
  'soul' = '生命',
  'love' = '爱情',
  'fiction' = '科幻',
  'fantasy' = '奇幻',
  'funny' = '搞笑',
}

export const RE_THEME_TYPE = [
  { key: 'notion', label: RE_LABEL.notion },
  { key: 'biography', label: RE_LABEL.biography },
  { key: 'history', label: RE_LABEL.history },
  { key: 'economy', label: RE_LABEL.economy },
  { key: 'human', label: RE_LABEL.human },
  { key: 'science', label: RE_LABEL.science },
  { key: 'movie', label: RE_LABEL.movie },
  { key: 'animate', label: RE_LABEL.animate },
]

export const RE_CUSTOME_TYPE = [
  { key: 'grow', label: RE_LABEL.grow },
  { key: 'life', label: RE_LABEL.life },
  { key: 'soul', label: RE_LABEL.soul },
  { key: 'love', label: RE_LABEL.love },
  { key: 'fiction', label: RE_LABEL.fiction },
  { key: 'fantasy', label: RE_LABEL.fantasy },
  { key: 'funny', label: RE_LABEL.funny },
]

export const RE_BLUM = [
  {
    name: '人性的枷锁',
    author: '英国 / 威廉·萨默塞特·毛姆',
    cover: humanBondage,
    note: '',
    labels: [RE_LABEL.animate],
    key: 'frieren',
    stars: 5,
  },
  {
    name: '葬送的芙莉莲',
    author: '日本 / 山田钟人',
    cover: frierenUrl,
    note: '',
    labels: [RE_LABEL.animate],
    key: 'frieren',
    stars: 5,
  },
]
