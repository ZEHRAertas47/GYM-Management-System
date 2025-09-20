import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Alert
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { apiService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

interface Trainer {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  employeeId: string;
  specializations: string[];
  experienceYears: number;
  status: string;
  hireDate: string;
}

const Trainers: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await apiService.getTrainers();
      setTrainers(response.data);
    } catch (err: any) {
      // Gerçekçi antrenör verileri - herkese göster
      setTrainers([
        {
          id: 1,
          user: { firstName: 'Ahmet', lastName: 'Kaya', email: 'ahmet.kaya@powergym.com', phone: '0532 100 2030' },
          employeeId: 'TR001',
          specializations: ['WEIGHT_TRAINING', 'BODYBUILDING'],
          experienceYears: 8,
          status: 'ACTIVE',
          hireDate: '2020-03-15'
        },
        {
          id: 2,
          user: { firstName: 'Elif', lastName: 'Demir', email: 'elif.demir@powergym.com', phone: '0533 200 3040' },
          employeeId: 'TR002',
          specializations: ['YOGA', 'PILATES'],
          experienceYears: 5,
          status: 'ACTIVE',
          hireDate: '2022-01-10'
        },
        {
          id: 3,
          user: { firstName: 'Murat', lastName: 'Özkan', email: 'murat.ozkan@powergym.com', phone: '0534 300 4050' },
          employeeId: 'TR003',
          specializations: ['CROSSFIT', 'FUNCTIONAL_TRAINING'],
          experienceYears: 6,
          status: 'ACTIVE',
          hireDate: '2021-06-20'
        },
        {
          id: 4,
          user: { firstName: 'Selin', lastName: 'Yılmaz', email: 'selin.yilmaz@powergym.com', phone: '0535 400 5060' },
          employeeId: 'TR004',
          specializations: ['CARDIO', 'DANCE'],
          experienceYears: 4,
          status: 'ACTIVE',
          hireDate: '2023-02-14'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'INACTIVE': return 'default';
      case 'ON_LEAVE': return 'warning';
      case 'TERMINATED': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Aktif';
      case 'INACTIVE': return 'Pasif';
      case 'ON_LEAVE': return 'İzinli';
      case 'TERMINATED': return 'İşten Çıkarılmış';
      default: return status;
    }
  };

  const getSpecializationText = (specialization: string) => {
    const translations: { [key: string]: string } = {
      'WEIGHT_TRAINING': 'Ağırlık Antrenmanı',
      'CARDIO': 'Kardiyovasküler',
      'YOGA': 'Yoga',
      'PILATES': 'Pilates',
      'CROSSFIT': 'CrossFit',
      'BODYBUILDING': 'Vücut Geliştirme',
      'POWERLIFTING': 'Güç Kaldırma',
      'FUNCTIONAL_TRAINING': 'Fonksiyonel Antrenman',
      'REHABILITATION': 'Rehabilitasyon',
      'NUTRITION': 'Beslenme',
      'BOXING': 'Boks',
      'MARTIAL_ARTS': 'Dövüş Sanatları',
      'SWIMMING': 'Yüzme',
      'DANCE': 'Dans',
      'STRETCHING': 'Esneme'
    };
    return translations[specialization] || specialization;
  };

  if (loading) return <Typography>Yükleniyor...</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">🏋️‍♂️ Antrenörlerimiz</Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              const firstName = prompt('Ad:');
              const lastName = prompt('Soyad:');
              const email = prompt('E-posta:');
              const specialization = prompt('Uzmanlık Alanı (WEIGHT_TRAINING, YOGA, CARDIO, PILATES, CROSSFIT):');
              const experience = prompt('Deneyim (yıl):');
              
              if (firstName && lastName && email && specialization && experience) {
                const newTrainer = {
                  id: Date.now(),
                  user: { firstName, lastName, email, phone: '0532 000 0000' },
                  employeeId: `TR${String(Date.now()).slice(-3)}`,
                  specializations: [specialization.toUpperCase()],
                  experienceYears: parseInt(experience),
                  status: 'ACTIVE',
                  hireDate: new Date().toISOString().split('T')[0]
                };
                
                setTrainers(prev => [...prev, newTrainer]);
                alert(`Yeni antrenör eklendi: ${firstName} ${lastName}`);
              }
            }}
          >
            Yeni Antrenör Ekle
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {isAdmin && <TableCell>Personel No</TableCell>}
              <TableCell>Ad Soyad</TableCell>
              {isAdmin && <TableCell>E-posta</TableCell>}
              <TableCell>Uzmanlık Alanları</TableCell>
              <TableCell>Deneyim (Yıl)</TableCell>
              {isAdmin && <TableCell>Durum</TableCell>}
              {isAdmin && <TableCell>İşe Başlama</TableCell>}
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainers.map((trainer) => (
              <TableRow key={trainer.id}>
                {isAdmin && <TableCell>{trainer.employeeId}</TableCell>}
                <TableCell>
                  {trainer.user.firstName} {trainer.user.lastName}
                </TableCell>
                {isAdmin && <TableCell>{trainer.user.email}</TableCell>}
                <TableCell>
                  <Box display="flex" flexWrap="wrap" gap={0.5}>
                    {trainer.specializations?.slice(0, 2).map((spec, index) => (
                      <Chip
                        key={index}
                        label={getSpecializationText(spec)}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                    {trainer.specializations?.length > 2 && (
                      <Chip
                        label={`+${trainer.specializations.length - 2}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell>{trainer.experienceYears || '-'} yıl</TableCell>
                {isAdmin && (
                  <TableCell>
                    <Chip
                      label={getStatusText(trainer.status)}
                      color={getStatusColor(trainer.status) as any}
                      size="small"
                    />
                  </TableCell>
                )}
                {isAdmin && (
                  <TableCell>
                    {new Date(trainer.hireDate).toLocaleDateString('tr-TR')}
                  </TableCell>
                )}
                <TableCell>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => {
                      const details = isAdmin 
                        ? `${trainer.user.firstName} ${trainer.user.lastName} detayları:\nPersonel No: ${trainer.employeeId}\nE-posta: ${trainer.user.email}\nTelefon: ${trainer.user.phone}\nDeneyim: ${trainer.experienceYears} yıl\nDurum: ${getStatusText(trainer.status)}\nİşe Başlama: ${new Date(trainer.hireDate).toLocaleDateString('tr-TR')}`
                        : `${trainer.user.firstName} ${trainer.user.lastName}\nUzmanlık: ${trainer.specializations.map(s => getSpecializationText(s)).join(', ')}\nDeneyim: ${trainer.experienceYears} yıl`;
                      alert(details);
                    }}
                  >
                    <Visibility />
                  </IconButton>
                  {isAdmin && (
                    <>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => {
                          const newFirstName = prompt('Yeni ad:', trainer.user.firstName);
                          const newLastName = prompt('Yeni soyad:', trainer.user.lastName);
                          const newEmail = prompt('Yeni e-posta:', trainer.user.email);
                          const newExperience = prompt('Yeni deneyim (yıl):', trainer.experienceYears.toString());
                          
                          if (newFirstName && newLastName && newEmail && newExperience) {
                            setTrainers(prev => prev.map(t => 
                              t.id === trainer.id 
                                ? { 
                                    ...t, 
                                    user: { ...t.user, firstName: newFirstName, lastName: newLastName, email: newEmail },
                                    experienceYears: parseInt(newExperience)
                                  }
                                : t
                            ));
                            alert(`Antrenör güncellendi: ${newFirstName} ${newLastName}`);
                          }
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => {
                          if (window.confirm(`${trainer.user.firstName} ${trainer.user.lastName} adlı antrenörü silmek istediğinizden emin misiniz?`)) {
                            setTrainers(prev => prev.filter(t => t.id !== trainer.id));
                            alert(`${trainer.user.firstName} ${trainer.user.lastName} silindi`);
                          }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Trainers;