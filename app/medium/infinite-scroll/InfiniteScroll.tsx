'use client'
import { useEffect, useState } from 'react'

const InfiniteScroll = () => {
  const [items, setItems] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadMoreItems = async () => {
    if (isLoading) return

    setIsLoading(true)

    // Fake API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    setItems(prevItems => {
      const start = prevItems.length + 1

      const newItems = Array.from(
        { length: 20 },
        (_, index) => start + index
      )

      return [...prevItems, ...newItems]
    })

    setIsLoading(false)
  }

  // Initial load
  useEffect(() => {
    const initialize = async () => {
      await loadMoreItems()
    }

    initialize()
  }, [])

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const isNearBottom =
        scrollTop + windowHeight >= documentHeight - 100

      if (isNearBottom && !isLoading) {
        loadMoreItems()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading])

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '2rem',
      }}
    >
      <h1 style={{marginBottom: '20px'}}>Infinite Scroll</h1>

      {items.map(item => (
        <div
          key={item}
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginBottom: '10px',
          }}
        >
          Item {item}
        </div>
      ))}

      {isLoading && (
        <h3
          style={{
            textAlign: 'center',
            padding: '2rem 0',
          }}
        >
          Loading...
        </h3>
      )}
    </div>
  )
}

export default InfiniteScroll