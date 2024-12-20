import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import AnalyticsDashboard from './AnalyticsDashboard';
import AdminManagement from './AdminManagement';
import UsersEmails from './UsersEmails';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login'); 
  };
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login'); 
    }
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: "100px" }}>
          <Typography variant="h4" component="h1">
            Admin Dashboard
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Paper elevation={3} sx={{ mt: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Analytics" />
            <Tab label="Admin Management" />
            <Tab label="User Messages" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 && <AnalyticsDashboard />}
            {activeTab === 1 && <AdminManagement />}
            {activeTab === 2 && <UsersEmails />}
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AdminDashboard;