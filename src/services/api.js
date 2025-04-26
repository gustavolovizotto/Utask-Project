import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

export const cadastrarUsuario = async (usuario) => {
    
  const { data } = await api.get('/usuarios', {
    params: { email: usuario.email }
  });

  if (data.length > 0) {
    throw new Error('Email já cadastrado');
  }

  return api.post('/usuarios', usuario);
};

export const loginUsuario = async (credenciais) => {
    const response = await api.get('/usuarios', {
      params: {
        email: credenciais.email,
        senha: credenciais.senha
      }
    });
    return response.data[0]; 
  };