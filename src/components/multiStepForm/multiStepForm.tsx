import { useState } from 'react';

import Accommodation from '../accommodation/accommodation';
import Owner from '../owner/owner';
import Resume from '../resume/resume';

function MultiStepForm() {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Accommodation setStep={setStep} />;
      case 2:
        return <Owner setStep={setStep} />;
      case 3:
        return <Resume />;
      default:
        return null;
    }
  };
  return (
    <main className="bg-white rounded-2xl shadow-lg p-8 w-[400px] h-[630px] flex flex-col">
      {renderStep()}
    </main>
  );
}

export default MultiStepForm;
