class DarkModeToggle {
  constructor(toggleCheckbox) {
    this.darkCSS = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*="dark"]')
    this.lightCSS = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*="light"]')
    this.mode = 'light'

    let supportedBrowser = window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all';
    if (supportedBrowser) {
      this.mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    let rememberedMode = localStorage.getItem('darkModeToggle') 
    if (['dark', 'light'].includes(rememberedMode)) {
      this.mode = rememberedMode
    }

    this.toggleCheckbox = toggleCheckbox
    this._installCheckboxEventListener()
    this._updateMode()
  }

  toggle() {
    this.mode = this.mode === 'dark' ? 'light' : 'dark'
    // set transition
    document.body.style.transition = 'background-color 0.4s';
    this._updateMode()
  }

  _updateMode() {
    if (this.mode === 'dark') {
      this.darkCSS.forEach(css => css.disabled = false)
      this.lightCSS.forEach(css => css.disabled = true)
    } else {
      this.darkCSS.forEach(css => css.disabled = true)
      this.lightCSS.forEach(css => css.disabled = false)
    }
    localStorage.setItem('darkModeToggle', this.mode)
    this.toggleCheckbox.checked = this.mode === 'dark'

  }

  _installCheckboxEventListener() {
    this.toggleCheckbox.addEventListener('change', () => {
      this.toggle()
    })
  }
}
