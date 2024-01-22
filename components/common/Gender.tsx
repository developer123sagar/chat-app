import React, { ChangeEvent } from 'react';
import { GenderProps } from "@/types";

const Gender: React.FC<GenderProps> = ({ selectedGender, setGender }) => {
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-2 space-y-2">
      <div>
        <select
          id="gender"
          value={selectedGender}
          onChange={handleGenderChange}
          className="bg-input-backgroun h-10 rounded-lg px-2 py-2 w-full"
        >
          <option value="" disabled>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default Gender;
