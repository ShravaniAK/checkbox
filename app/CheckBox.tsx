'use client'

import { useState } from 'react';

interface CheckboxState {
  CB1: boolean;
  CB2: boolean;
  CB3: boolean;
  CB4: boolean;
  CB5: boolean;
}

const CheckboxGroup = () => {
  const [checked, setChecked] = useState<CheckboxState>({
    CB1: false,
    CB2: false,
    CB3: false,
    CB4: false,
    CB5: false,
  });

  const handleCheckboxChange = (name: keyof CheckboxState) => {
    const newChecked = { ...checked };

    if (name === 'CB1') {
      newChecked.CB1 = !checked.CB1;
      newChecked.CB2 = newChecked.CB1;
      newChecked.CB5 = newChecked.CB1;
    } else if (name === 'CB2') {
      newChecked.CB2 = !checked.CB2;
      newChecked.CB3 = newChecked.CB2;
      newChecked.CB4 = newChecked.CB2;
    } else {
      newChecked[name] = !checked[name];
    }

    if (newChecked.CB2 && newChecked.CB5) {
      newChecked.CB1 = true;
    } else {
      newChecked.CB1 = false;
    }

    if (newChecked.CB3 && newChecked.CB4) {
      newChecked.CB2 = true;
    } else {
      newChecked.CB2 = false;
    }

    setChecked(newChecked);
  };

  return (
    <div className="p-4">
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checked.CB1}
            onChange={() => handleCheckboxChange('CB1')}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>CB1</span>
        </label>
      </div>
      <div className="ml-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checked.CB2}
            onChange={() => handleCheckboxChange('CB2')}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>CB2</span>
        </label>
        <div className="ml-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checked.CB3}
              onChange={() => handleCheckboxChange('CB3')}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>CB3</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checked.CB4}
              onChange={() => handleCheckboxChange('CB4')}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>CB4</span>
          </label>
        </div>
      </div>
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checked.CB5}
            onChange={() => handleCheckboxChange('CB5')}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>CB5</span>
        </label>
      </div>
    </div>
  );
};

export default CheckboxGroup;



// CB1 : [ CB2 : [CB3. CB4], CB5]