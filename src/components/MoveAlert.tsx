import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MoveAlertProps {
  message: string;
}

const MoveAlert: React.FC<MoveAlertProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center p-2 bg-[#b33430] text-white rounded-lg shadow-md animate-fade-in">
      <AlertCircle className="w-5 h-5 mr-2" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default MoveAlert;