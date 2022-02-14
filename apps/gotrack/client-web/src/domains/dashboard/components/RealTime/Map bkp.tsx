import { useEffect } from 'react'

import * as common from '@comigo/ui-common'
import { useLocalization, useMap } from '&track/domains/monitoring'

export function Map() {
  const { localizationsRefetch } = useLocalization()
  const { initMap, setShowInfoWindowsInMap } = useMap()

  useEffect(() => {
    const zoom = 3
    initMap({ zoom })
    setShowInfoWindowsInMap(false)
    localizationsRefetch()
    setInterval(async () => {
      localizationsRefetch()
    }, 30000)
  }, [])

  return (
    <common.Card compact className="col-span-5  flex flex-1 mt-3 h-48">
      <div className="w-full h-full" id="googleMaps" />
    </common.Card>
  )
}
