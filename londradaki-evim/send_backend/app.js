const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Veritabanı bağlantı dosyası

const app = express();

// CORS ayarları
app.use(cors());

// JSON verilerini işleme
app.use(express.json());

// Veritabanı bağlantısını oluştur
let db;
(async () => {
  db = await connectDB();
})();

// Kullanıcı rotaları
app.use('/api/users', require('./routes/userRoutes'));

// Örnek bir sorgu çalıştırma (isteğe bağlı, test amaçlı)
app.get('/api/test-db', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM table_name');
    res.json(results);
  } catch (err) {
    console.error('Error executing query:', err.message);
    res.status(500).send('Server Error');
  }
});

// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
