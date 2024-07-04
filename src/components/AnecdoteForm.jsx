import { useContext } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { addAnecdote } from "../services/anecdotes"
import { NotificationContext } from "../NotificationContext"
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const { dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch(setNotification(`Anecdote ${newAnecdote.content} added`))
      setTimeout(() => dispatch(removeNotification()), 5000)
    },
    onError: (error) => {
      if (error.response.request.status === 400) {
        dispatch(setNotification(`Too short anecdote, must have length of 5 or more`))
        setTimeout(() => dispatch(removeNotification()), 5000)
      }
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
