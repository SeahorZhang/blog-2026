import pineceWebextImg from '@/assets/imgs/projects/pineceWebextImg.png'
import syncCookiesImg from '@/assets/imgs/projects/syncCookiesImg.png'
import wtabImg from '@/assets/imgs/projects/wtab.png'

export const settings = {
  christmas: false,
}

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/SeahorZhang/widgets_desktop',
    icon: 'tabler-brand-github',
    bgColor: '#181717',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/SeahorZhang',
    icon: 'tabler-brand-x',
    bgColor: '#000000',
  },
  {
    name: '微博',
    url: 'https://www.weibo.com/u/1824294237',
    icon: 'tabler-brand-weibo',
    bgColor: '#E6162D',
  },
]

export const projects = [
  {
    name: 'WTab',
    info: '浏览器首页导航',
    description: '一款高度可定制的浏览器新标签页扩展，支持自定义布局、网站收藏和搜索引擎，为您提供更高效的网络导航体验。',
    url: 'https://chromewebstore.google.com/detail/wtab/diiielhbpbgalhohmfelhgaakdjcmkjl?authuser=0&hl=zh-CN',
    img: wtabImg,
    type: 'Chrome扩展',
  },
  {
    name: 'pinece-webext',
    info: '浏览器书签导出',
    description: '便捷的书签管理工具，可一键导出浏览器书签为多种格式，支持云同步和跨浏览器迁移，帮助您整理和备份重要网站收藏。',
    url: 'https://chromewebstore.google.com/detail/pinece-webext/oloddfdfgpipbngfcohnfpgdallhnoep?authuser=0&hl=zh-CN',
    img: pineceWebextImg,
    type: 'Chrome扩展',
  },
  {
    name: 'Sync Cookies',
    info: '多域名cookies同步',
    description: '解决多域名网站登录问题的实用工具，自动同步不同域名之间的Cookie信息，提升用户在相关站点间的无缝体验。',
    url: 'https://chromewebstore.google.com/detail/sync-cookies/hcehoofohgpjngheemopifodkamccbij?authuser=0&hl=zh-CN',
    img: syncCookiesImg,
    type: 'Chrome扩展',
  },
]
