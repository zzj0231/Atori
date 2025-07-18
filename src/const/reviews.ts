import frierenUrl from '../../public/diary/frieren.webp'
import humanBondage from '../../public/diary/human-bondage.jpg'
import { DiaryNotes } from './notes'

// 国家列表
export const COUNTRIES = [
  { code: 'CN', name: '中国' },
  { code: 'US', name: '美国' },
  { code: 'JP', name: '日本' },
  { code: 'KR', name: '韩国' },
  { code: 'GB', name: '英国' },
  { code: 'FR', name: '法国' },
  { code: 'DE', name: '德国' },
  { code: 'IT', name: '意大利' },
  { code: 'ES', name: '西班牙' },
  { code: 'CA', name: '加拿大' },
  { code: 'AU', name: '澳大利亚' },
  { code: 'RU', name: '俄罗斯' },
  { code: 'IN', name: '印度' },
  { code: 'BR', name: '巴西' },
  { code: 'MX', name: '墨西哥' },
  { code: 'NL', name: '荷兰' },
  { code: 'SE', name: '瑞典' },
  { code: 'NO', name: '挪威' },
  { code: 'DK', name: '丹麦' },
  { code: 'FI', name: '芬兰' },
  { code: 'CH', name: '瑞士' },
  { code: 'AT', name: '奥地利' },
  { code: 'BE', name: '比利时' },
  { code: 'PT', name: '葡萄牙' },
  { code: 'IE', name: '爱尔兰' },
  { code: 'NZ', name: '新西兰' },
  { code: 'SG', name: '新加坡' },
  { code: 'MY', name: '马来西亚' },
  { code: 'TH', name: '泰国' },
  { code: 'VN', name: '越南' },
  { code: 'PH', name: '菲律宾' },
  { code: 'ID', name: '印度尼西亚' },
  { code: 'TR', name: '土耳其' },
  { code: 'SA', name: '沙特阿拉伯' },
  { code: 'AE', name: '阿联酋' },
  { code: 'IL', name: '以色列' },
  { code: 'EG', name: '埃及' },
  { code: 'ZA', name: '南非' },
  { code: 'AR', name: '阿根廷' },
  { code: 'CL', name: '智利' },
  { code: 'PE', name: '秘鲁' },
  { code: 'CO', name: '哥伦比亚' },
  { code: 'VE', name: '委内瑞拉' },
  { code: 'OTHER', name: '其他' },
]

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
    title: '葬送的芙莉莲',
    author: '山田钟人',
    country: 'JP',
    cover: frierenUrl,
    content: DiaryNotes.frieren,
    labels: [RE_LABEL.animate, RE_LABEL.soul],
    key: 'frieren',
    stars: 5,
    date: 'Jan 12, 2025',
    id: '002',
  },
  {
    title: '人性的枷锁',
    author: '威廉·萨默塞特·毛姆',
    country: 'GB',
    cover: humanBondage,
    content: DiaryNotes.homeBondage,
    labels: [RE_LABEL.notion],
    key: 'homeBondage',
    stars: 4.5,
    date: 'Nov 2, 2024',
    id: '001',
  },
]

export const REVALIDATE_REVIEW_KEY = 'reviews'
