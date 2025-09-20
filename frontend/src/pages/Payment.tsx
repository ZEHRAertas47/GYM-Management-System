import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert
} from '@mui/material';
import {
  CreditCard,
  Security,
  CheckCircle
} from '@mui/icons-material';

const Payment: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    { id: 1, name: 'Temel Plan', price: 150, duration: '1 Ay', features: ['Temel ekipman erişimi', 'Soyunma odası'] },
    { id: 2, name: 'Premium Plan', price: 250, duration: '1 Ay', features: ['Tüm ekipman erişimi', 'Grup dersleri', '24/7 erişim'] },
    { id: 3, name: 'VIP Plan', price: 450, duration: '1 Ay', features: ['Premium özellikler', 'Kişisel antrenör', 'Beslenme danışmanlığı'] }
  ];

  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <Box textAlign="center" p={4}>
        <CheckCircle sx={{ fontSize: 80, color: 'green', mb: 2 }} />
        <Typography variant="h4" gutterBottom>Ödeme Başarılı!</Typography>
        <Typography variant="h6" color="textSecondary">
          Üyeliğiniz aktifleştirildi. Hoş geldiniz!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        💳 Üyelik Ödemesi
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <CreditCard sx={{ mr: 1 }} />
                Ödeme Bilgileri
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Kart Numarası"
                    placeholder="1234 5678 9012 3456"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Son Kullanma"
                    placeholder="MM/YY"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    placeholder="123"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Kart Sahibi"
                    placeholder="Ad Soyad"
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Box mt={3} p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ mr: 1, fontSize: 16 }} />
                  Ödeme bilgileriniz SSL ile korunmaktadır
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Üyelik Planları</Typography>
              
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  sx={{ 
                    mb: 2, 
                    cursor: 'pointer',
                    border: selectedPlan === plan.id.toString() ? '2px solid #1976d2' : '1px solid #ddd'
                  }}
                  onClick={() => setSelectedPlan(plan.id.toString())}
                >
                  <CardContent>
                    <Typography variant="h6">{plan.name}</Typography>
                    <Typography variant="h4" color="primary">₺{plan.price}</Typography>
                    <Typography variant="body2" color="textSecondary">{plan.duration}</Typography>
                    <Box mt={1}>
                      {plan.features.map((feature, index) => (
                        <Chip key={index} label={feature} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {selectedPlan && (
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handlePayment}
                  sx={{ mt: 2 }}
                >
                  Ödemeyi Tamamla
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;