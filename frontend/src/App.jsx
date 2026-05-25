/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { ShieldAlert, Search, Code, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

function App() {
  const [inputMode, setInputMode] = useState('address');
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!inputValue.trim()) {
      setError("Please enter a contract address or source code.");
      return;
    }

    setLoading(true);
    setError('');
    setResults(null); 
    
    try {
      const payload = inputMode === 'address'
        ? { address: inputValue }
        : { sourceCode: inputValue };
        
      const response = await axios.post('http://localhost:5000/api/scan', payload);
      
      // Ensure we received valid data before setting results
      if (response.data && response.data.success) {
        setResults(response.data);
      } else {
        throw new Error(response.data.error || "Analysis failed to return valid data.");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Connection Error: Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldAlert className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Sentinel <span className="text-blue-500">Honeypot Detector</span></h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1e293b] p-1 rounded-xl flex gap-1 border border-slate-700">
              <button
                onClick={() => setInputMode('address')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition ${inputMode === 'address' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                <Search size={18}/> Address
              </button>
              <button
                onClick={() => setInputMode('code')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition ${inputMode === 'code' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                <Code size={18}/> Source Code
              </button>
            </div>

            <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700 shadow-xl">
              {inputMode === 'address' ? (
                <input
                  type="text"
                  placeholder="Paste Contract Address (0x...)"
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              ) : (
                <textarea
                  placeholder="Paste Solidity code..."
                  className="w-full h-80 bg-[#0f172a] border border-slate-700 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              )}
              
              <button
                disabled={loading}
                onClick={handleScan}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-slate-400 py-4 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                {loading ? <Loader2 className="animate-spin" /> : "Run Security Analysis"}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle className="shrink-0" size={20} /> 
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            {loading ? (
              <div className="h-full border-2 border-slate-800 rounded-2xl flex flex-col items-center justify-center p-12 text-blue-500 bg-[#1e293b]/50">
                <Loader2 size={48} className="animate-spin mb-4" />
                <p className="text-slate-400 font-medium">Analyzing Contract Logic...</p>
              </div>
            ) : results ? (
               <div className="space-y-6">
                  <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 font-medium">Security Score</p>
                      <h2 className={`text-6xl font-black mt-1 ${results.securityScore < 50 ? 'text-red-500' : 'text-green-400'}`}>
                        {results.securityScore}/100
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${results.riskLevel === 'CRITICAL' || results.riskLevel === 'HIGH' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-green-500/20 text-green-500'}`}>
                        {results.riskLevel} Risk
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {results.findings && results.findings.length > 0 ? (
                      results.findings.map((f, i) => {
                        // 1. Defensively clean or parse the finding if it arrived as a string or nested object
                        let itemType = f.type || "SUSPICIOUS_PATTERN";
                        let itemMessage = f.message || f.description || "";

                        if (typeof f === 'string') {
                          try {
                            const parsed = JSON.parse(f);
                            itemType = parsed.type || itemType;
                            itemMessage = parsed.message || parsed.description || itemMessage;
                          } catch (e) { /* empty */ }
                        } else if (f.type && typeof f.type === 'string' && f.type.startsWith('{')) {
                          try {
                            const parsed = JSON.parse(f.type);
                            itemType = parsed.type || itemType;
                            itemMessage = parsed.message || parsed.description || parsed.msg || itemMessage;
                          } catch (e) { /* empty */ }
                        } else if (f.type && typeof f.type === 'object') {
                          // Extra fallback in case it hits the front-end as an unparsed object literal
                          itemType = f.type.type || itemType;
                          itemMessage = f.type.message || f.type.description || itemMessage;
                        }

                        // Fallback if message is still empty
                        if (!itemMessage) itemMessage = "Suspicious contract structure or parameter modifications detected.";

                        // 2. Determine color accents based on severity or type
                        const itemTypeString = itemType.toString();
                        const isHigh = itemTypeString.includes('BLACKLIST') || itemTypeString.includes('MINT') || itemTypeString.includes('LOCK');
                        const borderAccent = isHigh ? "border-l-red-500" : "border-l-amber-500";
                        const textAccent = isHigh ? "text-red-400" : "text-amber-400";

                        return (
                          <div key={i} className={`bg-[#1e293b] p-5 rounded-xl border-l-4 ${borderAccent} border border-slate-700 shadow-sm hover:border-slate-600 transition-all duration-200`}>
                            <h4 className={`${textAccent} font-bold flex items-center gap-2 text-sm tracking-wide uppercase`}>
                              <ShieldAlert size={16} className="shrink-0" /> 
                              {itemTypeString.replace(/_/g, ' ')}
                            </h4>
                            <p className="text-slate-300 mt-2 text-sm leading-relaxed font-normal">
                              {itemMessage}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 text-center">
                        <CheckCircle className="text-green-400 mx-auto mb-2" size={32} />
                        <p className="text-green-400 font-bold">No High-Risk Honeypot Patterns Detected</p>
                        <p className="text-slate-400 text-sm mt-1">This doesn't guarantee absolute safety, but standard traps were not found.</p>
                      </div>
                    )}
                  </div>
               </div>
            ) : (
              <div className="h-full border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-12 text-slate-500">
                <ShieldAlert size={48} className="mb-4 opacity-20" />
                <p>Enter a contract to begin analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;