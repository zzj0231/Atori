import frierenUrl from '../../public/diary/frieren.png'

export enum RE_LABEL {
  'notion' = '小说',
  'biography' = '传记',
  'history' = '历史',
  'economy' = '经济',
  'human' = '人文',
  'science' = '科学',
  'movie' = '电影',
  'animate' = '动漫',
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
  { key: 'grow', label: '成长' },
  { key: 'life', label: '生活' },
  { key: 'soul', label: '生命' },
  { key: 'love', label: '爱情' },
  { key: 'fiction', label: '科幻' },
  { key: 'fantasy', label: '奇幻' },
  { key: 'funny', label: '搞笑' },
]

export const RE_BLUM = [
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
