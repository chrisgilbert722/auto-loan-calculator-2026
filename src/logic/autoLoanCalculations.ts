export interface AutoLoanInput {
    vehiclePrice: number;
    downPayment: number;
    downPaymentPercent: boolean;
    tradeInValue: number;
    salesTaxRate: number; // Percentage
    interestRate: number; // APR percentage
    loanTermMonths: 24 | 36 | 48 | 60 | 72 | 84;
    fees: number; // Title, registration, doc fees
}

export interface AutoLoanResult {
    monthlyPayment: number;
    totalLoanAmount: number;
    totalInterest: number;
    totalVehicleCost: number;
    salesTaxAmount: number;
    amountFinanced: number;
}

export function calculateAutoLoan(input: AutoLoanInput): AutoLoanResult {
    // 1. Calculate down payment amount
    let downPaymentAmount: number;
    if (input.downPaymentPercent) {
        downPaymentAmount = (input.downPayment / 100) * input.vehiclePrice;
    } else {
        downPaymentAmount = input.downPayment;
    }

    // 2. Calculate sales tax (on vehicle price minus trade-in in most states)
    const taxableAmount = Math.max(0, input.vehiclePrice - input.tradeInValue);
    const salesTaxAmount = taxableAmount * (input.salesTaxRate / 100);

    // 3. Calculate amount to finance
    // Amount financed = Vehicle Price + Sales Tax + Fees - Down Payment - Trade-In
    const amountFinanced = Math.max(0,
        input.vehiclePrice + salesTaxAmount + input.fees - downPaymentAmount - input.tradeInValue
    );

    // 4. Calculate monthly payment using loan formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyRate = input.interestRate / 100 / 12;
    const numPayments = input.loanTermMonths;

    let monthlyPayment: number;
    let totalInterest: number;

    if (monthlyRate === 0) {
        monthlyPayment = amountFinanced / numPayments;
        totalInterest = 0;
    } else if (amountFinanced === 0) {
        monthlyPayment = 0;
        totalInterest = 0;
    } else {
        const factor = Math.pow(1 + monthlyRate, numPayments);
        monthlyPayment = amountFinanced * (monthlyRate * factor) / (factor - 1);
        totalInterest = (monthlyPayment * numPayments) - amountFinanced;
    }

    // 5. Calculate total loan amount (principal + interest)
    const totalLoanAmount = amountFinanced + totalInterest;

    // 6. Calculate total vehicle cost (everything paid)
    const totalVehicleCost = downPaymentAmount + input.tradeInValue + totalLoanAmount;

    return {
        monthlyPayment,
        totalLoanAmount,
        totalInterest,
        totalVehicleCost,
        salesTaxAmount,
        amountFinanced
    };
}
