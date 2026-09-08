import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="page">
      <Header
        action={
          <div className="headerActions">
            <Link href="/signin" className="headerLink">
              Sign in
            </Link>
            <Link href="/signup" className="button">
              Sign up
            </Link>
          </div>
        }
      />
      <main className="main">
        <div className="hero">
          <h1>Clairn</h1>
          <p>
            Clairn automates the answering of vendor security questionnaires.
            Upload your existing security documentation — completed
            questionnaires, SOC 2 reports, penetration test results,
            architecture docs — and Clairn builds a knowledge base from them.
            Then upload a new questionnaire and get it back with answers drafted
            and cited, with anything uncertain flagged for human review.
          </p>
        </div>
      </main>
    </div>
  );
}
