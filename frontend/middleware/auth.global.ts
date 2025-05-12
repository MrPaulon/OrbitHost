export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!process.client) return

  const token = localStorage.getItem('token')
  const isAuthPage = to.path.startsWith('/auth')

  if (!token) {
    if (!isAuthPage) return navigateTo('/auth/login')
    return
  }

  try {
    await $fetch('http://localhost:3001/api/token/verify', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    localStorage.removeItem('token')
    if (!isAuthPage) return navigateTo('/auth/login')
  }

  if (token && isAuthPage) {
    return navigateTo('/')
  }
})