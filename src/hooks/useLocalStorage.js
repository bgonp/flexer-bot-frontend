import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.error(error)
    }
  })

  const saveValue = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    } catch (error) {
      console.error(error)
    }
  }

  return [value, saveValue]
}
