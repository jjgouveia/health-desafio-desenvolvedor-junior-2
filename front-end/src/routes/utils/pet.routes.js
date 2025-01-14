import axios from './axiosEngine';

axios.defaults.withCredentials = true;

const BASE_PATH = 'api/pets';

const registerPet = async (body) => axios.post(`${BASE_PATH}`, body);

const listAllPets = async () => axios.get(`${BASE_PATH}`);

const findAPetById = async (id) => axios.get(`${BASE_PATH}/${id}`);

const updatePet = async (id, body) => axios.put(`${BASE_PATH}/${id}`, body);

const removePet = async (id) => axios.delete(`${BASE_PATH}/${id}`);

export {
  registerPet,
  listAllPets,
  findAPetById,
  updatePet,
  removePet,
};
