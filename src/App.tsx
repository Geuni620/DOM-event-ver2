import { Barcode, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scannedValue, setScannedValue] = useState('');

  const handleScan = () => {
    if (value.trim()) {
      setScannedValue(value);
      setIsModalOpen(true);
      setValue('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Barcode Scanner
        </h1>
        <div className="relative">
          <Input
            ref={inputRef}
            className="pl-10 pr-4"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleScan();
              }
            }}
            placeholder="Scan or enter barcode"
          />
          <Barcode
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <Button className="mt-4 w-full" onClick={handleScan}>
          Submit
        </Button>
      </div>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Barcode Scanned Successfully</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-6">
              <CheckCircle className="mb-4 text-green-500" size={48} />
              <p className="text-center text-lg font-semibold text-gray-700">
                Scanned Value: {scannedValue}
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
