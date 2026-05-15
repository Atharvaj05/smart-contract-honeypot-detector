import React, { useState } from 'react';
import axios from 'axios';
import { ShieldAlert, ShieldCheck, AlertTriangle, Code2, Search, FileCode } from 'lucide-react';

function App() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    if (!code.trim()) return alert("Please paste some code first!");
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Connects to your backend server running on port 5000
      const response = await axios.post('http://localhost:5000/api/scan', { 
        sourceCode: code 
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not connect to the scanning engine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Header Area */}
      <header className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-blue-500" size={32} />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Contract<span className="text-blue-500"> Sentinel</span>
            </h1>
          </div>
          <div className="flex gap-4 text-sm font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer">Documentation</span>
            <span className="hover:text-white cursor-pointer">API</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: INPUT AREA (5 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Code2 size={18} />
              <span className="text-sm uppercase tracking-wider font-semibold">Solidity Source Code</span>
            </div>
            <div className="relative group">
              <textarea
                className="w-full h-[600px] bg-[#1e293b] text-blue-100 p-6 font-mono text-sm rounded-2xl border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-2xl resize-none"
                placeholder="// Paste your smart contract here to begin security audit..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button 
                onClick={handleScan}
                disabled={loading}
                className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-900/20"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                ) : (
                  <Search size={20} />
                )}
                {loading ? "Scanning AST..." : "Run Security Audit"}
              </button>
            </div>
          </div>

          {/* RIGHT: RESULTS AREA (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-slate-400 mb-6">
              <FileCode size={18} />
              <span className="text-sm uppercase tracking-wider font-semibold">Audit Report</span>
            </div>

            {result ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Score Card */}
                <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${result.securityScore < 70 ? 'bg-red-500' : 'bg-green-500'}`} />
                  <h2 className="text-slate-400 uppercase text-xs font-bold tracking-[0.2em] mb-2">Security Score</h2>
                  <div className={`text-7xl font-black mb-2 ${result.securityScore < 70 ? 'text-red-500' : 'text-green-400'}`}>
                    {result.securityScore}<span className="text-2xl text-slate-600">/100</span>
                  </div>
                  <p className="text-slate-300 font-medium">Risk Level: 
                    <span className={`ml-2 uppercase ${result.riskLevel === 'CRITICAL' || result.riskLevel === 'HIGH' ? 'text-red-400' : 'text-green-400'}`}>
                      {result.riskLevel}
                    </span>
                  </p>
                </div>

                {/* Findings List */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-500 px-2 uppercase tracking-widest">Detected Vulnerabilities</h3>
                  {result.findings.length > 0 ? result.findings.map((f, i) => (
                    <div key={i} className="group p-5 bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 rounded-2xl transition-all">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 bg-red-500/10 rounded-lg text-red-500">
                          <AlertTriangle size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-100 flex items-center gap-2">
                            {f.type}
                            <span className="text-[10px] px-2 py-0.5 bg-red-900/30 text-red-400 border border-red-800/50 rounded-full">
                              {f.severity}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mt-1 leading-relaxed">{f.message}</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-10 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
                      <ShieldCheck className="mx-auto text-green-500/50 mb-2" size={32} />
                      <p className="text-slate-500 text-sm">No critical vulnerabilities found in the logic.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[600px] flex flex-col items-center justify-center bg-slate-800/20 rounded-3xl border-2 border-dashed border-slate-800 text-slate-500">
                {error ? (
                  <div className="text-center p-6">
                    <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
                    <p className="text-red-400 font-medium">{error}</p>
                  </div>
                ) : (
                  <>
                    <Search size={48} className="mb-4 opacity-10" />
                    <p className="text-sm">Enter code and run audit to view report.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;