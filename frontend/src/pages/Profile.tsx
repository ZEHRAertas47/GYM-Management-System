import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  TextField,
  Button,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Edit,
  Save,
  FitnessCenter
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+90 555 123 4567'
  });

  const membershipInfo = {
    plan: 'Premium Plan',
    startDate: '01.01.2024',
    endDate: '01.01.2025',
    status: 'Aktif',
    remainingDays: 45
  };

  const fitnessStats = [
    { label: 'Bu Ay Giriş', value: 18, max: 30 },
    { label: 'Toplam Antrenman', value: 156, max: 200 },
    { label: 'Hedef İlerleme', value: 75, max: 100 }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        👤 Profilim
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mx: 'auto', 
                  mb: 2,
                  backgroundColor: '#1976d2',
                  fontSize: '3rem'
                }}
              >
                {user?.firstName?.charAt(0)}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Chip 
                label={user?.role === 'ADMIN' ? 'Yönetici' : 'Üye'} 
                color={user?.role === 'ADMIN' ? 'error' : 'primary'}
                sx={{ mb: 2 }}
              />
              
              <Box sx={{ textAlign: 'left', mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{user?.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">+90 555 123 4567</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {user?.role !== 'ADMIN' && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <FitnessCenter sx={{ mr: 1 }} />
                  Üyelik Bilgileri
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">Plan</Typography>
                  <Typography variant="body1" fontWeight="bold">{membershipInfo.plan}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">Durum</Typography>
                  <Chip label={membershipInfo.status} color="success" size="small" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">Kalan Gün</Typography>
                  <Typography variant="h6" color="primary">{membershipInfo.remainingDays} gün</Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Kişisel Bilgiler</Typography>
                <Button
                  startIcon={editing ? <Save /> : <Edit />}
                  onClick={() => {
                    if (editing) {
                      alert('Profil bilgileri kaydedildi!');
                    }
                    setEditing(!editing);
                  }}
                  variant={editing ? 'contained' : 'outlined'}
                >
                  {editing ? 'Kaydet' : 'Düzenle'}
                </Button>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ad"
                    value={formData.firstName}
                    disabled={!editing}
                    variant="outlined"
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Soyad"
                    value={formData.lastName}
                    disabled={!editing}
                    variant="outlined"
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="E-posta"
                    value={formData.email}
                    disabled={!editing}
                    variant="outlined"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    value={formData.phone}
                    disabled={!editing}
                    variant="outlined"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {user?.role !== 'ADMIN' && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Fitness İstatistikleri</Typography>
                {fitnessStats.map((stat, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{stat.label}</Typography>
                      <Typography variant="body2">{stat.value}/{stat.max}</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(stat.value / stat.max) * 100} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;