import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import ReactGA from 'react-ga4';

// Initialize Google Analytics
ReactGA.initialize('YOUR-GA4-MEASUREMENT-ID');

const AnalyticsDashboard = () => {
  const [visitData, setVisitData] = useState([]);
  const [pageViews, setPageViews] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [buttonClicks, setButtonClicks] = useState([]);

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

  useEffect(() => {
    // Fetch real-time analytics data
    const fetchAnalyticsData = async () => {
      try {
        // Get page views data
        const viewsData = await ReactGA.get('pageviews');
        setPageViews(viewsData.rows.map(row => ({
          date: row[0],
          views: parseInt(row[1])
        })));

        // Get top pages
        const pagesData = await ReactGA.get('ga:pageviews', {
          dimensions: 'ga:pagePath',
          sort: '-ga:pageviews',
          'max-results': 5
        });
        setTopPages(pagesData.rows.map(row => ({
          page: row[0],
          views: parseInt(row[1])
        })));

        // Get button clicks (requires custom event tracking)
        const clicksData = await ReactGA.get('ga:totalEvents', {
          dimensions: 'ga:eventLabel',
          filters: 'ga:eventCategory==Button',
          sort: '-ga:totalEvents',
          'max-results': 5
        });
        setButtonClicks(clicksData.rows.map(row => ({
          button: row[0],
          clicks: parseInt(row[1])
        })));
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchAnalyticsData, 300000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="analytics-dashboard"> {/* Apply the CSS class */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6">Page Views Over Time</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={pageViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6">Top Pages</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={topPages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="page" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Most Clicked Buttons</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={buttonClicks} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number"/>
                <YAxis dataKey="button" type="category"/>
                <Tooltip />
                <Bar dataKey="clicks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AnalyticsDashboard;