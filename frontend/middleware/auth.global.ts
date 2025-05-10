export default defineNuxtRouteMiddleware((to, from) => {
    const token = process.client ? localStorage.getItem('token') : null
  
    const isAuthPage = to.path.startsWith('/auth')
  
    if (!token && !isAuthPage) {
      return navigateTo('/auth/login')
    }
  
    // Si déjà connecté et tente d'aller sur /auth/login, on peut aussi rediriger :
    if (token && isAuthPage) {
      return navigateTo('/')
    }
})