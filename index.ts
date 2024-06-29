import express from 'express';
import prayerRoutes from './prayerRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', prayerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
