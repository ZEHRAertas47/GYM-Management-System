import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  People,
  SportsGymnastics,
  FitnessCenter,
  TrendingUp,
  LocalFireDepartment,
  Schedule,
  MonetizationOn
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const stats = [
    {
      title: 'Toplam Üye',
      value: '1,234',
      icon: <People fontSize="large" />,
      color: '#FF6B35',
      change: '+12%',
      description: 'Bu ay yeni üyeler'
    },
    {
      title: 'Aktif Antrenör',
      value: '45',
      icon: <SportsGymnastics fontSize="large" />,
      color: '#4ECDC4',
      change: '+5%',
      description: 'Profesyonel eğitmenler'
    },
    {
      title: 'Ekipman Sayısı',
      value: '156',
      icon: <FitnessCenter fontSize="large" />,
      color: '#45B7D1',
      change: '+8%',
      description: 'Modern fitness ekipmanları'
    },
    {
      title: isAdmin ? 'Aylık Gelir' : 'Aktif Üyelik',
      value: isAdmin ? '₺45,678' : 'Premium',
      icon: isAdmin ? <MonetizationOn fontSize="large" /> : <LocalFireDepartment fontSize="large" />,
      color: '#F7DC6F',
      change: isAdmin ? '+15%' : 'Aktif',
      description: isAdmin ? 'Bu ay toplam gelir' : 'Mevcut üyelik planınız'
    }
  ];

  const gymStats = [
    { label: 'Salon Doluluk', value: 75, color: '#FF6B35' },
    { label: 'Ekipman Kullanım', value: 60, color: '#4ECDC4' },
    { label: 'Grup Dersleri', value: 85, color: '#45B7D1' },
    { label: 'Üye Memnuniyeti', value: 92, color: '#F7DC6F' }
  ];

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      p: 3,
      borderRadius: 2
    }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" sx={{ 
          fontWeight: 'bold', 
          color: 'white',
          textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
          mb: 2,
          fontSize: { xs: '2.5rem', md: '4rem' }
        }}>
          🏋️‍♂️ {isAdmin ? 'Admin Dashboard' : 'PowerGym Fitness Center'}
        </Typography>
        <Typography variant="h4" sx={{ 
          color: 'rgba(255,255,255,0.9)',
          fontSize: { xs: '1.2rem', md: '1.8rem' }
        }}>
          {isAdmin ? 'Spor salonu yönetim paneli' : `Hoş geldin ${user?.firstName}! Sağlıklı yaşam burada başlıyor`}
        </Typography>
        {!isAdmin && (
          <Box sx={{ mt: 3, p: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
              📍 Spor Salonu Bilgileri
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
              🕐 Açılış Saatleri: Pazartesi-Pazar 05:00-24:00
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
              📞 İletişim: 0212 555 0123 | info@powergym.com
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
              🏃‍♂️ Toplam Üye: 1,234 (687 Erkek, 547 Kadın)
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              💪 Hizmetler: Kişisel Antrenörlük, Grup Dersleri, Beslenme Danışmanlığı, Sauna & Spa
            </Typography>
          </Box>
        )}
      </Box>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography sx={{ 
                      color: 'rgba(255,255,255,0.8)', 
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.2rem' }
                    }} gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h2" component="h2" sx={{ 
                      fontWeight: 'bold', 
                      color: 'white',
                      fontSize: { xs: '2rem', md: '3rem' }
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: '#4caf50', 
                      fontWeight: 600, 
                      mt: 1,
                      fontSize: { xs: '0.9rem', md: '1.1rem' }
                    }}>
                      {stat.change}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    backgroundColor: stat.color, 
                    width: { xs: 80, md: 100 }, 
                    height: { xs: 80, md: 100 },
                    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                    '& .MuiSvgIcon-root': {
                      fontSize: { xs: '2.5rem', md: '3.5rem' }
                    }
                  }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Son Aktiviteler
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                  • Yeni üye kaydı: Ahmet Yılmaz
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                  • Ekipman bakımı tamamlandı: Koşu Bandı #12
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                  • Yeni antrenör eklendi: Ayşe Demir
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  • Üyelik planı güncellendi: Premium Plan
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                {isAdmin ? 'Salon Durumu' : 'Fitness İstatistiklerin'}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {gymStats.map((stat, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        %{stat.value}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={stat.value} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: stat.color
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;