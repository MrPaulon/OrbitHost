export function getLang(): 'fr' | 'en' {
    if (typeof localStorage !== 'undefined') {
      return (localStorage.getItem('lang') as 'fr' | 'en') || 'fr'
    }
    return 'fr'
}
  
export function setLang(lang: 'fr' | 'en') {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lang', lang)
    }
}