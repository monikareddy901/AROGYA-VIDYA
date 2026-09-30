import React from 'react';
import { X, ArrowUpRight, ArrowDownRight, ArrowRight, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MedicalReport } from '../types';

interface ReportComparisonModalProps {
  reportA: MedicalReport;
  reportB: MedicalReport;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportComparisonModal: React.FC<ReportComparisonModalProps> = ({
  reportA,
  reportB,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  // Align tests by test name
  const pairedTests: Array<{
    name: string;
    unit: string;
    valA: string;
    numA?: number;
    valB: string;
    numB?: number;
    delta?: number;
    direction: 'up' | 'down' | 'same' | 'na';
    explanation: string;
  }> = reportA.tests.map((tA) => {
    const matchingB = reportB.tests.find(
      (tB) => tB.testName.toLowerCase() === tA.testName.toLowerCase()
    );

    const valB = matchingB ? matchingB.resultValue : 'N/A';
    const numB = matchingB?.numericValue;
    const numA = tA.numericValue;

    let direction: 'up' | 'down' | 'same' | 'na' = 'na';
    let delta: number | undefined = undefined;

    if (numA !== undefined && numB !== undefined) {
      delta = Number((numA - numB).toFixed(2));
      if (delta > 0.05) direction = 'up';
      else if (delta < -0.05) direction = 'down';
      else direction = 'same';
    }

    let explanation = `Comparing ${tA.testName}: Earlier recorded value was ${valB} (${reportB.reportDate}) and current is ${tA.resultValue} (${reportA.reportDate}).`;
    if (direction === 'up' && tA.status === 'below') {
      explanation = `Hemoglobin / biomarker has improved from ${valB} towards the reference interval (${tA.resultValue} ${tA.unit}).`;
    }

    return {
      name: tA.testName,
      unit: tA.unit,
      valA: tA.resultValue,
      numA,
      valB,
      numB,
      delta,
      direction,
      explanation,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-display">Biomarker Trend Comparison</h3>
                <p className="text-xs text-blue-200">
                  {reportB.reportDate} (Previous) vs {reportA.reportDate} (Current)
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Trends reflect biological fluctuations over time. A rise or fall is an observation to discuss with your doctor rather than an automatic indicator of disease.
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="p-3.5">Biomarker Test</th>
                  <th className="p-3.5 text-center">Previous ({reportB.reportDate})</th>
                  <th className="p-3.5 text-center">Current ({reportA.reportDate})</th>
                  <th className="p-3.5 text-center">Trajectory</th>
                  <th className="p-3.5">Educational Trend Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {pairedTests.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{row.name}</td>
                    <td className="p-3.5 text-center font-mono font-medium text-slate-600">
                      {row.valB} {row.unit}
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-900 bg-teal-50/50">
                      {row.valA} {row.unit}
                    </td>
                    <td className="p-3.5 text-center">
                      {row.direction === 'up' && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[11px]">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>+{row.delta}</span>
                        </span>
                      )}
                      {row.direction === 'down' && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold text-[11px]">
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          <span>{row.delta}</span>
                        </span>
                      )}
                      {row.direction === 'same' && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-bold text-[11px]">
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>Stable</span>
                        </span>
                      )}
                      {row.direction === 'na' && <span className="text-slate-400">—</span>}
                    </td>
                    <td className="p-3.5 text-slate-600 text-[11px] leading-relaxed">
                      {row.explanation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            For doctor consultation preparation.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
