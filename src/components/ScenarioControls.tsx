import React, { useState } from 'react';
import type { AutoLoanInput } from '../logic/autoLoanCalculations';

interface ScenarioControlsProps {
    values: AutoLoanInput;
    onChange: (field: keyof AutoLoanInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const [showFees, setShowFees] = useState(values.fees > 0);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setShowFees(checked);
        if (!checked) {
            onChange('fees', 0);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange(name as keyof AutoLoanInput, parseFloat(value) || 0);
    };

    return (
        <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-4)' }}>Additional Fees</h3>

            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>

                {/* Toggle */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', marginBottom: 0 }}>
                    <input
                        type="checkbox"
                        checked={showFees}
                        onChange={handleToggle}
                        style={{ width: 'auto' }}
                    />
                    Include title, registration & doc fees
                </label>

                {/* Conditional Input */}
                {showFees && (
                    <div style={{ marginTop: 'var(--space-2)' }}>
                        <label htmlFor="fees">Total Fees</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                            <input
                                id="fees"
                                name="fees"
                                type="number"
                                value={values.fees || ''}
                                onChange={handleChange}
                                placeholder="0"
                                style={{ paddingLeft: '28px' }}
                            />
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            Title, registration, dealer doc fees
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
