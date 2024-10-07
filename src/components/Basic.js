import React, { useState } from 'react';
import AddEntry from './AddEntry';
import EditEntry from './EditEntry';

export const Basic = () => {
  const [income, setIncome] = useState(0);
  const [entries, setEntries] = useState([]);
  const [sum, setSum] = useState(0);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const filterByDate = () => {
    const sortedEntries = [...entries].sort((a, b) => new Date(a.time) - new Date(b.time));
    setFilteredEntries(sortedEntries);
  };

  const filterByCategory = () => {
    const sortedEntries = [...entries].sort((a, b) => a.category.localeCompare(b.category));
    setFilteredEntries(sortedEntries);
  };

  const del = (id) => {
    const entryToDelete = entries.find(entry => entry.id === id);
    const arr = entries.filter(entry => entry.id !== id);
    setEntries(arr);
    setIncome(income + entryToDelete.amount); 
    setSum(sum - entryToDelete.amount); 
  };

  const handleEdit = (id) => {
    setCurrentId(id);
    setIsEditing(true);
  };

  return (
    <>
      <div className='main'>
        <h1>Daily Expense Tracker</h1><br/>
        <p>Enter your income: <input type='number' id='in' onChange={(e) => setIncome(parseFloat(e.target.value))} /></p>
        
        {isEditing ? (
          <EditEntry
            entries={entries}
            setEntries={setEntries}
            sum={sum}
            setSum={setSum}
            income={income}
            setIncome={setIncome}
            currentId={currentId}
            setIsEditing={setIsEditing}
            setFilteredEntries={setFilteredEntries}
          />
        ) : (
          <AddEntry
            income={income}
            setIncome={setIncome}
            entries={entries}
            setEntries={setEntries}
            sum={sum}
            setSum={setSum}
            setFilteredEntries={setFilteredEntries}
          />
        )}
      </div>
      {entries.length > 0 && (
        <div className='summary-box'>
          <div className='filter'>Filter By:
            <button id='ca' onClick={filterByCategory}>Category</button>
            <button id='da' onClick={filterByDate}>Date</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(filteredEntries.length > 0 ? filteredEntries : entries).map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.category}</td>
                  <td>{entry.description}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.time}</td>
                  <td>
                    <button onClick={() => handleEdit(entry.id)}>Edit</button>
                    <button onClick={() => del(entry.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
