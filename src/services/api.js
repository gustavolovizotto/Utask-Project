import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Função genérica para tratamento de erros
const handleError = (error) => {
  if (error.response) {
    // Erros 4xx/5xx
    throw new Error(`Erro no servidor: ${error.response.data}`);
  } else if (error.request) {
    // Sem resposta do servidor
    throw new Error('Sem resposta do servidor. Verifique sua conexão.');
  } else {
    // Erros de configuração
    throw new Error(`Erro na requisição: ${error.message}`);
  }
};

export const cadastrarUsuario = async (usuario) => {
  try {
    const { data } = await api.get('/usuarios', {
      params: { email: usuario.email },
    });

    if (data.length > 0) {
      throw new Error('Email já cadastrado');
    }

    const newUser = {
      ...usuario,
      id: Date.now().toString(),
    };

    const response = await api.post('/usuarios', newUser);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const loginUsuario = async (credenciais) => {
  try {
    const { data } = await api.get('/usuarios', {
      params: {
        email: credenciais.email,
        senha: credenciais.senha,
      },
    });

    if (data.length === 0) {
      throw new Error('Credenciais inválidas');
    }

    return data[0];
  } catch (error) {
    handleError(error);
  }
};

export const criarTask = async (task) => {
  try {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const response = await api.post('/tasks', newTask);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTasksByUser = async (userId) => {
  try {
    const { data } = await api.get('/tasks', {
      params: { usuarioId: userId },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export default api;
