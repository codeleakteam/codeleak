export default function trackPageView(url) {
  try {
    if (window.gtag) {
      window.gtag('config', 'UA-138467146-1', {
        page_location: url,
      })
    }
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
    // console.log('gtaf failed to load', error)
  }
}
