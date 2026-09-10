import React, { useState } from 'react';
import { Calculator, Percent, DollarSign, Calendar, Landmark, CheckCircle, Info } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(8500000); // 85 Lakhs
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Loan Eligibility Inputs
  const [monthlyIncome, setMonthlyIncome] = useState(150000); // 1.5 Lakhs
  const [existingEmis, setExistingEmis] = useState(15000);

  // Calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Loan Eligibility Calculation (Assume 50% FOIR - Fixed Obligation to Income Ratio)
  const maxAvailableEmi = monthlyIncome * 0.5 - existingEmis;
  const eligibleLoanAmount = Math.max(
    0,
    Math.round(
      (maxAvailableEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
    )
  );

  const bankRates = [
    { name: 'State Bank of India (SBI)', rate: '8.40% - 8.65%', maxTenure: '30 Yrs', processingFee: '0.35%' },
    { name: 'HDFC Bank Home Loans', rate: '8.50% - 8.90%', maxTenure: '30 Yrs', processingFee: '0.50%' },
    { name: 'ICICI Bank', rate: '8.55% - 8.85%', maxTenure: '30 Yrs', processingFee: '0.50%' },
    { name: 'Axis Bank Home Finance', rate: '8.60% - 9.10%', maxTenure: '30 Yrs', processingFee: '₹ 10,000' },
    { name: 'Bank of Baroda', rate: '8.40% - 8.70%', maxTenure: '30 Yrs', processingFee: 'Nil' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">
          <Landmark className="h-3.5 w-3.5" />
          <span>Home Finance Hub</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          EMI & Loan Eligibility Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Calculate your exact monthly payments, check maximum loan eligibility, and compare current bank interest rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive EMI Calculator Card */}
        <div className="frosted-glass p-6 rounded-3xl space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-700 pb-3">
            <Calculator className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Home Loan EMI Calculator</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Property Price Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>Property Value:</span>
                <span className="text-blue-600 dark:text-blue-400 font-black">
                  ₹ {(propertyPrice / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={50000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>Down Payment ({downPaymentPercent}%):</span>
                <span className="text-indigo-600 font-bold">
                  ₹ {(downPaymentAmount / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>Interest Rate (% p.a.):</span>
                <span className="text-amber-600 font-bold">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={7.0}
                max={14.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Loan Tenure Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>Tenure (Years):</span>
                <span className="text-emerald-600 font-bold">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          {/* EMI Result Summary Box */}
          <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl space-y-3 shadow-md">
            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <span className="text-xs font-medium text-blue-200">Monthly EMI Payment</span>
              <span className="text-2xl font-black text-amber-300">₹ {emi.toLocaleString('en-IN')}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-[10px] text-blue-200">Principal Loan</p>
                <p className="font-bold">₹ {(loanAmount / 100000).toFixed(2)} Lakhs</p>
              </div>
              <div>
                <p className="text-[10px] text-blue-200">Total Interest Payable</p>
                <p className="font-bold">₹ {(totalInterest / 100000).toFixed(2)} Lakhs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Eligibility & Bank Comparison Card */}
        <div className="space-y-6">
          {/* Eligibility Estimator */}
          <div className="frosted-glass p-6 rounded-3xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <Landmark className="h-5 w-5 text-emerald-600" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Loan Eligibility Estimator</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Gross Income (₹)</label>
                <input
                  type="number"
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Existing Monthly EMIs (₹)</label>
                <input
                  type="number"
                  step={1000}
                  value={existingEmis}
                  onChange={(e) => setExistingEmis(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">Estimated Max Eligible Loan</p>
                <p className="text-xl font-black text-emerald-800 dark:text-emerald-200">
                  ₹ {(eligibleLoanAmount / 100000).toFixed(1)} Lakhs
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </div>

          {/* Major Bank Interest Rates Table */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Leading Partner Bank Rates</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400">
                    <th className="py-2">Bank</th>
                    <th className="py-2">Interest Rate</th>
                    <th className="py-2">Max Tenure</th>
                    <th className="py-2">Processing Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {bankRates.map((b, i) => (
                    <tr key={i} className="border-b border-slate-100 dark:border-slate-800/60 font-medium">
                      <td className="py-2.5 font-bold text-slate-900 dark:text-white">{b.name}</td>
                      <td className="py-2.5 text-blue-600 font-extrabold">{b.rate}</td>
                      <td className="py-2.5 text-slate-600 dark:text-slate-400">{b.maxTenure}</td>
                      <td className="py-2.5 text-slate-500">{b.processingFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
