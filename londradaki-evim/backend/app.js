const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Veritabanı bağlantı dosyası

const app = express();

// CORS ayarları
app.use(cors());

// JSON verilerini işleme
app.use(express.json());

// Kullanıcı rotaları
app.use('/api/users', require('./routes/userRoutes'));

// Sunucuyu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
