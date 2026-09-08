'use client';

import { useEffect, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';

const PANEL_ID = 'dashboard-nav';

export default function DashboardPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <RequireAuth>
      <button
        type="button"
        className="dashboardToggle"
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="dashboardToggleBar" />
        <span className="dashboardToggleBar" />
        <span className="dashboardToggleBar" />
      </button>

      <button
        type="button"
        className={`dashboardBackdrop${open ? ' dashboardBackdropOpen' : ''}`}
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />

      <aside
        id={PANEL_ID}
        className={`dashboardPanel${open ? ' dashboardPanelOpen' : ''}`}
        inert={!open}
      >
        <nav className="dashboardNav">
          <button type="button" className="dashboardNavItem" onClick={() => {}}>
            Documents
          </button>
        </nav>
      </aside>

      <main className="dashboardMain" />
    </RequireAuth>
  );
}
