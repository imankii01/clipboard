import React, { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';
import { Clip } from '../types/clip';

interface QRCodeModalProps {
  clip: Clip;
  onClose: () => void;
  darkMode: boolean;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ clip, onClose, darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simple QR code generation (for demo purposes)
    // In a real app, you'd use a proper QR code library
    const generateQR = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = 200;
      canvas.width = size;
      canvas.height = size;

      // Simple pattern for demo
      ctx.fillStyle = darkMode ? '#ffffff' : '#000000';
      ctx.fillRect(0, 0, size, size);

      ctx.fillStyle = darkMode ? '#000000' : '#ffffff';
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if ((i + j) % 3 === 0) {
            ctx.fillRect(i * 10, j * 10, 10, 10);
          }
        }
      }
    };

    generateQR();
  }, [darkMode]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `clipboard-qr-${clip.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className={`p-6 rounded-xl shadow-xl max-w-md w-full mx-4 animate-scale-in ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            QR Code
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border rounded-lg"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </div>

          <div className={`text-sm p-3 rounded-lg ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {clip.content.length > 100 
              ? `${clip.content.substring(0, 100)}...` 
              : clip.content
            }
          </div>

          <div className="flex justify-center space-x-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};