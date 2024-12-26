import { useState, useRef } from 'react';

interface InvoiceHeaderProps {
  onLogoChange?: (logo: string) => void;
}

export function InvoiceHeader({ onLogoChange }: InvoiceHeaderProps) {
  const [logo, setLogo] = useState("https://ladinatravelsafaris.com/logo.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogo(result);
        onLogoChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-8 items-center mb-8">
      <div className="flex flex-col gap-2">
        <span className="text-gray-600">Kefan Building, Woodavenue Road</span>
        <span className="text-gray-600">(254) 728 309 380</span>
      </div>

      <div className="flex justify-center">
        <div className="relative w-24 h-24 cursor-pointer group" onClick={handleLogoClick}>
          <img
            src={logo}
            alt="Company Logo"
            className="w-full h-full rounded-full object-cover border-2 border-gray-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm">Upload Logo</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-right">
        <span className="text-gray-600">info@ladinatravelsafaris.com</span>
        <span className="text-gray-600">ladinatravelsafaris.com</span>
      </div>
    </div>
  );
}