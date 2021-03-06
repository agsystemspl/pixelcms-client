const config = {
  langs: [
    { code: 'en', name: 'English' }
  ],
  pageTransitionScrollProps: {
    duration: 0,
    delay: 0
  },
  scrollProps: {
    duration: 250,
    delay: 10,
    offset: -25,
    smooth: true
  },
  lightboxConfig: {
    download: false,
    speed: 250,
    hideBarsDelay: 2000
  },
  gaTrackingId: null,
  socialAuth: []
}

const dynamicPageComponents = {}

export { config, dynamicPageComponents }
