import './App.css'

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#F2F2F7' }}
    >
      {/* Phone frame */}
      <div
        className="relative bg-white overflow-hidden"
        style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          boxShadow:
            '0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Browser chrome bar */}
        <div
          className="flex items-center justify-center px-4"
          style={{ height: 52, borderBottom: '1px solid #E5E5E5' }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              height: 32,
              borderRadius: 10,
              width: 280,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.01em',
              backgroundColor: '#F2F2F7',
              color: '#8E8E93',
            }}
          >
            consumerreports.org
          </div>
        </div>

        {/* Scrollable article content */}
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 52px)' }}>
          <article className="px-6 pt-6 pb-12" style={{ fontFamily: '"Inter", sans-serif' }}>
            {/* Category label */}
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 12,
                color: '#6B6B6B',
              }}
            >
              Safety &amp; Recalls
            </p>

            {/* Headline */}
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 14px 0',
                color: '#000',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              What You Need to Know Before Buying a Stroller in 2026
            </h1>

            {/* Byline */}
            <p
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: '#999',
                marginBottom: 24,
              }}
            >
              By Rachel Montoya &middot; April 8, 2026 &middot; 6 min read
            </p>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: '#E5E5E5', marginBottom: 24 }} />

            {/* Body */}
            <div
              style={{
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.7,
                color: '#1A1A1A',
              }}
            >
              <p style={{ marginBottom: 20 }}>
                Choosing a stroller is one of the most consequential gear decisions
                new parents face, and yet the landscape of options has never been
                more overwhelming. Between lightweight umbrella strollers, modular
                travel systems, and rugged jogging models, the category now spans
                more than 200 models from dozens of manufacturers. At Consumer
                Reports, we&rsquo;ve tested strollers for over 30 years, and our
                engineers say the safety gap between the best and worst models is
                wider than ever.
              </p>

              <p style={{ marginBottom: 20 }}>
                Federal safety standards for strollers, governed by ASTM F833, were
                last updated in 2021. Those rules require restraint systems, parking
                brakes, and specific structural tests. But they don&rsquo;t address
                several real-world hazards our testers flag regularly: fingertip
                entrapment points in folding mechanisms, canopies that detach under
                UV degradation, and frames that torque unpredictably on uneven
                sidewalks. In our labs, we simulate three years of daily use in
                under 72 hours, and the failure modes can be striking.
              </p>

              {/* Mid-article heading */}
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  margin: '28px 0 16px 0',
                  lineHeight: 1.3,
                  color: '#000',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Weight, Fold, and the Compromise No One Talks About
              </h2>

              <p style={{ marginBottom: 20 }}>
                The stroller industry&rsquo;s biggest selling point right now is
                compactness. Brands compete to offer the smallest fold and the
                lightest frame, and parents understandably want a stroller that
                won&rsquo;t dominate their trunk. But in our testing, ultralight
                strollers&mdash;those under 15 pounds&mdash;consistently scored
                lower on stability. Three of the five lightest models we evaluated
                tipped during our incline test at angles that a moderately steep
                driveway could produce. The tradeoff between portability and safety
                is real, and it&rsquo;s rarely discussed in marketing materials.
              </p>

              <p style={{ marginBottom: 20 }}>
                Harness design is another area where we see meaningful variation.
                Five-point harnesses remain the gold standard, but the ease of
                buckling matters just as much as the configuration. If a harness is
                difficult for a caregiver to fasten with one hand, our research
                shows it&rsquo;s more likely to be left unbuckled during short
                trips&mdash;precisely the situations where a secure restraint
                matters most. We now score buckling ease as a standalone metric in
                our ratings, and it has changed several models&rsquo; overall
                rankings.
              </p>

              <p>
                Our advice: resist the urge to optimize for a single feature. The
                safest stroller is one that fits your actual routine&mdash;your
                sidewalks, your trunk, your child&rsquo;s size&mdash;and that
                you&rsquo;ll use correctly every time. Check our full ratings before
                you buy, and look for models that score well across stability,
                restraint quality, and durability rather than excelling in just one
                dimension.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default App
