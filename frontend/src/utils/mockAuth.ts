// Mock authentication for testing
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@gym.com',
    firstName: 'Admin',
    lastName: 'Kullanıcı',
    role: 'ADMIN'
  }
];

export const mockLogin = (username: string, password: string) => {
  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return {
      token: 'mock-jwt-token-' + Date.now(),
      ...userWithoutPassword
    };
  }
  throw new Error('Hatalı kullanıcı adı veya şifre');
};