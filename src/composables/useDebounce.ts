import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useDebounce(inputRef: Ref<string>, delay = 400) {
  let timerId: number | null = null
  const debouncedValue = ref(inputRef.value)

  watch(inputRef, (newValue) => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  return debouncedValue
}
