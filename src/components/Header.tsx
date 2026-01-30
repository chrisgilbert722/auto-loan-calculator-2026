import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
            <h1 style={{ marginBottom: 'var(--space-2)' }}>Auto Loan Calculator (2026)</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
                Estimate your monthly car payment in seconds
            </p>
        </header>
    );
};
