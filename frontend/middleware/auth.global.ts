export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!process.client) return

  const token = localStorage.getItem('token')
  const isAuthPage = to.path.startsWith('/auth')

  if (!token) {
    if (!isAuthPage) return navigateTo('/auth/login')
    return
  }

  let payload
  try {
    payload = JSON.parse(atob(token.split('.')[1]))

    await $fetch('http://localhost:3001/api/token/verify', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    localStorage.removeItem('token')
    if (!isAuthPage) return navigateTo('/auth/login')
    return
  }

  const isAdminRoute = to.path.startsWith('/admin')
  if (isAdminRoute && !payload?.isAdmin) {
    return navigateTo('/')
  }

  if (token && isAuthPage) {
    return navigateTo('/')
  }
})