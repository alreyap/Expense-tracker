import React, { useState } from 'react';

export const Basic = () => {
  const [income, setIncome] = useState(0);
  const [category, setCategory] = useState('Grocery');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [entries, setEntries] = useState([]);
  const [sum, setSum] = useState(0);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAdd = () => {
    if (income <= 0) {
      alert('Income must be set ');
      return;
    }
    if (amount <= 0) {
      alert('Amount must be greater than 0.');
      return;
    }
    const time = new Date().toLocaleString();
    const newEntry = { category, description, amount: parseFloat(amount), time };
    setEntries([...entries, newEntry]);
    const newSum = sum + parseFloat(amount);
    const newIncome = income - parseFloat(amount);
    setSum(newSum);
    setCategory('Grocery');
    setAmount(0);
    setDescription('');
    setIncome(newIncome);

    if (newIncome <= 0) {
      alert('Balance is zero or less!');
      setIncome(income);
    }
  };

  const filterByDate = () => {
    const sortedEntries = [...entries].sort((a, b) => new Date(a.time) - new Date(b.time));
    setFilteredEntries(sortedEntries);
  };

  const filterByCategory = () => {
    const sortedEntries = [...entries].sort((a, b) => a.category.localeCompare(b.category));
    setFilteredEntries(sortedEntries);
  };

  const del = (index) => {
    const entryToDelete = entries[index];
    const arr = [...entries.slice(0, index), ...entries.slice(index + 1)];
    setEntries(arr);
    setIncome(income + entryToDelete.amount); 
    setSum(sum - entryToDelete.amount); 
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setCategory(entry.category);
    setAmount(entry.amount);
    setDescription(entry.description);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const saveEdit = () => {
    const updatedEntries = [...entries];
    const oldEntry = updatedEntries[currentIndex];
    const newEntry = { ...oldEntry, category, amount: parseFloat(amount), description };
    updatedEntries[currentIndex] = newEntry;

    const newSum = sum - oldEntry.amount + newEntry.amount;
    const newIncome = income + oldEntry.amount - newEntry.amount;

    setEntries(updatedEntries);
    setSum(newSum);
    setIncome(newIncome);
    setCategory('Grocery');
    setAmount(0);
    setDescription('');
    setIsEditing(false);
    setCurrentIndex(null);
  };

  return (
    <>
      <div className='main'>
        <h1>Daily Expense Tracker</h1><br/>
        <p>Enter your income: <input type='number' onChange={(e) => setIncome(parseFloat(e.target.value))} /></p>
        
        <h3><u>Expenses</u></h3>
        <label htmlFor="cat">Choose a category:</label>
        <select name="cat" id="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Grocery">Grocery</option>
          <option value="Clothing">Clothing</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <p>Amount spent: <input id='am' type='number' value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} /></p>
        <p>Description: <br/><textarea value={description} onChange={(e) => setDescription(e.target.value)} /></p>
        <button onClick={isEditing ? saveEdit : handleAdd} id='addbtn'>{isEditing ? 'Save' : 'Add'}</button>
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
              {(filteredEntries.length > 0 ? filteredEntries : entries).map((entry, index) => (
                <tr key={index}>
                  <td>{entry.category}</td>
                  <td>{entry.description}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.time}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => del(index)}>Delete</button>
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
