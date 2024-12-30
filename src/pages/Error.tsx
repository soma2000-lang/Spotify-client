import React, { useEffect } from 'react'

function ErrorPage() {
  useEffect(() => {
    document.title = 'Error | Spotify Client'
  }, [])

  return (
    <div>
      <p>Error</p>
    </div>
  )
}

export default ErrorPage