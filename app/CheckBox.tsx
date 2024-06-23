'use client'

import { useState } from 'react';

interface Checkbox {
  id: string;
  label: string;
  children?: Checkbox[];
}

const checkboxes: Checkbox[] = [
  {
    id: 'CB1',
    label: 'CB1',
    children: [
      {
        id: 'CB2',
        label: 'CB2',
        children: [
          { id: 'CB3', label: 'CB3' },
          { id: 'CB4', label: 'CB4' }
        ]
      },
      { id: 'CB5', label: 'CB5' }
    ]
  }
];

const initializeCheckedState = (checkboxes: Checkbox[], checkedState: any = {}) => {
  checkboxes.forEach((checkbox) => {
    checkedState[checkbox.id] = false;
    if (checkbox.children) {
      initializeCheckedState(checkbox.children, checkedState);
    }
  });
  return checkedState;
};

const CheckboxGroup = () => {
  const [checked, setChecked] = useState(initializeCheckedState(checkboxes));

  const handleCheckboxChange = (id: string, children?: Checkbox[]) => {
    const newChecked = { ...checked };
    const isChecked = !checked[id];
    newChecked[id] = isChecked;

    if (children) {
      children.forEach((child) => {
        newChecked[child.id] = isChecked;
        if (child.children) {
          child.children.forEach((grandchild) => {
            newChecked[grandchild.id] = isChecked;
          });
        }
      });
    }

    // Check/uncheck parent logic
    const updateParentChecks = () => {
      newChecked['CB2'] = newChecked['CB3'] && newChecked['CB4'];
      newChecked['CB1'] = newChecked['CB2'] && newChecked['CB5'];
    };

    updateParentChecks();

    // Ensure parent checkboxes reflect the state of their children
    if (id === 'CB2' || id === 'CB5') {
      newChecked['CB1'] = newChecked['CB2'] && newChecked['CB5'];
    }

    if (id === 'CB3' || id === 'CB4') {
      newChecked['CB2'] = newChecked['CB3'] && newChecked['CB4'];
    }

    setChecked(newChecked);
  };

  const renderCheckboxes = (checkboxes: Checkbox[]) => {
    return checkboxes.map((checkbox) => (
      <div key={checkbox.id} className="ml-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checked[checkbox.id]}
            onChange={() => handleCheckboxChange(checkbox.id, checkbox.children)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>{checkbox.label}</span>
        </label>
        {checkbox.children && renderCheckboxes(checkbox.children)}
      </div>
    ));
  };

  return <div className="p-4">{renderCheckboxes(checkboxes)}</div>;
};

export default CheckboxGroup;




// CB1 : [ CB2 : [CB3. CB4], CB5]