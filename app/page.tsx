import Logo from "./components/Logo";
import SignupForm from "./components/SignupForm";

export default function Home() {
  return (
    <main className="landing">
      <section className="landing-card">
        <Logo />

        <p className="eyebrow anim" style={{ "--i": 0 } as React.CSSProperties}>
          Free printable coloring pages
        </p>

        <h1 className="wordmark anim" style={{ "--i": 1 } as React.CSSProperties}>
          Color a world
          <span className="second">reclaimed by nature</span>
        </h1>

        <p className="lede anim" style={{ "--i": 2 } as React.CSSProperties}>
          Join the list and I&apos;ll send you a free set of printable pages from
          the series.
        </p>

        <div className="anim signup-wrap" style={{ "--i": 3 } as React.CSSProperties}>
          <SignupForm />
        </div>

        <div className="landing-foot anim" style={{ "--i": 4 } as React.CSSProperties}>
          <span className="footer">Monochrome Worlds</span>
        </div>
      </section>
    </main>
  );
}
