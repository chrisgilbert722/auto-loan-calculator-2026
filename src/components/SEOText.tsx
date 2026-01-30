import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            <p>
                This auto loan calculator estimates your monthly car payment based on vehicle price, down payment,
                trade-in value, interest rate, and loan term. It also factors in sales tax and dealer fees to
                provide a total cost overview. Results are estimates only and actual payments may vary based on
                lender terms, credit score, and final purchase price. This tool is for informational purposes
                and not financial advice.
            </p>
        </div>
    );
};
