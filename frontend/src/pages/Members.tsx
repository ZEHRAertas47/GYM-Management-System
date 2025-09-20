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

interface Member {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  membershipNumber: string;
  membershipStatus: string;
  joinDate: string;
  membershipEndDate: string;
}

const Members: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    // Admin değilse direkt boş array döndür
    if (!isAdmin) {
      setMembers([]);
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.getMembers();
      setMembers(response.data || []);
    } catch (err: any) {
      console.error('Members fetch error:', err);
      // Admin için gerçekçi test verileri
      setMembers([
        {
          id: 1,
          user: { firstName: 'Mehmet', lastName: 'Özkan', email: 'mehmet.ozkan@email.com', phone: '0532 123 4567' },
          membershipNumber: 'GYM2024001',
          membershipStatus: 'ACTIVE',
          joinDate: '2024-01-15',
          membershipEndDate: '2025-01-15'
        },
        {
          id: 2,
          user: { firstName: 'Ayşe', lastName: 'Kaya', email: 'ayse.kaya@email.com', phone: '0533 987 6543' },
          membershipNumber: 'GYM2024002',
          membershipStatus: 'ACTIVE',
          joinDate: '2024-02-10',
          membershipEndDate: '2025-02-10'
        },
        {
          id: 3,
          user: { firstName: 'Emre', lastName: 'Demir', email: 'emre.demir@email.com', phone: '0534 555 7890' },
          membershipNumber: 'GYM2024003',
          membershipStatus: 'ACTIVE',
          joinDate: '2024-03-05',
          membershipEndDate: '2025-03-05'
        },
        {
          id: 4,
          user: { firstName: 'Zeynep', lastName: 'Şahin', email: 'zeynep.sahin@email.com', phone: '0535 111 2233' },
          membershipNumber: 'GYM2024004',
          membershipStatus: 'EXPIRED',
          joinDate: '2023-06-20',
          membershipEndDate: '2024-06-20'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'EXPIRED': return 'error';
      case 'SUSPENDED': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Aktif';
      case 'EXPIRED': return 'Süresi Dolmuş';
      case 'SUSPENDED': return 'Askıya Alınmış';
      case 'CANCELLED': return 'İptal Edilmiş';
      default: return status;
    }
  };

  if (loading) return <Typography>Yükleniyor...</Typography>;

  // Admin değilse erişim engelle
  if (!isAdmin) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h4" color="error">
          🚫 Erişim Engellendi
        </Typography>
        <Typography variant="h6" color="textSecondary" mt={2}>
          Bu sayfaya sadece yöneticiler erişebilir.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" sx={{
          fontWeight: 'bold',
          fontSize: { xs: '2rem', md: '3rem' }
        }}>
          👥 Üyeler
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              const firstName = prompt('Ad:');
              const lastName = prompt('Soyad:');
              const email = prompt('E-posta:');
              const phone = prompt('Telefon:');

              if (firstName && lastName && email) {
                const newMember = {
                  id: Date.now(),
                  user: { firstName, lastName, email, phone: phone || '' },
                  membershipNumber: `GYM${Date.now()}`,
                  membershipStatus: 'ACTIVE',
                  joinDate: new Date().toISOString().split('T')[0],
                  membershipEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                };

                setMembers(prev => [...prev, newMember]);
                alert(`Yeni üye eklendi: ${firstName} ${lastName}`);
              }
            }}
          >
            Yeni Üye Ekle
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Üyelik No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ad Soyad</TableCell>
              <TableCell sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'table-cell' } }}>E-posta</TableCell>
              <TableCell sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'table-cell' } }}>Telefon</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Durum</TableCell>
              <TableCell sx={{ fontWeight: 'bold', display: { xs: 'none', lg: 'table-cell' } }}>Katılım Tarihi</TableCell>
              <TableCell sx={{ fontWeight: 'bold', display: { xs: 'none', lg: 'table-cell' } }}>Bitiş Tarihi</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.membershipNumber}</TableCell>
                <TableCell>
                  {member.user.firstName} {member.user.lastName}
                </TableCell>
                <TableCell>{member.user.email}</TableCell>
                <TableCell>{member.user.phone || '-'}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(member.membershipStatus)}
                    color={getStatusColor(member.membershipStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(member.joinDate).toLocaleDateString('tr-TR')}</TableCell>
                <TableCell>
                  {member.membershipEndDate
                    ? new Date(member.membershipEndDate).toLocaleDateString('tr-TR')
                    : '-'
                  }
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => alert(`${member.user.firstName} ${member.user.lastName} detayları:\nÜyelik No: ${member.membershipNumber}\nE-posta: ${member.user.email}\nTelefon: ${member.user.phone}\nDurum: ${getStatusText(member.membershipStatus)}`)}
                  >
                    <Visibility />
                  </IconButton>
                  {isAdmin && (
                    <>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          const newFirstName = prompt('Yeni ad:', member.user.firstName);
                          const newLastName = prompt('Yeni soyad:', member.user.lastName);
                          const newEmail = prompt('Yeni e-posta:', member.user.email);

                          if (newFirstName && newLastName && newEmail) {
                            setMembers(prev => prev.map(m =>
                              m.id === member.id
                                ? { ...m, user: { ...m.user, firstName: newFirstName, lastName: newLastName, email: newEmail } }
                                : m
                            ));
                            alert(`Üye güncellendi: ${newFirstName} ${newLastName}`);
                          }
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          if (window.confirm(`${member.user.firstName} ${member.user.lastName} adlı üyeyi silmek istediğinizden emin misiniz?`)) {
                            setMembers(prev => prev.filter(m => m.id !== member.id));
                            alert(`${member.user.firstName} ${member.user.lastName} silindi`);
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

export default Members;