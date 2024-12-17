import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


const AnalyticsDashboard = () => {
  const [visitData, setVisitData] = useState([]);
  //const [pageViews, setPageViews] = useState([]);

  // Simulated data - replace with real data fetching
  useEffect(() => {
    // Simulate visit data
    const generateVisitData = () => {
      const data = [];
      for (let i = 0; i < 7; i++) {
        data.push({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
          visits: Math.floor(Math.random() * 100),
          pageViews: Math.floor(Math.random() * 500)
        });
      }
      setVisitData(data.reverse());
    };
    generateVisitData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="analytics-dashboard"> {/* Apply the CSS class */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6">Weekly Visits</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="visits" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6">User Distribution</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Active', value: 400 },
                    { name: 'Inactive', value: 300 },
                    { name: 'New', value: 200 }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {visitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AnalyticsDashboard;