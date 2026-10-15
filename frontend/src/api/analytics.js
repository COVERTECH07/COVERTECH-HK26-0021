import apiRequest from './client';

export const getSummary = () => apiRequest('/analytics/summary');

export const getHeatmap = () => apiRequest('/analytics/heatmap');

export const getAlerts = () => apiRequest('/analytics/alerts');
