import { X } from 'lucide-react';

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ExitModal({ isOpen, onClose, onConfirm }: ExitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Content */}
        <div className="text-center pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Exit App?</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to exit the app?
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-[#50c2c9] bg-opacity-30 text-black rounded-lg font-medium hover:bg-opacity-40 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-[#50c2c9] text-white rounded-lg font-medium hover:bg-[#47b1b8] transition-colors"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="flex justify-center mt-6">
          <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
