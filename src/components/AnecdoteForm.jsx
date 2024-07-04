import { useContext } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { addAnecdote } from "../services/anecdotes"
import { NotificationContext } from "../NotificationContext"

const AnecdoteForm = () => {
  const { dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({
        type: 'SET_MESSAGE',
        payload: `Anecdote ${newAnecdote.content} added`
      })
      setTimeout(() => dispatch({ type: 'REMOVE_MESSAGE' }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
