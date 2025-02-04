import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const addAnecdote = async (anecdoteObj) => {
  const response = await axios.post(baseUrl, anecdoteObj)
  return response.data
}

export const voteAnecdote = async (anecdoteObj) => {
  const response = await axios.put(`${baseUrl}/${anecdoteObj.id}`, anecdoteObj)
  return response.data
}