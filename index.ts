import express from 'express';
import cors from 'cors';
import prayerRoutes from './prayerRoutes';

const app = express();
const PORT = 3000;

// Enable CORS specifically for the Angular app running on localhost:4200
app.use(cors({
    origin: 'http://localhost:4200'  // Adjust this if your Angular app's URL changes
}));

app.use(express.json());
app.use('/api', prayerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

