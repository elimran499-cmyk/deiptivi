import React, { useState } from 'react';
import { Upload, X, Link, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { parseM3UPlaylist } from '../utils/m3uParser';
import { Channel } from '../types';

interface M3uImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportChannels: (newChannels: Channel[]) => void;
}

export const M3uImportModal: React.FC<M3uImportModalProps> = ({
  isOpen,
  onClose,
  onImportChannels
}) => {
  const [m3uUrl, setM3uUrl] = useState('');
  const [m3uText, setM3uText] = useState('');
  const [activeTab, setActiveTab] = useState<'url' | 'file' | 'text'>('url');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

  if (!isOpen) return null;

  const handleParseAndImport = (rawContent: string) => {
    try {
      setErrorMsg('');
      const parsed = parseM3UPlaylist(rawContent);
      if (parsed.length === 0) {
        setErrorMsg('Geen geldige #EXTINF-zenders gevonden in de afspeellijst.');
        return;
      }
      onImportChannels(parsed);
      setImportedCount(parsed.length);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      setErrorMsg('Kan de M3U-inhoud niet verwerken. Controleer de opmaak van het bestand.');
    }
  };

  const handleFetchUrl = async () => {
    if (!m3uUrl.trim()) {
      setErrorMsg('Voer een geldige M3U- of M3U8-URL in.');
      return;
    }
    try {
      setErrorMsg('Afspeellijst wordt opgehaald van de server...');
      const res = await fetch(m3uUrl);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const text = await res.text();
      handleParseAndImport(text);
    } catch (e: any) {
      setErrorMsg(`Could not fetch URL directly (CORS or network error). Try pasting the M3U raw text or sample.`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) handleParseAndImport(content);
    };
    reader.readAsText(file);
  };

  const handleLoadSampleM3u = () => {
    const sample = `#EXTM3U
#EXTINF:-1 tvg-id="1" tvg-name="NL | Ziggo Sport Totaal 4K" tvg-logo="https://images.unsplash.com/photo-1459865264687-595d652de67e?w=300" group-title="Sports" tvg-country="NL",Ziggo Sport Totaal 4K
https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
#EXTINF:-1 tvg-id="2" tvg-name="NL | ESPN 1 NL" tvg-logo="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300" group-title="Sports" tvg-country="NL",ESPN 1 NL
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
#EXTINF:-1 tvg-id="3" tvg-name="NL | Film1 Premiere 4K" tvg-logo="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300" group-title="Movies" tvg-country="NL",Film1 Premiere 4K
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4`;
    handleParseAndImport(sample);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-100">IPTV M3U-afspeellijst importeren</h3>
              <p className="text-xs text-slate-400">Voeg eigen zenders toe via een link of bestand</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {isSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div className="text-xs font-bold">
              {importedCount} nieuwe zenders toegevoegd aan je IPTV-zenderlijst!
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'url' ? 'bg-indigo-600 text-slate-100 shadow-md' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Link className="w-3.5 h-3.5" /> M3U-URL
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'file' ? 'bg-indigo-600 text-slate-100 shadow-md' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> .M3U-bestand
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'text' ? 'bg-indigo-600 text-slate-100 shadow-md' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Tekst plakken
          </button>
        </div>

        {/* Tab 1: URL input */}
        {activeTab === 'url' && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 block">M3U / M3U8 afspeellijst-URL</label>
            <input
              type="text"
              value={m3uUrl}
              onChange={(e) => setM3uUrl(e.target.value)}
              placeholder="bijv. http://mijn-iptv-provider.nl/get.php?username=..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleFetchUrl}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-slate-100 font-extrabold text-xs rounded-xl shadow-lg transition-transform hover:scale-[1.01] cursor-pointer"
            >
              Zenders ophalen en importeren
            </button>
          </div>
        )}

        {/* Tab 2: File Upload */}
        {activeTab === 'file' && (
          <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500 rounded-2xl p-6 text-center space-y-3 transition-colors">
            <Upload className="w-8 h-8 text-indigo-400 mx-auto" />
            <div>
              <p className="text-xs font-bold text-slate-200">Upload een .m3u- of .m3u8-bestand</p>
              <p className="text-[10px] text-slate-400">Ondersteunt standaard IPTV EXTINF-tags</p>
            </div>
            <input
              type="file"
              accept=".m3u,.m3u8,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="m3u-file-input"
            />
            <label
              htmlFor="m3u-file-input"
              className="inline-block px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl cursor-pointer border border-slate-700"
            >
              Kies M3U-bestand
            </label>
          </div>
        )}

        {/* Tab 3: Paste Raw */}
        {activeTab === 'text' && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 block">Plak ruwe M3U-inhoud</label>
            <textarea
              rows={5}
              value={m3uText}
              onChange={(e) => setM3uText(e.target.value)}
              placeholder="#EXTM3U&#10;#EXTINF:-1 tvg-logo=&quot;logo.png&quot; group-title=&quot;Sports&quot;,Ziggo Sport 4K&#10;https://stream-link.m3u8"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => handleParseAndImport(m3uText)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-slate-100 font-extrabold text-xs rounded-xl shadow-lg transition-transform hover:scale-[1.01] cursor-pointer"
            >
              Tekst verwerken
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Preset Sample Button */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">Wil je het testen met een voorbeeldlijst?</span>
          <button
            onClick={handleLoadSampleM3u}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Voorbeeld-M3U laden
          </button>
        </div>
      </div>
    </div>
  );
};
