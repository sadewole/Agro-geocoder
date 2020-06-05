import React, { useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

const GenerateMap = ({ marketLoaded }) => {
  const mapContainerRef = useRef(null)

  const fetchData = useCallback(() => {
    return marketLoaded.map((mark) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            mark.location.coordinates[0],
            mark.location.coordinates[1]
          ]
        },
        properties: {
          marketName: mark.name,
          icon: 'shop'
        }
      }
    })
  }, [marketLoaded])

  useEffect(() => {
    const results = fetchData()
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 9,
      center: [3.361881, 6.672557]
    })

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
    // load map from stores
    map.on('load', async () => {
      map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: results
        }
      })
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'point',
        layout: {
          'icon-image': '{icon}-15',
          'icon-size': 1.5,
          'text-field': '{marketName}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.9],
          'text-anchor': 'top'
        }
      })
    })

    // clean up on unmount
    return () => map.remove()
  }, [fetchData])

  return (
    <div className='my-5'>
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '500px', borderRadius: '5px' }}
      />
    </div>
  )
};

export default GenerateMap
