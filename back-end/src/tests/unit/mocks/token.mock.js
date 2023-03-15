const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsIm5hbWUiOiJDbGllbnRlIFrDqSBCaXJpdGEiLCJpZCI6MywiaWF0IjoxNjc4MTQyNTU1LCJleHAiOjE2Nzg3NDczNTV9.PCjSuB5gVCBPJix2ifXD6acf17Z3j-OylrYKoV3pI3o';
const jwtVerifyMock = {
  email: 'zebirita@email.com',
  role: 'customer',
  name: 'Cliente Zé Birita',
  id: 3,
  iat: 1678835538,
  exp: 1679440338
}

module.exports = { tokenMock, jwtVerifyMock };