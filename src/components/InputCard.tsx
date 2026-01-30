import React from 'react';
import type { AutoLoanInput } from '../logic/autoLoanCalculations';

interface InputCardProps {
    values: AutoLoanInput;
    onChange: (field: keyof AutoLoanInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange(name as keyof AutoLoanInput, parseFloat(value) || 0);
    };

    const handlePercentToggle = () => {
        onChange('downPaymentPercent', !values.downPaymentPercent);
    };

    return (
        <div className="card">
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>

                {/* Vehicle Price */}
                <div>
                    <label htmlFor="vehiclePrice">Vehicle Price</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                        <input
                            id="vehiclePrice"
                            name="vehiclePrice"
                            type="number"
                            value={values.vehiclePrice || ''}
                            onChange={handleChange}
                            placeholder="0"
                            style={{ paddingLeft: '28px', fontSize: '1.25rem', fontWeight: 600 }}
                        />
                    </div>
                </div>

                {/* Down Payment */}
                <div>
                    <label htmlFor="downPayment">Down Payment</label>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                                {values.downPaymentPercent ? '%' : '$'}
                            </span>
                            <input
                                id="downPayment"
                                name="downPayment"
                                type="number"
                                value={values.downPayment || ''}
                                onChange={handleChange}
                                placeholder="0"
                                style={{ paddingLeft: '28px' }}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handlePercentToggle}
                            style={{
                                padding: 'var(--space-2) var(--space-3)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--color-bg-card)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            {values.downPaymentPercent ? '% → $' : '$ → %'}
                        </button>
                    </div>
                </div>

                {/* Trade-In & Sales Tax Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="tradeInValue">Trade-In Value</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                            <input
                                id="tradeInValue"
                                name="tradeInValue"
                                type="number"
                                value={values.tradeInValue || ''}
                                onChange={handleChange}
                                placeholder="0"
                                style={{ paddingLeft: '28px' }}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="salesTaxRate">Sales Tax (%)</label>
                        <input
                            id="salesTaxRate"
                            name="salesTaxRate"
                            type="number"
                            step="0.1"
                            value={values.salesTaxRate || ''}
                            onChange={handleChange}
                            placeholder="0"
                        />
                    </div>
                </div>

                {/* Interest Rate & Loan Term Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="interestRate">Interest Rate (APR %)</label>
                        <input
                            id="interestRate"
                            name="interestRate"
                            type="number"
                            step="0.1"
                            value={values.interestRate || ''}
                            onChange={handleChange}
                            placeholder="6.5"
                        />
                    </div>
                    <div>
                        <label htmlFor="loanTermMonths">Loan Term</label>
                        <select
                            id="loanTermMonths"
                            name="loanTermMonths"
                            value={values.loanTermMonths}
                            onChange={handleChange}
                        >
                            <option value="24">24 Months</option>
                            <option value="36">36 Months</option>
                            <option value="48">48 Months</option>
                            <option value="60">60 Months</option>
                            <option value="72">72 Months</option>
                            <option value="84">84 Months</option>
                        </select>
                    </div>
                </div>

                {/* Calculate Button */}
                <button className="btn-primary" type="button">
                    Calculate
                </button>

            </div>
        </div>
    );
};
