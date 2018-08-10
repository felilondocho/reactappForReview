const apiService = (body, token) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  },
  body: JSON.stringify(body),
});

export default apiService;
