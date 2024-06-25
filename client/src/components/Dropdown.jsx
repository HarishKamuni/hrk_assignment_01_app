import React, { useEffect, useState } from 'react';

const Dropdown = ({ setSelectedMonth }) => {
  const [monthData, setMonthData] = useState('March');

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const handleMonth = (e) => {
    setMonthData(e.target.value);
    setSelectedMonth(e.target.value);
  };
  useEffect(() => {}, [monthData]);
  return (
    <div>
      <select
        name=""
        id=" "
        className="py-2 px-4 cursor-pointer border outline-none"
        value={monthData}
        onChange={handleMonth}
      >
        {months.map((item, i) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
