"use client";

export default function ViewDocumentModal({ open, onClose, document, onDownload }) {
  if (!open) return null;

  const title = document?.name || document?.title || "Document";

  const handleDownload = async () => {
    const file = document?.files?.[0];
    try {
      if (file?.blob) {
        const url = URL.createObjectURL(file.blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name || title;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        return;
      }
      if (file?.url) {
        window.open(file.url, "_blank", "noopener,noreferrer");
        return;
      }
      if (onDownload) onDownload(document);
    } catch {
      if (onDownload) onDownload(document);
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-100/70 flex items-start justify-center p-6 z-50 overflow-y-auto mb-0">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="cursor-pointer">
            <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="h-64 md:h-72 w-full bg-gray-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-gray-500">
            <i className="fas fa-file text-4xl mb-2"></i>
            <p className="text-sm">Document preview</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-200 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer">
            Close
          </button>
          <button onClick={handleDownload} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md cursor-pointer">
            <i className="fas fa-download mr-2"></i>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
