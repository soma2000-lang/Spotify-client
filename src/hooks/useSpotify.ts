import { useEffect, useRef, useState } from 'react'
import {
    AuthorizationCodeWithPKCEStrategy,
    Scopes,
    SdkOptions,
    SpotifyApi,
  } from '@spotify/web-api-ts-sdk'

  export function useSpotify(config?: SdkOptions) {
    const scopes: string[] = [
      ...Scopes.userDetails,
      ...Scopes.playlistRead,
      ...Scopes.userPlaybackRead,
      ...Scopes.userPlayback,
      ...Scopes.userPlaybackModify,
    ]
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID ?? ''
    const redirectUrl = process.env.REACT_APP_SPOTIFY_REDIRECT_URI ?? ''
    const [sdk, setSdk] = useState<SpotifyApi | null>(null)


  useEffect(() => {
    ;(async () => {
      const auth = new AuthorizationCodeWithPKCEStrategy(
        clientId,
        redirectUrl,
        activeScopes,
      )
      const internalSdk = new SpotifyApi(auth, config)

      try {
        const { authenticated } = await internalSdk.authenticate()

        if (authenticated) {
          setSdk(() => internalSdk)
        }
      } catch (e: Error | unknown) {
        const error = e as Error
        if (
          error &&
          error.message &&
          error.message.includes('No verifier found in cache')
        ) {
          console.error(
            "If you are seeing this error in a React Development Environment it's because React calls useEffect twice. Using the Spotify SDK performs a token exchange that is only valid once, so React re-rendering this component will result in a second, failed authentication. This will not impact your production applications (or anything running outside of Strict Mode - which is designed for debugging components).",
            error,
          )
        } else {
          console.error(e)
        }
      }
    })()
  }, [config, activeScopes])

  return sdk
}