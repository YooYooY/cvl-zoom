import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/', '/upcoming', '/previous', '/recordings', '/personal-room', '/meeting(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
