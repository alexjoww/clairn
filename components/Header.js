import Link from 'next/link';

export default function Header({ action }) {
  return (
    <header className="header">
      <Link href="/" className="wordmark">
        Clairn
      </Link>
      {action}
    </header>
  );
}
