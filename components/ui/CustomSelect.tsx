import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './CustomSelect.css';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="select-container" ref={dropdownRef}>
      <label className="select-label">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`select-trigger ${error ? 'has-error' : ''} ${isOpen ? 'is-open' : ''}`}
      >
        <span className={selectedOption ? 'selected-text' : 'placeholder-text'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`select-chevron ${isOpen ? 'rotated' : ''}`} 
        />
      </button>

      {error && (
        <p className="select-error">{error}</p>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown-list">
            {options.map((option) => (
              <li 
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`dropdown-item ${value === option.value ? 'is-selected' : ''}`}
              >
                {option.label}
                {value === option.value && <Check className="check-icon" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;