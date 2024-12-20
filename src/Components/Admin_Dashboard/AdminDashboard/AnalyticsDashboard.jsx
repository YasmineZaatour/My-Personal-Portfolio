import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Adjust path as needed
import { 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const AnalyticsDashboard = () => {
  const [visitorData, setVisitorData] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [contactCount, setContactCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch admin count
        const adminsSnapshot = await getDocs(collection(db, 'admins'));
        setAdminCount(adminsSnapshot.size);

        // Fetch contacts count
        const contactsSnapshot = await getDocs(collection(db, 'contacts'));
        setContactCount(contactsSnapshot.size);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const data = [
      { date: '18/12 0:00', visitors: 6 },
      { date: '18/12 13:00', visitors: 3 },
      { date: '18/12 16:00', visitors: 1 },
      { date: '18/12 17:00', visitors: 2 },
      { date: '18/12 18:00', visitors: 2 },
      { date: '18/12 19:00', visitors: 11 },
      { date: '19/12 20:15', visitors: 3 },
      { date: '20/12 11:00', visitors: 6 },
      { date: '20/12 11:15', visitors: 1 },
      { date: '20/12 11:45', visitors: 1 },
      { date: '20/12 14:30', visitors: 2 },
      { date: '20/12 16:15', visitors: 2 },
      { date: '20/12 19:45', visitors: 2 },
      { date: '21/12 9:00', visitors: 3 },
      { date: '21/12 9:41', visitors: 1 }
    ];
    
    // Calculate total visitors
    const total = data.reduce((sum, item) => sum + item.visitors, 0);
    setTotalVisitors(total);
    setVisitorData(data);
  }, []);

  return (
    <div className="analytics-dashboard" style={{ padding: '20px' }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, bgcolor: '#e3f2fd' }}>
            <Typography variant="h6" gutterBottom>
              Total Visitors
            </Typography>
            <Typography variant="h3" component="div">
              {totalVisitors}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, bgcolor: '#f3e5f5' }}>
            <Typography variant="h6" gutterBottom>
              Total Admins
            </Typography>
            <Typography variant="h3" component="div">
              {adminCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, bgcolor: '#e8f5e9' }}>
            <Typography variant="h6" gutterBottom>
              Contact Messages
            </Typography>
            <Typography variant="h3" component="div">
              {contactCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, height: 800 }}>
            <Typography variant="h6" gutterBottom>
              Visitor Growth Over Time
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart 
                data={visitorData}
                margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  label={{ 
                    value: 'Visitors', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#2196f3"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AnalyticsDashboard;