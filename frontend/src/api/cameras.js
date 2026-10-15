import apiRequest from './client';

export const listCameras = () => apiRequest('/cameras');

export const createCamera = (payload) => apiRequest('/cameras', {
  method: 'POST',
  body: JSON.stringify(payload),
});
