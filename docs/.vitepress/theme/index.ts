import DefaultTheme from 'vitepress/theme'
import LoginPreview from './LoginPreview.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LoginPreview', LoginPreview)
  },
} satisfies Theme
