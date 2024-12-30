import React, { useEffect, useState } from 'react'
import { useSpotify } from './hooks/useSpotify'
import { User } from '@spotify/web-api-ts-sdk'

function App() {
  const sdk = useSpotify()
  const [user, setUser] = useState({} as User)

  useEffect(() => {
    ;(async () => {
      const data = await sdk?.currentUser.profile()
      if (data) {
        setUser(data)
      }
    })()
  }, [sdk])

  return !sdk || !user.id ? (
    <></>
  ) : (
    <div className='flex flex-1 flex-col items-center justify-center gap-4'>
      <div className='flex items-center justify-center'>
        {user.images.length > 0 && (
          <img
            src={user.images[0].url}
            width={user.images[0].width}
            height={user.images[0].height}
            className='rounded-full'
            loading='lazy'
          ></img>
        )}
      </div>
      <p className='text-3xl font-bold'>{user.display_name}</p>
    </div>
  )
}

export default App