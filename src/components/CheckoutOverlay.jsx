import { useState, useEffect, useCallback } from 'react'

const FONT = '"Inter", sans-serif'
const SPRING = 'cubic-bezier(0.32, 0.72, 0, 1)'

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2)
  return digits
}

// --- Payment Step ---
function PaymentStep({ amount, onDonate, onBack }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const handleDonate = useCallback(() => {
    onDonate(email)
  }, [email, onDonate])

  const inputStyle = {
    width: '100%',
    height: 44,
    borderRadius: 8,
    border: '1px solid #E5E7EB',
    padding: '0 12px',
    fontSize: 14,
    fontFamily: FONT,
    color: '#111827',
    boxSizing: 'border-box',
    outline: 'none',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: FONT }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 16px 12px',
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 14,
            color: '#111827',
            cursor: 'pointer',
            padding: 0,
            fontFamily: FONT,
          }}
        >
          ← Back
        </button>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Consumer Reports</span>
      </div>

      {/* Summary row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '0 16px 12px',
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>${amount}</span>
        <span style={{ fontSize: 12, color: '#6B7280' }}>One-time donation</span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: '#F3F4F6', margin: '0 16px' }} />

      {/* Form fields */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding: '16px 16px 0',
          flex: 1,
        }}
      >
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder="Card number"
          value={card}
          onChange={(e) => setCard(formatCardNumber(e.target.value))}
          style={inputStyle}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            style={{ ...inputStyle, flex: 1 }}
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>

        {/* Donate button */}
        <button
          onClick={handleDonate}
          style={{
            width: '100%',
            height: 48,
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            fontFamily: FONT,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#111827',
            color: '#fff',
            marginTop: 2,
          }}
        >
          Donate ${amount}
        </button>

        {/* Trust line */}
        <p
          style={{
            fontSize: 11,
            color: '#9CA3AF',
            textAlign: 'center',
            margin: '4px 0 0',
          }}
        >
          256-bit SSL encrypted · 501(c)(3) nonprofit
        </p>
      </div>
    </div>
  )
}

// --- Processing Step ---
function ProcessingStep({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1400)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontFamily: FONT,
      }}
    >
      {/* CSS spinner */}
      <div
        style={{
          width: 24,
          height: 24,
          border: '2px solid #D1D5DB',
          borderTopColor: '#111827',
          borderRadius: '50%',
          animation: 'checkout-spin 0.7s linear infinite',
        }}
      />
      <p style={{ fontSize: 14, color: '#6B7280', marginTop: 8 }}>Processing…</p>
    </div>
  )
}

// --- Confirmation Step ---
function ConfirmationStep({ amount, email, onBackToArticle }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontFamily: FONT,
        padding: '0 16px',
      }}
    >
      {/* Checkmark circle */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: '#F3F4F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          color: '#111827',
          lineHeight: 1,
        }}
      >
        ✓
      </div>

      <p style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: '16px 0 8px' }}>
        Thank you
      </p>

      <p
        style={{
          fontSize: 14,
          color: '#4B5563',
          maxWidth: 260,
          textAlign: 'center',
          lineHeight: 1.6,
          margin: '0 0 8px',
        }}
      >
        Your ${amount} donation helps CR keep testing and stay independent.
      </p>

      <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 20px' }}>
        A receipt will be sent to {email || 'your email'}
      </p>

      <button
        onClick={onBackToArticle}
        style={{
          height: 44,
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: FONT,
          border: '1px solid #E5E7EB',
          backgroundColor: '#fff',
          color: '#111827',
          cursor: 'pointer',
          padding: '0 24px',
        }}
      >
        Back to article
      </button>
    </div>
  )
}

// --- Main Checkout Overlay ---
export default function CheckoutOverlay({ amount, visible, onClose, onComplete }) {
  const [step, setStep] = useState('payment') // payment | processing | confirmation
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')

  // Trigger entrance animation on mount
  useEffect(() => {
    if (visible) {
      setStep('payment')
      setEmail('')
      // Force a frame before animating in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMounted(true))
      })
    } else {
      setMounted(false)
    }
  }, [visible])

  const handleDonate = useCallback((donorEmail) => {
    setEmail(donorEmail)
    setStep('processing')
  }, [])

  const handleProcessingComplete = useCallback(() => {
    setStep('confirmation')
  }, [])

  const handleBackToArticle = useCallback(() => {
    setMounted(false)
    setTimeout(() => onComplete(), 400)
  }, [onComplete])

  const handleBack = useCallback(() => {
    setMounted(false)
    setTimeout(() => onClose(), 400)
  }, [onClose])

  if (!visible) return null

  return (
    <>
      {/* Spinner keyframes */}
      <style>{`
        @keyframes checkout-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#fff',
          zIndex: 200,
          borderRadius: 44,
          overflow: 'hidden',
          transform: mounted ? 'translateY(0)' : 'translateY(100%)',
          transition: `transform 400ms ${SPRING}`,
        }}
      >
        {step === 'payment' && (
          <PaymentStep amount={amount} onDonate={handleDonate} onBack={handleBack} />
        )}
        {step === 'processing' && (
          <ProcessingStep onComplete={handleProcessingComplete} />
        )}
        {step === 'confirmation' && (
          <ConfirmationStep
            amount={amount}
            email={email}
            onBackToArticle={handleBackToArticle}
          />
        )}
      </div>
    </>
  )
}
