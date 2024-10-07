import React, { useState, useEffect } from 'react';

const EditEntry = ({ entries, setEntries, sum, setSum, income, setIncome, currentId, setIsEditing, setFilteredEntries }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentId !== null) {
      const entry = entries.find(entry => entry.id === currentId);
      setCategory(entry.category);
      setAmount(entry.amount);
      setDescription(entry.description);
    }
  }, [currentId, entries]);

  const saveEdit = () => {
    const updatedEntries = entries.map(entry => {
      if (entry.id === currentId) {
        const newEntry = { ...entry, category, amount: parseFloat(amount), description };
        const newSum = sum - entry.amount + newEntry.amount;
        const newIncome = income + entry.amount - newEntry.amount;
        setSum(newSum);
        setIncome(newIncome);
        return newEntry;
      }
      return entry;
    });

    setEntries(updatedEntries);
    setCategory('Select Category');
    setAmount(0);
    setDescription('');
    setIsEditing(false);
    setFilteredEntries([]); // Reset filtered entries
  };

  return (
    <div className="form-container">
      <h3><u>Edit Expense</u></h3>
      <label htmlFor="cat">Choose a category:</label>
      <select name="cat" id="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Select Category">Select Category</option>
        <option value="Grocery">Grocery</option>
        <option value="Clothing">Clothing</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <p>Amount spent: <input id='am' type='number' value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} /></p>
      <p>Description: <br/><textarea value={description} onChange={(e) => setDescription(e.target.value)} /></p>
      <div className="button-container">
        <button onClick={saveEdit} className="add-btn">Save</button>
        <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default EditEntry;
