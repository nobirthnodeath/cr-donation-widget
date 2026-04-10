import { useState, useCallback } from 'react'

const PRESETS = [10, 25, 50, 100]
const FONT = '"Inter", sans-serif'

export default function DonationForm({ onContinue }) {
  const [selectedPreset, setSelectedPreset] = useState(25)
  const [customValue, setCustomValue] = useState('')

  const activeAmount = customValue ? parseInt(customValue, 10) || 0 : selectedPreset
  const isValid = activeAmount > 0

  const handlePresetClick = useCallback((amount) => {
    setSelectedPreset(amount)
    setCustomValue('')
  }, [])

  const handleCustomChange = useCallback((e) => {
    const val = e.target.value.replace(/\D/g, '')
    setCustomValue(val)
    if (val) setSelectedPreset(null)
  }, [])

  const handleContinue = useCallback(() => {
    if (isValid) onContinue(activeAmount)
  }, [isValid, activeAmount, onContinue])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '16px 16px 0 16px',
        fontFamily: FONT,
      }}
    >
      {/* Label block */}
      <p style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: 0 }}>
        Make a donation
      </p>
      <p style={{ fontSize: 13, fontWeight: 400, color: '#6B7280', margin: '4px 0 0 0' }}>
        No ads, no industry funding. Your support makes this possible.
      </p>

      {/* Amount grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          marginTop: 12,
        }}
      >
        {PRESETS.map((amount) => {
          const isSelected = selectedPreset === amount && !customValue
          return (
            <button
              key={amount}
              onClick={() => handlePresetClick(amount)}
              style={{
                height: 44,
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                fontFamily: FONT,
                cursor: 'pointer',
                border: `1px solid ${isSelected ? '#111827' : '#E5E7EB'}`,
                backgroundColor: isSelected ? '#111827' : '#fff',
                color: isSelected ? '#fff' : '#111827',
                transition: 'background-color 150ms ease, color 150ms ease',
              }}
            >
              ${amount}
            </button>
          )
        })}
      </div>

      {/* Custom amount input */}
      <div
        style={{
          position: 'relative',
          marginTop: 10,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 15,
            color: customValue ? '#111827' : '#9CA3AF',
            pointerEvents: 'none',
            fontFamily: FONT,
          }}
        >
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Other amount"
          value={customValue}
          onChange={handleCustomChange}
          style={{
            width: '100%',
            height: 44,
            borderRadius: 8,
            border: '1px solid #E5E7EB',
            paddingLeft: 24,
            paddingRight: 12,
            fontSize: 15,
            fontFamily: FONT,
            color: '#111827',
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />
      </div>

      {/* CTA button */}
      <button
        onClick={handleContinue}
        disabled={!isValid}
        style={{
          width: '100%',
          height: 48,
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          fontFamily: FONT,
          border: 'none',
          cursor: isValid ? 'pointer' : 'default',
          backgroundColor: isValid ? '#111827' : '#D1D5DB',
          color: '#fff',
          marginTop: 12,
        }}
      >
        {isValid ? `Continue with $${activeAmount} →` : 'Select an amount'}
      </button>

      {/* Trust line */}
      <p
        style={{
          fontSize: 11,
          color: '#9CA3AF',
          textAlign: 'center',
          marginTop: 8,
          marginBottom: 0,
        }}
      >
        🔒  Secure · Tax-deductible · Cancel anytime
      </p>
    </div>
  )
}
