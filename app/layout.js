import './globals.css';

export const metadata = {
  title: 'Clairn',
  description:
    'Clairn automates the answering of vendor security questionnaires.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
