import React, { useState, useEffect, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { collection, query, getDocs, deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import CircularProgress from '@mui/material/CircularProgress';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const initializeAdminCollection = useCallback(async () => {
    try {
      const adminsQuery = query(collection(db, 'admins'));
      const querySnapshot = await getDocs(adminsQuery);
      
      if (querySnapshot.empty) {
        const initialAdmin = {
          name: 'Admin User',
          email: 'admin@example.com',
          status: 'Active',
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        };

        await setDoc(doc(collection(db, 'admins')), initialAdmin);
        console.log('Admin collection initialized');
      }

      await fetchAdmins();
    } catch (error) {
      console.error('Error initializing admin collection:', error);
      setError('Error initializing admin collection: ' + error.message);
    }
  }, []);

  useEffect(() => {
    const loadAdmins = async () => {
      setLoading(true);
      await initializeAdminCollection();
    };
    
    loadAdmins();
  }, [initializeAdminCollection]);

  const fetchAdmins = async () => {
    try {
      const adminsQuery = query(collection(db, 'admins'));
      const querySnapshot = await getDocs(adminsQuery);
      
      const adminsList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lastLogin: data.lastLogin && data.lastLogin.toDate ? data.lastLogin.toDate().toLocaleString() : 'Never',
          createdAt: data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toLocaleString() : 'Unknown'
        };
      });
      
      setAdmins(adminsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('Error fetching admins: ' + error.message);
      setLoading(false);
    }
  };

  const validateInputs = () => {
    if (!newAdmin.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!newAdmin.email.trim() || !/\S+@\S+\.\S+/.test(newAdmin.email)) {
      setError('Valid email is required');
      return false;
    }
    if (!newAdmin.password || newAdmin.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleAddAdmin = async () => {
    if (!validateInputs()) return;
    
    setActionLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newAdmin.email,
        newAdmin.password
      );

      await setDoc(doc(db, 'admins', userCredential.user.uid), {
        name: newAdmin.name,
        email: newAdmin.email,
        status: 'Active',
        createdAt: serverTimestamp(),
        lastLogin: null
      });

      setSuccessMessage('Admin added successfully');
      handleCloseDialog();
      fetchAdmins();
    } catch (error) {
      setError('Error adding admin: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, 'admins', id));
      setSuccessMessage('Admin deleted successfully');
      fetchAdmins();
    } catch (error) {
      setError('Error deleting admin: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setNewAdmin({ name: '', email: '', password: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewAdmin({ name: '', email: '', password: '' });
    setError('');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ m: 2 }}
        disabled={actionLoading}
      >
        Add New Admin
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.lastLogin}</TableCell>
                <TableCell>{admin.createdAt}</TableCell>
                <TableCell>{admin.status}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleDeleteAdmin(admin.id)}
                    disabled={actionLoading}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={actionLoading}>Cancel</Button>
          <Button 
            onClick={handleAddAdmin}
            disabled={actionLoading}
          >
            {actionLoading ? <CircularProgress size={24} /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AdminManagement;