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

interface MembershipPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  accessHours: string;
  includesPersonalTrainer: boolean;
  includesGroupClasses: boolean;
  active: boolean;
}

const MembershipPlans: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await apiService.getMembershipPlans();
      setPlans(response.data);
    } catch (err: any) {
      // 3 Gerçekçi üyelik planı
      setPlans([
        {
          id: 1,
          name: 'Standart Üyelik',
          description: 'Tüm kardiyovasküler ve güç antrenmanı ekipmanlarına erişim. Soyunma odası ve duş imkanı dahil.',
          price: 299,
          durationMonths: 1,
          accessHours: '06:00-23:00',
          includesPersonalTrainer: false,
          includesGroupClasses: true,
          active: true
        },
        {
          id: 2,
          name: 'Premium Üyelik',
          description: '24/7 erişim, tüm grup dersleri (Yoga, Pilates, Zumba), sauna ve buhar odası kullanımı dahil.',
          price: 449,
          durationMonths: 1,
          accessHours: '24/7',
          includesPersonalTrainer: false,
          includesGroupClasses: true,
          active: true
        },
        {
          id: 3,
          name: 'VIP Platinum',
          description: 'Aylık 4 kişisel antrenör seansı, beslenme danışmanlığı, havuz erişimi ve tüm premium hizmetler.',
          price: 699,
          durationMonths: 1,
          accessHours: '24/7',
          includesPersonalTrainer: true,
          includesGroupClasses: true,
          active: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Typography>Yükleniyor...</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">💳 Üyelik Planları</Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              const name = prompt('Plan Adı:');
              const description = prompt('Açıklama:');
              const price = prompt('Fiyat (₺):');
              const duration = prompt('Süre (ay):');
              const accessHours = prompt('Erişim Saatleri:');
              
              if (name && description && price && duration && accessHours) {
                const newPlan = {
                  id: Date.now(),
                  name,
                  description,
                  price: parseFloat(price),
                  durationMonths: parseInt(duration),
                  accessHours,
                  includesPersonalTrainer: false,
                  includesGroupClasses: true,
                  active: true
                };
                
                setPlans(prev => [...prev, newPlan]);
                alert(`Yeni plan eklendi: ${name}`);
              }
            }}
          >
            Yeni Plan Ekle
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Plan Adı</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell>Süre (Ay)</TableCell>
              <TableCell>Erişim Saatleri</TableCell>
              <TableCell>Kişisel Antrenör</TableCell>
              <TableCell>Grup Dersleri</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.description || '-'}</TableCell>
                <TableCell>₺{plan.price}</TableCell>
                <TableCell>{plan.durationMonths}</TableCell>
                <TableCell>{plan.accessHours || '24/7'}</TableCell>
                <TableCell>
                  <Chip
                    label={plan.includesPersonalTrainer ? 'Dahil' : 'Dahil Değil'}
                    color={plan.includesPersonalTrainer ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={plan.includesGroupClasses ? 'Dahil' : 'Dahil Değil'}
                    color={plan.includesGroupClasses ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={plan.active ? 'Aktif' : 'Pasif'}
                    color={plan.active ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => {
                      alert(`${plan.name} detayları:\nAçıklama: ${plan.description}\nFiyat: ₺${plan.price}\nSüre: ${plan.durationMonths} ay\nErişim: ${plan.accessHours}\nKişisel Antrenör: ${plan.includesPersonalTrainer ? 'Dahil' : 'Dahil Değil'}\nGrup Dersleri: ${plan.includesGroupClasses ? 'Dahil' : 'Dahil Değil'}`);
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
                          const newName = prompt('Yeni plan adı:', plan.name);
                          const newDescription = prompt('Yeni açıklama:', plan.description);
                          const newPrice = prompt('Yeni fiyat:', plan.price.toString());
                          
                          if (newName && newDescription && newPrice) {
                            setPlans(prev => prev.map(p => 
                              p.id === plan.id 
                                ? { ...p, name: newName, description: newDescription, price: parseFloat(newPrice) }
                                : p
                            ));
                            alert(`Plan güncellendi: ${newName}`);
                          }
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => {
                          if (window.confirm(`${plan.name} adlı planı silmek istediğinizden emin misiniz?`)) {
                            setPlans(prev => prev.filter(p => p.id !== plan.id));
                            alert(`${plan.name} silindi`);
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

export default MembershipPlans;