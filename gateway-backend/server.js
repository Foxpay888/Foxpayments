const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const upiFile = 'upi.json';

// Load UPI ID
app.get('/api/upi', (req, res) => {
  if (fs.existsSync(upiFile)) {
    const data = fs.readFileSync(upiFile);
    const json = JSON.parse(data);
    res.json({ upi: json.upi || '' });
  } else {
    res.json({ upi: '' });
  }
});

// Save UPI ID
app.post('/api/upi', (req, res) => {
  const { upi } = req.body;
  if (!upi) return res.status(400).json({ error: 'UPI is required' });

  fs.writeFileSync(upiFile, JSON.stringify({ upi }));
  res.json({ message: 'UPI saved successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});