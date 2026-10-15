import apiRequest from './client';

export const listIncidents = () => apiRequest('/incidents');

export const createIncident = (payload) => apiRequest('/incidents', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const verifyIncident = (incidentId, payload) => apiRequest(`/incidents/${incidentId}/verify`, {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const listAlertsForIncident = (incidentId) => apiRequest(`/incidents/${incidentId}/alerts`);
