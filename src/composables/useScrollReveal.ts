import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(threshold = 0.1) {
  let observer: IntersectionObserver | null = null

  function observeRevealElements() {
    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => observer?.observe(el))
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -80px 0px',
      }
    )

    // Observe immediately for already-mounted elements
    observeRevealElements()

    // Also watch for dynamically added .reveal elements (e.g. v-for)
    const mutationObserver = new MutationObserver(() => {
      observeRevealElements()
    })
    mutationObserver.observe(document.getElementById('app')!, {
      childList: true,
      subtree: true,
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
