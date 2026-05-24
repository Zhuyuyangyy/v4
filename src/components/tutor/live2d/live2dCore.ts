declare global {
  interface Window {
    Live2DCubismCore?: unknown
  }
}

let cubismCoreLoadPromise: Promise<void> | null = null

/**
 * Ensures the Cubism Core runtime is available before the Live2D renderer boots.
 *
 * Use when:
 * - Initializing the floating companion's Live2D adapter
 * - Retrying model startup after a renderer remount
 *
 * Expects:
 * - `src` points to a reachable `live2dcubismcore.min.js` asset
 * - The asset populates `window.Live2DCubismCore`
 *
 * Returns:
 * - Resolves once Cubism Core is loaded and ready for `pixi-live2d-display`
 */
export function ensureCubismCore(src: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Cubism Core can only load in the browser.'))
  }

  if (window.Live2DCubismCore) {
    return Promise.resolve()
  }

  if (cubismCoreLoadPromise) {
    return cubismCoreLoadPromise
  }

  cubismCoreLoadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-live2d-cubism-core="true"]')

    if (existing) {
      existing.addEventListener('load', handleLoad, { once: true })
      existing.addEventListener('error', handleError, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.dataset.live2dCubismCore = 'true'
    script.addEventListener('load', handleLoad, { once: true })
    script.addEventListener('error', handleError, { once: true })
    document.head.appendChild(script)

    function handleLoad() {
      if (window.Live2DCubismCore) {
        resolve()
        return
      }

      cubismCoreLoadPromise = null
      reject(new Error('Cubism Core script loaded but did not expose Live2DCubismCore.'))
    }

    function handleError() {
      cubismCoreLoadPromise = null
      reject(new Error(`Failed to load Cubism Core from "${src}".`))
    }
  })

  return cubismCoreLoadPromise
}

export function hasCubismCore() {
  return typeof window !== 'undefined' && !!window.Live2DCubismCore
}
