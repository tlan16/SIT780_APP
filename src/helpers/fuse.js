import Fuse from "fuse.js"

export const easyFuse = (text1, text2, options = {}) => {
  const set = [
    {
      'text': text1,
    },
  ]

  const myOptions = {
    keys: ['text'],
    threshold: 0.4,
    ...options,
  }
  const fuse = new Fuse(set, myOptions)
  return fuse.search(text2).length
}