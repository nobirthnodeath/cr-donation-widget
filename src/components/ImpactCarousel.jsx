import { useState, useRef, useCallback, useEffect } from 'react'

const CARDS = [
  {
    eyebrow: 'Product Safety',
    headline: 'CR testing triggered a recall of 4.7M infant carriers',
    body: 'Our engineers identified critical strap failures at forces well below federal safety thresholds — before a single injury was reported.',
    stat: '4.7M',
    label: 'products recalled',
    imageLabel: 'Infant carrier test',
  },
  {
    eyebrow: 'Independent Testing',
    headline: 'We found hidden chemicals in 28 \u2018non-toxic\u2019 baby products',
    body: 'Lab analysis funded entirely by members revealed formaldehyde levels regulators consider unsafe for infants, in products marketed as chemical-free.',
    stat: '28',
    label: 'products flagged',
    imageLabel: 'Lab analysis',
  },
  {
    eyebrow: 'Your Support',
    headline: 'No ads. No industry funding. Just the truth.',
    body: 'CR is entirely member and donor supported. Every test we run and every company we hold accountable exists because of people like you.',
    stat: '87',
    label: 'years independent',
    imageLabel: 'CR independence',
  },
]

const SWIPE_H_THRESHOLD = 40
const AUTO_ADVANCE_MS = 4000

export default function ImpactCarousel({ onSupport }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [userHasSwiped, setUserHasSwiped] = useState(false)
  const trackRef = useRef(null)
  const touchStartRef = useRef(null)

  // Auto-advance
  useEffect(() => {
    if (userHasSwiped) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CARDS.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(interval)
  }, [userHasSwiped])

  // Scroll to active card
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.offsetWidth
    track.scrollTo({ left: cardWidth * activeIndex, behavior: 'smooth' })
  }, [activeIndex])

  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartRef.current) return
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y
    touchStartRef.current = null

    // Only count horizontal swipes (ignore vertical)
    if (Math.abs(dx) < SWIPE_H_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return

    setUserHasSwiped(true)
    if (dx < 0 && activeIndex < CARDS.length - 1) {
      setActiveIndex((prev) => prev + 1)
    } else if (dx > 0 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1)
    }
  }, [activeIndex])

  const goToCard = useCallback((index) => {
    setUserHasSwiped(true)
    setActiveIndex(index)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* Carousel track */}
      <div
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          display: 'flex',
          overflow: 'hidden',
          flex: 1,
        }}
      >
        {CARDS.map((card, i) => (
          <div
            key={i}
            style={{
              minWidth: '100%',
              boxSizing: 'border-box',
              padding: '12px 16px 0 16px',
              display: 'flex',
              gap: 14,
            }}
          >
            {/* Placeholder image */}
            <div
              style={{
                width: 72,
                minWidth: 72,
                height: 72,
                borderRadius: 8,
                backgroundColor: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: '#9CA3AF',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  padding: 4,
                }}
              >
                {card.imageLabel}
              </span>
            </div>

            {/* Text content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* Eyebrow */}
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#6B7280',
                  margin: '0 0 4px 0',
                }}
              >
                {card.eyebrow}
              </p>

              {/* Headline */}
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: '#111827',
                  margin: '0 0 4px 0',
                }}
              >
                {card.headline}
              </p>

              {/* Body */}
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: '#4B5563',
                  margin: '0 0 auto 0',
                }}
              >
                {card.body}
              </p>

              {/* Stat block */}
              <div style={{ marginTop: 6 }}>
                <p
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: '#111827',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {card.stat}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: '#9CA3AF',
                    margin: 0,
                  }}
                >
                  {card.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row: dots + CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px 16px 16px',
          flexShrink: 0,
        }}
      >
        {/* Dot indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToCard(i)}
              aria-label={`Go to card ${i + 1}`}
              style={{
                padding: 0,
                border: 'none',
                cursor: 'pointer',
                height: 5,
                borderRadius: 3,
                backgroundColor: i === activeIndex ? '#111827' : '#D1D5DB',
                width: i === activeIndex ? 16 : 5,
                transition: 'width 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={onSupport}
          style={{
            background: '#111827',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            height: 36,
            padding: '0 16px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontFamily: '"Inter", sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          Support CR &rarr;
        </button>
      </div>
    </div>
  )
}
