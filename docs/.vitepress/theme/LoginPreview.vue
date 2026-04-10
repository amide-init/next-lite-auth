<template>
  <div class="preview-wrapper">
    <div class="preview-scene">
      <div class="preview-card-wrap">

        <div class="preview-header">
          <p v-if="appName" class="preview-appname">{{ appName }}</p>
          <h2 class="preview-title">{{ title }}</h2>
          <p class="preview-desc">{{ description }}</p>
        </div>

        <div class="preview-card">
          <div v-if="errorMsg" class="preview-error">{{ errorMsg }}</div>

          <form @submit.prevent="handleSubmit" class="preview-form">
            <div class="preview-field">
              <label class="preview-label">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="you@example.com"
                class="preview-input"
              />
            </div>

            <div class="preview-field">
              <label class="preview-label">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="preview-input"
              />
            </div>

            <button type="submit" :disabled="loading" class="preview-btn">
              {{ loading ? 'Signing in…' : 'Sign in' }}
            </button>
          </form>
        </div>

        <p class="preview-powered">
          Powered by
          <a href="https://github.com/amide-init/next-lite-auth" target="_blank" rel="noopener noreferrer">
            next-lite-auth
          </a>
        </p>

      </div>
    </div>
    <p class="preview-note">↑ Interactive preview — try submitting with wrong credentials</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  appName?: string
  title?: string
  description?: string
}>(), {
  title: 'Sign in',
  description: 'Enter your credentials to continue',
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  errorMsg.value = ''
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  loading.value = false
  errorMsg.value = 'Invalid credentials'
}
</script>

<style scoped>
.preview-wrapper {
  margin: 24px 0;
}

.preview-scene {
  background: #09090b;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 48px 24px;
  display: flex;
  justify-content: center;
}

.preview-card-wrap {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preview-header {
  text-align: center;
}

.preview-appname {
  font-size: 0.75rem;
  font-weight: 600;
  color: #818cf8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 8px;
}

.preview-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #fafafa;
  margin: 0 0 4px;
  border: none;
  padding: 0;
}

.preview-desc {
  font-size: 0.875rem;
  color: #a1a1aa;
  margin: 0;
}

.preview-card {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-error {
  background: rgba(239, 68, 68, 0.1);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.875rem;
  color: #f87171;
}

.preview-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.preview-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #fafafa;
}

.preview-input {
  height: 36px;
  border-radius: 6px;
  border: 1px solid #3f3f46;
  background: transparent;
  color: #fafafa;
  padding: 0 12px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;
}

.preview-input::placeholder {
  color: #71717a;
}

.preview-input:focus {
  border-color: #a1a1aa;
}

.preview-btn {
  height: 36px;
  border-radius: 6px;
  background: #fafafa;
  color: #09090b;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
  width: 100%;
}

.preview-btn:hover {
  opacity: 0.9;
}

.preview-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.preview-powered {
  text-align: center;
  font-size: 0.75rem;
  color: #52525b;
  margin: 0;
}

.preview-powered a {
  color: #71717a;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.preview-powered a:hover {
  color: #a1a1aa;
}

.preview-note {
  text-align: center;
  font-size: 0.75rem;
  color: #52525b;
  margin: 8px 0 0;
}
</style>
