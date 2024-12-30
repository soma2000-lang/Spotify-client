
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSpotify } from '../hooks/useSpotify'
import { Playlist, PlaylistedTrack } from '@spotify/web-api-ts-sdk'
import Loading from '../components/Loading'
import { PlayArrow } from '@mui/icons-material'


function Palylist(){
    const sdk = useSpotify()
    const { playlistId } = useParams()
    const [playlist, setPlaylist] = useState({} as Playlist)
    const [loading, setLoading] = useState(true)
    const [tracks, setTracks] = useState([] as PlaylistedTrack[])
    const [pageOffset, setPageOffset] = useState(0)
    const [page, setPage] = useState(0)
    const [fetchingMoreTracks, setFetchingMoreTracks] = useState(false)
    const observerTarget = useRef(null)
}   


useEffect(() => {
    if (sdk && playlistId && !fetchingMoreTracks) {
      fetchTracks()
    }
  }, [page])

  const playCurrentPlaylist = async () => {
    if (sdk && playlist) {
      const state = await sdk.player.getPlaybackState()
      if (state.device.id) {
        sdk.player.startResumePlayback(state.device.id, playlist.uri)
      }
    }
  }

  async function fetchTracks() {
    if (sdk && playlistId && !fetchingMoreTracks) {
      setFetchingMoreTracks(true)
      const data = await sdk.playlists.getPlaylistItems(
        playlistId,
        undefined,
        undefined,
        50,
        pageOffset,
      )
      setPageOffset((prevPageOffset) => prevPageOffset + data.items.length)
      setTracks((prevTracks) => [...prevTracks, ...data.items])
      setFetchingMoreTracks(false)
    }
  }

  useEffect(() => {
    if (playlistId && sdk) {
      sdk?.playlists
        .getPlaylist(playlistId)
        .then((data) => {
          document.title = data.name
          setPlaylist(data)
          setPageOffset(data.tracks.limit)
          setTracks(data.tracks.items)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [sdk])

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 1 },
    )
    useEffect(() => {
        const observer = new IntersectionObserver(
          async (entries) => {
            if (entries[0].isIntersecting) {
              setPage((prevPage) => prevPage + 1)
            }
          },
          { threshold: 1 },
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
          }
          
          return () => {
            if (observerTarget.current) {
              observer.unobserve(observerTarget.current)
            }
          }
        }, [playlist])
        if (loading) {
            return <Loading />
          }
        
          if (!playlist) {
            return <div>Playlist not found</div>
          }

          if (loading) {
            return <Loading />
          }
        
          if (!playlist) {
            return <div>Playlist not found</div>
          }



function TrackDetails(tracks: PlaylistedTrack[]) {
    return (
      <table>
        <thead className='border-b-2 border-b-gray-200'>
          <tr>
            <th className='pb-2 text-left text-xs'>#</th>
            <th className='pb-2 text-left text-xs'>Title</th>
            <th className='pb-2 text-left text-xs'>Album</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-2' colSpan={3}></td>
          </tr>
          {tracks.map((track, index) => TrackRow(track, index))}
        </tbody>
      </table>
    )
  }

  function TrackRow(track: PlaylistedTrack, index: number) {
    if (track.track === null) {
      return <div key={index}></div>
    }
    if ('album' in track.track) {
      const album = track.track.album
      const artists = track.track.artists
  
      return (
        <tr key={index}>
          <td className='p-2 align-middle'>
            <p className='text-xs font-medium'>{index + 1}</p>
          </td>
          <td className='py-2 pr-2 align-middle'>
            <div className='flex flex-row gap-4'>
              {album.images.length > 0 && (
                <img
                  src={album.images[0].url}
                  height={64}
                  width={64}
                  className='rounded-sm'
                  loading='lazy'
                />
              )}
              <div className='flex flex-col justify-center gap-1'>
                <p className='text-xs font-medium'>{track.track.name}</p>
                <p className='text-xs'>
                  {artists.map((obj) => obj.name).join(', ')}
                </p>
              </div>
            </div>
          </td>
          <td className='py-2 align-middle'>
            <p className='text-sm'>{album.name}</p>
          </td>
        </tr>
      )
    }
    return <div key={index}></div>
  }

  export default PlaylistDetails  