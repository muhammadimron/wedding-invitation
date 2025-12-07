import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// AOS Directive
app.directive('aos', {
  mounted(el) {
    el.classList.add('aos-init')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('aos-animate')
        }
      })
    }, { threshold: 0.1 }) // Elemen muncul saat 10% bagian terlihat
    observer.observe(el)
  }
})

app.mount('#app')