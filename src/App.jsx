import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './services/anecdotes'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { NotificationContext } from './NotificationContext'
import { removeNotification, setNotification } from './reducers/notificationReducer'


const App = () => {
  const { dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: votedAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      ))
      dispatch(setNotification(`Anecdote ${votedAnecdote.content} voted`))
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  const anecdotes = query.data

  if (query.isPending) {
    return <p>Loading...</p>
  }

  if (query.isError) {
    return <p>anecdote service not available due to problems in server</p>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
