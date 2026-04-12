import { useState, useRef, useEffect } from "react";

export default function DonationWidget() {
  const [widgetState, setWidgetState] = useState("collapsed"); // collapsed | expanded | payment
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // card | apple | paypal
  const [cardName, setCardName] = useState("");
  const [cardEmail, setCardEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const expandableRef = useRef(null);
  const [expandableHeight, setExpandableHeight] = useState(0);

  useEffect(() => {
    if (expandableRef.current) {
      setExpandableHeight(expandableRef.current.scrollHeight);
    }
  });

  const isExpanded = widgetState === "expanded" || widgetState === "payment";

  const displayAmount = showCustomInput && customAmount !== "" ? customAmount : selectedAmount;

  const font = '"Inter", sans-serif';

  const handleDonateClick = () => {
    setWidgetState("expanded");
    setSelectedAmount(5);
    setShowCustomInput(false);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setShowCustomInput(false);
  };

  const handleOtherClick = () => {
    setShowCustomInput(true);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(val);
  };

  const handlePaymentMethodClick = (method) => {
    setPaymentMethod(method);
    setWidgetState("payment");
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(raw);
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCardExpiry(raw);
  };

  const handleCvcChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCardCvc(val);
  };

  const inputStyle = {
    height: 44,
    borderRadius: 8,
    border: "1px solid #E5E7EB",
    padding: "0 12px",
    fontSize: 14,
    fontFamily: font,
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div style={{ fontFamily: font, maxWidth: "100%" }}>
      {/* Placeholder image */}
      <div
        style={{
          width: "100%",
          height: 180,
          background: "#F3F4F6",
          borderRadius: "12px 12px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontSize: 12, color: "#9CA3AF", fontFamily: font }}>
          CR Impact Image
        </span>
      </div>

      {/* Content area */}
      <div
        style={{
          padding: "16px",
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderTop: "none",
          borderRadius: "0 0 12px 12px",
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#111827",
            fontFamily: font,
          }}
        >
          Support independent testing
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: "#4B5563",
            lineHeight: 1.6,
            marginTop: 6,
            fontFamily: font,
          }}
        >
          Consumer Reports is funded by people like you. Your $5 helps us test
          more products and hold companies accountable.
        </div>

        {/* Collapsed: Donate $5 button */}
        {widgetState === "collapsed" && (
          <button
            onClick={handleDonateClick}
            style={{
              width: "100%",
              height: 48,
              background: "#111827",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: font,
              borderRadius: 10,
              border: "none",
              marginTop: 16,
              cursor: "pointer",
            }}
          >
            Donate $5
          </button>
        )}

        {/* Expandable section */}
        <div
          style={{
            maxHeight: isExpanded ? expandableHeight || 900 : 0,
            overflow: "hidden",
            transition: "max-height 350ms cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          <div ref={expandableRef}>
            {/* Amount grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 8,
                marginTop: 16,
              }}
            >
              {[5, 10, 15].map((amount) => {
                const isSelected = !showCustomInput && selectedAmount === amount;
                return (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    style={{
                      height: 48,
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: font,
                      background: isSelected ? "#111827" : "#fff",
                      color: isSelected ? "#fff" : "#111827",
                      border: isSelected
                        ? "1px solid #111827"
                        : "1px solid #E5E7EB",
                      cursor: "pointer",
                      transition:
                        "background-color 150ms ease, color 150ms ease",
                    }}
                  >
                    ${amount}
                  </button>
                );
              })}
              <button
                onClick={handleOtherClick}
                style={{
                  height: 48,
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: font,
                  background: showCustomInput ? "#111827" : "#fff",
                  color: showCustomInput ? "#fff" : "#111827",
                  border: showCustomInput
                    ? "1px solid #111827"
                    : "1px solid #E5E7EB",
                  cursor: "pointer",
                  transition: "background-color 150ms ease, color 150ms ease",
                }}
              >
                Other
              </button>
            </div>

            {/* Custom amount input */}
            {showCustomInput && (
              <input
                type="text"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                style={{
                  ...inputStyle,
                  marginTop: 8,
                }}
              />
            )}

            {/* Payment method selector */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 12,
              }}
            >
              {[
                { key: "card", icon: "\uD83D\uDCB3", label: "Credit Card" },
                { key: "apple", icon: "\uF8FF", label: "Apple Pay" },
                { key: "paypal", icon: "PP", label: "PayPal" },
              ].map((method) => {
                const isSelected = paymentMethod === method.key;
                return (
                  <button
                    key={method.key}
                    onClick={() => handlePaymentMethodClick(method.key)}
                    style={{
                      height: 52,
                      width: "100%",
                      borderRadius: 10,
                      border: isSelected
                        ? "1px solid #111827"
                        : "1px solid #E5E7EB",
                      background: isSelected ? "#FAFAFA" : "#fff",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "0 16px",
                      cursor: "pointer",
                      fontFamily: font,
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        fontSize: method.key === "paypal" ? 13 : 15,
                        fontWeight: method.key === "paypal" ? 700 : 400,
                      }}
                    >
                      {method.icon}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#111827",
                      }}
                    >
                      {method.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Trust line */}
            <div
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "#9CA3AF",
                marginTop: 12,
                fontFamily: font,
              }}
            >
              {"\uD83D\uDD12"} Secure {"\u00B7"} Tax-deductible
            </div>

            {/* Payment forms */}
            {widgetState === "payment" && paymentMethod === "card" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <input
                  type="text"
                  placeholder="Full name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={cardEmail}
                  onChange={(e) => setCardEmail(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Card number"
                  value={formatCardNumber(cardNumber)}
                  onChange={handleCardNumberChange}
                  inputMode="numeric"
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formatExpiry(cardExpiry)}
                  onChange={handleExpiryChange}
                  inputMode="numeric"
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardCvc}
                  onChange={handleCvcChange}
                  inputMode="numeric"
                  style={inputStyle}
                />
                <button
                  style={{
                    width: "100%",
                    height: 48,
                    background: "#111827",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: font,
                    borderRadius: 10,
                    border: "none",
                    marginTop: 12,
                    cursor: "pointer",
                  }}
                >
                  Donate ${displayAmount}
                </button>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    color: "#9CA3AF",
                    fontFamily: font,
                  }}
                >
                  256-bit SSL encrypted {"\u00B7"} 501(c)(3) nonprofit
                </div>
              </div>
            )}

            {widgetState === "payment" && paymentMethod === "apple" && (
              <button
                style={{
                  width: "100%",
                  height: 52,
                  background: "#000",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: font,
                  borderRadius: 10,
                  border: "none",
                  marginTop: 12,
                  cursor: "pointer",
                }}
              >
                Pay with Apple Pay
              </button>
            )}

            {widgetState === "payment" && paymentMethod === "paypal" && (
              <button
                style={{
                  width: "100%",
                  height: 52,
                  background: "#0070BA",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: font,
                  borderRadius: 10,
                  border: "none",
                  marginTop: 12,
                  cursor: "pointer",
                }}
              >
                Continue with PayPal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
