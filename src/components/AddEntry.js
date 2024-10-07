import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddEntry = ({ income, setIncome, entries, setEntries, sum, setSum, setFilteredEntries }) => {
  const [category, setCategory] = useState('Select Category');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (income <= 0) {
      alert('Income must be set');
      return;
    }
    if (amount <= 0) {
      alert('Amount must be greater than 0.');
      return;
    }
    if (category === 'Select Category') {
      alert('Please select a category.');
      return;
    }
    const time = new Date().toLocaleString();
    const newEntry = { id: uuidv4(), category, description, amount: parseFloat(amount), time };
    setEntries([...entries, newEntry]);
    const newSum = sum + parseFloat(amount);
    const newIncome = income - parseFloat(amount);
    setSum(newSum);
    setCategory('Select Category');
    setAmount(0);
    setDescription('');
    setIncome(newIncome);
    setFilteredEntries([]); // Reset filtered entries

    if (newIncome <= 0) {
      alert('Balance is zero or less!');
      setIncome(income);
    }
  };

  return (
    <div className="form-container">
      <h3><u>Expenses</u></h3>
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
        <button onClick={handleAdd} className="add-btn">Add</button>
      </div>
    </div>
  );
};

export default AddEntry;
