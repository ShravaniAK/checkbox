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
    checkedState[checkbox.id] = { checked: false, disabled: false };
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
      const isChecked = !checked[id].checked;
      newChecked[id].checked = isChecked;
  
      if (children) {
        children.forEach((child) => {
          newChecked[child.id].checked = isChecked;
          newChecked[child.id].disabled = !isChecked;
          if (child.children) {
            child.children.forEach((grandchild) => {
              newChecked[grandchild.id].checked = isChecked;
              newChecked[grandchild.id].disabled = !isChecked;
            });
          }
        });
      }
  
      const updateParentChecks = () => {
        newChecked['CB2'].checked = newChecked['CB3'].checked && newChecked['CB4'].checked;
        newChecked['CB1'].checked = newChecked['CB2'].checked && newChecked['CB5'].checked;
  
        newChecked['CB1'].disabled = !(newChecked['CB2'].checked && newChecked['CB5'].checked);
        newChecked['CB2'].disabled = !(newChecked['CB3'].checked && newChecked['CB4'].checked);
      };
  
      updateParentChecks();
  
      if (id === 'CB2' || id === 'CB5') {
        newChecked['CB1'].checked = newChecked['CB2'].checked && newChecked['CB5'].checked;
        newChecked['CB1'].disabled = !(newChecked['CB2'].checked && newChecked['CB5'].checked);
      }
  
      if (id === 'CB3' || id === 'CB4') {
        newChecked['CB2'].checked = newChecked['CB3'].checked && newChecked['CB4'].checked;
        newChecked['CB2'].disabled = !(newChecked['CB3'].checked && newChecked['CB4'].checked);
      }
  
      setChecked(newChecked);
    };
  
    const renderCheckboxes = (checkboxes: Checkbox[]) => {
      return checkboxes.map((checkbox) => (
        <div key={checkbox.id} className="ml-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checked[checkbox.id].checked}
              onChange={() => handleCheckboxChange(checkbox.id, checkbox.children)}
              disabled={checked[checkbox.id].disabled}
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