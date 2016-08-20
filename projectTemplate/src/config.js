const config = {
  apiRoot: 'https://localhost/api/',
  langs: [
    {code: 'en', name: 'English'}
  ],
  loadingConfig: {
    width: '150px',
    height: '1px',
    lineColor: '#ff7302',
    breakColor: '#fff',
    breakWidth: '6px'
  },
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
  gaTrackingId: null
}

const pageComponentsRegistry = {}

export { config, pageComponentsRegistry }
