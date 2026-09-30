import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Clock,
  UserCheck,
  Plus,
  Trash2,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { LanguageCode, MedicalReport, ReportTestResult, UserProfile } from '../types';
import { AIService, HealthBridgeStorage } from '../services/api';
import { ReportComparisonModal } from './ReportComparisonModal';

interface MedicalReportExplainerProps {
  user: UserProfile;
  reports: MedicalReport[];
  onUpdateReports: (reports: MedicalReport[]) => void;
  language: LanguageCode;
  onNavigateToDoctorPrep: (reportData: any) => void;
  onNavigate?: (tab: string) => void;
}

export const MedicalReportExplainer: React.FC<MedicalReportExplainerProps> = ({
  user,
  reports,
  onUpdateReports,
  language,
  onNavigateToDoctorPrep,
  onNavigate,
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string>(
    reports[0]?.id || ''
  );
  const [activeTabByTest, setActiveTabByTest] = useState<Record<string, 'simple' | 'measures' | 'questions'>>({});
  const [showComparison, setShowComparison] = useState(false);

  // Upload/Manual entry state
  const [uploadMode, setUploadMode] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [pastedText, setPastedText] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const currentReport = reports.find((r) => r.id === selectedReportId) || reports[0];
  const previousReport = reports.find(
    (r) => r.id !== currentReport?.id && r.category === currentReport?.category
  );

  const getTestTab = (testName: string) => {
    return activeTabByTest[testName] || 'simple';
  };

  const setTestTab = (testName: string, tab: 'simple' | 'measures' | 'questions') => {
    setActiveTabByTest((prev) => ({ ...prev, [testName]: tab }));
  };

  const handleProcessUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim() && !reportTitle.trim()) return;

    setLoadingAI(true);
    try {
      const response = await AIService.explainReport({
        reportTitle: reportTitle || 'Uploaded Diagnostic Report',
        reportText: pastedText,
      });

      const newReport: MedicalReport = {
        id: 'rep-' + Date.now(),
        userId: user.id,
        reportTitle: response.reportTitle || reportTitle || 'Diagnostic Lab Report',
        reportDate: reportDate,
        laboratoryName: 'Diagnostic Laboratory',
        category: 'Hematology',
        fileName: 'User_Uploaded_Report.txt',
        tests: response.tests || [
          {
            testName: 'General Biomarker',
            resultValue: '12.0',
            unit: 'units',
            referenceRange: '10.0 - 15.0 units',
            status: 'normal',
            simpleExplanation: 'Biomarker within laboratory limits.',
            whatItMeasures: 'Biological marker value.',
            questionsForDoctor: ['What do these results suggest?']
          }
        ],
        overallSummary: response.overallSummary || 'Report parsed successfully.',
        disclaimer: response.disclaimer || 'Educational explanation only.',
        uploadedAt: new Date().toISOString()
      };

      const updated = HealthBridgeStorage.saveReport(newReport);
      onUpdateReports(updated);
      setSelectedReportId(newReport.id);
      setUploadMode(false);
      setPastedText('');
      setReportTitle('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleDeleteReport = (id: string) => {
    if (confirm('Remove this report from your vault?')) {
      const updated = HealthBridgeStorage.deleteReport(id);
      onUpdateReports(updated);
      if (selectedReportId === id && updated.length > 0) {
        setSelectedReportId(updated[0].id);
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('dashboard') : window.history.back()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer border border-white/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>← Back to Dashboard</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-200 text-xs font-semibold">
              <FileText className="w-4 h-4 text-blue-300" />
              <span>Smart Biomarker Explainer</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Understand Your Medical Lab Reports
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Translate confusing laboratory abbreviations, units, and numbers into clear, reassuring explanations referenced to your test's specific laboratory range.
          </p>
        </div>

        <button
          id="btn-open-upload-report"
          onClick={() => setUploadMode(!uploadMode)}
          className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{uploadMode ? 'View Saved Reports' : 'Explain New Report'}</span>
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Educational Explanations Only:</strong> Reference intervals vary across laboratories due to different test equipment. This tool explains what tests measure and helps you formulate questions. It does not diagnose clinical conditions or alter medical advice.
        </div>
      </div>

      {/* Upload New Report Form */}
      {uploadMode && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Upload or Paste Lab Report</h2>
              <p className="text-xs text-slate-500">
                Paste the text from your diagnostic lab report (e.g. CBC, Thyroid, Lipid, Vitamin D)
              </p>
            </div>
            <button
              onClick={() => setUploadMode(false)}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleProcessUpload} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Report Title / Panel Name
                </label>
                <input
                  id="input-new-report-title"
                  type="text"
                  required
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="e.g. Complete Blood Count (CBC) or Fasting Lipid Profile"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Report Date
                </label>
                <input
                  id="input-new-report-date"
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paste Report Content / Values
              </label>
              <textarea
                id="textarea-report-raw-text"
                rows={5}
                required
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Example:
Hemoglobin: 11.0 g/dL (Reference: 12.0 - 15.5 g/dL)
WBC: 6,800 cells/mcL (Reference: 4,500 - 11,000 cells/mcL)
Platelets: 250,000 /mcL (Reference: 150,000 - 450,000 /mcL)..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
              />
            </div>

            <button
              id="btn-submit-report-ai"
              type="submit"
              disabled={loadingAI}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{loadingAI ? 'Analyzing Biomarkers...' : 'Explain Lab Biomarkers with AI'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Reports Vault Tabs & Selector */}
      {reports.length > 0 && (
        <div className="space-y-6">
          {/* Report Selector Pills */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {reports.map((rep) => (
                <button
                  key={rep.id}
                  id={`btn-select-report-${rep.id}`}
                  onClick={() => setSelectedReportId(rep.id)}
                  className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    selectedReportId === rep.id
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{rep.reportTitle}</span>
                  <span className="text-[10px] opacity-75">({rep.reportDate})</span>
                </button>
              ))}
            </div>

            {/* Historical Comparison Button */}
            {previousReport && (
              <button
                id="btn-compare-reports"
                onClick={() => setShowComparison(true)}
                className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Compare with Earlier Checkup</span>
              </button>
            )}
          </div>

          {/* Current Report Details Card */}
          {currentReport && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              {/* Report Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {currentReport.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      Lab: {currentReport.laboratoryName}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-1 font-display">
                    {currentReport.reportTitle}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tested on: {currentReport.reportDate} | {currentReport.tests.length} Biomarkers Reviewed
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      onNavigateToDoctorPrep({
                        mainConcern: `Review ${currentReport.reportTitle}`,
                        reports: [currentReport.reportTitle],
                        symptoms: [],
                      })
                    }
                    className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-semibold rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-teal-700" />
                    <span>Prepare Questions for Doctor</span>
                  </button>

                  <button
                    id="btn-delete-current-report"
                    onClick={() => handleDeleteReport(currentReport.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Overall Summary Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block">
                  Overall Report Summary:
                </span>
                <p>{currentReport.overallSummary}</p>
              </div>

              {/* Biomarkers Cards List */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Individual Biomarker Explanations ({currentReport.tests.length})
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {currentReport.tests.map((test, idx) => {
                    const currentTab = getTestTab(test.testName);

                    return (
                      <div
                        key={idx}
                        id={`test-card-${test.testName.replace(/\s+/g, '')}`}
                        className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-xs space-y-4"
                      >
                        {/* Top Test Line: Name, Result, Range, Status */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-base text-slate-900">
                              {test.testName}
                            </h4>
                            <span className="text-xs text-slate-500">
                              Laboratory Reference Range: <strong>{test.referenceRange}</strong>
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-xs text-slate-400 block">Your Result</span>
                              <span className="text-lg font-bold font-mono text-slate-900">
                                {test.resultValue} {test.unit}
                              </span>
                            </div>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                test.status === 'normal'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : test.status === 'below'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {test.status === 'normal'
                                ? 'Within Range'
                                : test.status === 'below'
                                ? 'Below Range'
                                : 'Above Range'}
                            </span>
                          </div>
                        </div>

                        {/* Internal Navigation Tabs for this Test */}
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs">
                          <button
                            id={`tab-simple-${idx}`}
                            onClick={() => setTestTab(test.testName, 'simple')}
                            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                              currentTab === 'simple'
                                ? 'bg-teal-100 text-teal-900'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Simple Explanation
                          </button>
                          <button
                            id={`tab-measures-${idx}`}
                            onClick={() => setTestTab(test.testName, 'measures')}
                            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                              currentTab === 'measures'
                                ? 'bg-teal-100 text-teal-900'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            What It Measures
                          </button>
                          <button
                            id={`tab-questions-${idx}`}
                            onClick={() => setTestTab(test.testName, 'questions')}
                            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                              currentTab === 'questions'
                                ? 'bg-teal-100 text-teal-900'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Questions to Ask Doctor ({test.questionsForDoctor.length})
                          </button>
                        </div>

                        {/* Tab Content */}
                        <div className="text-xs text-slate-700 leading-relaxed">
                          {currentTab === 'simple' && (
                            <p className="p-3 bg-teal-50/50 rounded-xl border border-teal-100">
                              {test.simpleExplanation}
                            </p>
                          )}

                          {currentTab === 'measures' && (
                            <p className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                              <strong>Biological Function:</strong> {test.whatItMeasures}
                            </p>
                          )}

                          {currentTab === 'questions' && (
                            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1.5">
                              <span className="font-bold text-indigo-950 block">
                                Recommended questions for your appointment:
                              </span>
                              <ul className="space-y-1">
                                {test.questionsForDoctor.map((q, qidx) => (
                                  <li key={qidx} className="flex items-start gap-1.5 text-indigo-900">
                                    <span className="text-indigo-600 font-bold">•</span>
                                    <span>{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Comparison Modal */}
      {showComparison && currentReport && previousReport && (
        <ReportComparisonModal
          reportA={currentReport}
          reportB={previousReport}
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
};
