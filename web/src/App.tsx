import { LetterDropzone } from "./components/LetterDropzone";

export function App() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <p className="brand">Coverage Compass</p>
          <p className="tagline">A private tool for understanding letters from Colorado Medicaid.</p>
        </div>
      </header>

      <main id="main" className="container" tabIndex={-1}>
        <section aria-labelledby="hero-title" className="hero">
          <h1 id="hero-title">Got a letter from Health First Colorado?</h1>
          <p>
            Drop it in below. We will tell you what it says, what to do, and when. Your letter
            never leaves this device.
          </p>
          <p className="privacy-note">
            <strong>No accounts. No tracking. No server.</strong> Everything happens in your
            browser.
          </p>
        </section>

        <section aria-labelledby="dropzone-title">
          <h2 id="dropzone-title" className="visually-hidden">
            Upload your letter
          </h2>
          <LetterDropzone />
        </section>

        <section aria-labelledby="how-title" className="how">
          <h2 id="how-title">How it works</h2>
          <ol>
            <li>Drop in a PDF or photo of your letter.</li>
            <li>We read it on your device. Nothing is uploaded.</li>
            <li>You see a plain-language summary, the deadline, and what to do next.</li>
          </ol>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            Built with the <a href="https://ccdconline.org/">Colorado Cross-Disability Coalition</a>.
            Open source.
          </p>
          <p>
            Need help right now? Call CCDC at <a href="tel:+13038393056">(303) 839-3056</a>.
          </p>
        </div>
      </footer>
    </>
  );
}
