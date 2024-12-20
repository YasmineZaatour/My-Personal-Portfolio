import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Email, AccessTime } from '@mui/icons-material';

const UsersEmails = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contactsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      }));
      setContacts(contactsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Contact Form Submissions
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {contact.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Send email">
                      <IconButton size="small" href={`mailto:${contact.email}`}>
                        <Email fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {contact.email}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={contact.subject} 
                    size="small" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                    <Tooltip title={contact.message} placement="top">
                        <Typography
                        variant="body2"
                        sx={{
                            maxWidth: 400,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            cursor: 'pointer' // Add cursor pointer to indicate hoverable
                        }}
                        >
                        {contact.message}
                        </Typography>
                    </Tooltip>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime fontSize="small" />
                    {contact.timestamp?.toLocaleString()}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersEmails;
