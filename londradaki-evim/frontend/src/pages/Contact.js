import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './Contact.css';

const Contact = () => {
  const [open, setOpen] = useState(false);

  const handleWhatsAppClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" className="contact-container">
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Box component="form" noValidate autoComplete="off" className="contact-form">
        <TextField label="Name" variant="outlined" fullWidth margin="normal" />
        <TextField label="Email" variant="outlined" fullWidth margin="normal" />
        <TextField label="Message" variant="outlined" fullWidth margin="normal" multiline rows={4} />
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px">
          <Button
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
            style={{ borderRadius: '10px' }}
            onClick={handleWhatsAppClick}
          >
            Contact us on WhatsApp
          </Button>
          <Button variant="contained" color="primary" style={{ borderRadius: '10px' }}>
            Send Message
          </Button>
        </Box>
      </Box>
      <Box className="contact-alternatives">
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          For alternative contact, email us at: info@example.com
        </Typography>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>WhatsApp İletişim</DialogTitle>
        <DialogContent>
          <Typography>
            Şu an için mevcut bir operatör bulunmuyor. İletişim için bize şu email adresinden ulaşabilirsiniz: info@example.com
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{ borderRadius: '10px' }}>
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Contact;
