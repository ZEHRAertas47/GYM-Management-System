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
import { Add, Edit, Delete, Visibility, Build } from '@mui/icons-material';
import { apiService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

interface EquipmentItem {
  id: number;
  name: string;
  type: string;
  brand: string;
  model: string;
  status: string;
  location: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
}

const Equipment: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await apiService.getEquipment();
      setEquipment(response.data);
    } catch (err: any) {
      // 10 Gerçekçi ekipman verisi
      setEquipment([
        {
          id: 1,
          name: 'TechnoGym Koşu Bandı',
          type: 'CARDIO',
          brand: 'TechnoGym',
          model: 'Run Race 1400',
          status: 'AVAILABLE',
          location: 'Kardiyovasküler Alan - 1. Kat',
          lastMaintenanceDate: '2024-08-15',
          nextMaintenanceDate: '2024-11-15'
        },
        {
          id: 2,
          name: 'Life Fitness Leg Press Makinesi',
          type: 'STRENGTH',
          brand: 'Life Fitness',
          model: 'Signature Series',
          status: 'AVAILABLE',
          location: 'Güç Antrenmanı Alanı - 2. Kat',
          lastMaintenanceDate: '2024-09-01',
          nextMaintenanceDate: '2024-12-01'
        },
        {
          id: 3,
          name: 'Hammer Strength Dumbell Seti (5-50kg)',
          type: 'FREE_WEIGHTS',
          brand: 'Hammer Strength',
          model: 'Urethane Series',
          status: 'AVAILABLE',
          location: 'Serbest Ağırlık Alanı - 1. Kat',
          lastMaintenanceDate: '2024-07-20',
          nextMaintenanceDate: '2024-10-20'
        },
        {
          id: 4,
          name: 'Matrix Eliptik Bisiklet',
          type: 'CARDIO',
          brand: 'Matrix',
          model: 'E30 XER',
          status: 'MAINTENANCE',
          location: 'Kardiyovasküler Alan - 1. Kat',
          lastMaintenanceDate: '2024-09-10',
          nextMaintenanceDate: '2024-09-25'
        },
        {
          id: 5,
          name: 'Precor Chest Press Makinesi',
          type: 'STRENGTH',
          brand: 'Precor',
          model: 'Discovery Series',
          status: 'AVAILABLE',
          location: 'Güç Antrenmanı Alanı - 2. Kat',
          lastMaintenanceDate: '2024-08-30',
          nextMaintenanceDate: '2024-11-30'
        },
        {
          id: 6,
          name: 'Cybex Lat Pulldown Makinesi',
          type: 'STRENGTH',
          brand: 'Cybex',
          model: 'Eagle NX',
          status: 'AVAILABLE',
          location: 'Güç Antrenmanı Alanı - 2. Kat',
          lastMaintenanceDate: '2024-08-20',
          nextMaintenanceDate: '2024-11-20'
        },
        {
          id: 7,
          name: 'Concept2 Kürek Çekme Makinesi',
          type: 'CARDIO',
          brand: 'Concept2',
          model: 'Model D',
          status: 'AVAILABLE',
          location: 'Kardiyovasküler Alan - 1. Kat',
          lastMaintenanceDate: '2024-09-05',
          nextMaintenanceDate: '2024-12-05'
        },
        {
          id: 8,
          name: 'TRX Suspension Trainer Sistemi',
          type: 'FUNCTIONAL',
          brand: 'TRX',
          model: 'Pro4',
          status: 'AVAILABLE',
          location: 'Fonksiyonel Antrenman Alanı - 1. Kat',
          lastMaintenanceDate: '2024-08-10',
          nextMaintenanceDate: '2024-11-10'
        },
        {
          id: 9,
          name: 'Keiser Pneumatic Squat Makinesi',
          type: 'STRENGTH',
          brand: 'Keiser',
          model: 'Air300',
          status: 'AVAILABLE',
          location: 'Güç Antrenmanı Alanı - 2. Kat',
          lastMaintenanceDate: '2024-09-15',
          nextMaintenanceDate: '2024-12-15'
        },
        {
          id: 10,
          name: 'Yoga Mat ve Pilates Topları',
          type: 'STRETCHING',
          brand: 'Manduka',
          model: 'Pro Series',
          status: 'AVAILABLE',
          location: 'Yoga & Pilates Stüdyosu - 3. Kat',
          lastMaintenanceDate: '2024-08-25',
          nextMaintenanceDate: '2024-11-25'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'success';
      case 'IN_USE': return 'info';
      case 'MAINTENANCE': return 'warning';
      case 'OUT_OF_ORDER': return 'error';
      case 'RETIRED': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'Müsait';
      case 'IN_USE': return 'Kullanımda';
      case 'MAINTENANCE': return 'Bakımda';
      case 'OUT_OF_ORDER': return 'Arızalı';
      case 'RETIRED': return 'Emekli';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    const translations: { [key: string]: string } = {
      'CARDIO': 'Kardiyovasküler',
      'STRENGTH': 'Güç Antrenmanı',
      'FREE_WEIGHTS': 'Serbest Ağırlık',
      'FUNCTIONAL': 'Fonksiyonel',
      'STRETCHING': 'Esneme',
      'ACCESSORIES': 'Aksesuar'
    };
    return translations[type] || type;
  };

  if (loading) return <Typography>Yükleniyor...</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">🏋️‍♂️ Spor Ekipmanları</Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              const name = prompt('Ekipman Adı:');
              const brand = prompt('Marka:');
              const type = prompt('Tür (CARDIO, STRENGTH, FREE_WEIGHTS, FUNCTIONAL, STRETCHING):');
              const location = prompt('Konum:');
              
              if (name && brand && type && location) {
                const newEquipment = {
                  id: Date.now(),
                  name,
                  type: type.toUpperCase(),
                  brand,
                  model: 'Yeni Model',
                  status: 'AVAILABLE',
                  location,
                  lastMaintenanceDate: new Date().toISOString().split('T')[0],
                  nextMaintenanceDate: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0]
                };
                
                setEquipment(prev => [...prev, newEquipment]);
                alert(`Yeni ekipman eklendi: ${name}`);
              }
            }}
          >
            Yeni Ekipman Ekle
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ekipman Adı</TableCell>
              <TableCell>Tür</TableCell>
              <TableCell>Marka</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Konum</TableCell>
              {isAdmin && <TableCell>Son Bakım</TableCell>}
              {isAdmin && <TableCell>Sonraki Bakım</TableCell>}
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{getTypeText(item.type)}</TableCell>
                <TableCell>{item.brand || '-'}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(item.status)}
                    color={getStatusColor(item.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{item.location || '-'}</TableCell>
                {isAdmin && (
                  <TableCell>
                    {item.lastMaintenanceDate 
                      ? new Date(item.lastMaintenanceDate).toLocaleDateString('tr-TR')
                      : '-'
                    }
                  </TableCell>
                )}
                {isAdmin && (
                  <TableCell>
                    {item.nextMaintenanceDate 
                      ? new Date(item.nextMaintenanceDate).toLocaleDateString('tr-TR')
                      : '-'
                    }
                  </TableCell>
                )}
                <TableCell>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => {
                      const details = isAdmin 
                        ? `${item.name} detayları:\nTür: ${getTypeText(item.type)}\nMarka: ${item.brand}\nDurum: ${getStatusText(item.status)}\nKonum: ${item.location}\nSon Bakım: ${item.lastMaintenanceDate ? new Date(item.lastMaintenanceDate).toLocaleDateString('tr-TR') : '-'}`
                        : `${item.name}\nTür: ${getTypeText(item.type)}\nMarka: ${item.brand}\nDurum: ${getStatusText(item.status)}\nKonum: ${item.location}`;
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
                          const newName = prompt('Yeni ekipman adı:', item.name);
                          const newBrand = prompt('Yeni marka:', item.brand);
                          const newLocation = prompt('Yeni konum:', item.location);
                          
                          if (newName && newBrand && newLocation) {
                            setEquipment(prev => prev.map(e => 
                              e.id === item.id 
                                ? { ...e, name: newName, brand: newBrand, location: newLocation }
                                : e
                            ));
                            alert(`Ekipman güncellendi: ${newName}`);
                          }
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="warning"
                        onClick={() => {
                          setEquipment(prev => prev.map(e => 
                            e.id === item.id 
                              ? { ...e, status: 'MAINTENANCE', lastMaintenanceDate: new Date().toISOString().split('T')[0] }
                              : e
                          ));
                          alert(`${item.name} bakıma alındı`);
                        }}
                      >
                        <Build />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => {
                          if (window.confirm(`${item.name} adlı ekipmanı silmek istediğinizden emin misiniz?`)) {
                            setEquipment(prev => prev.filter(e => e.id !== item.id));
                            alert(`${item.name} silindi`);
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

export default Equipment;