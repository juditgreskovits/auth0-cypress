const auth = {
  code: 'auth-code',
  tokens: {
    access_token: 'access-token',
    id_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6Ik1UQTBORFUwT0RaR05UVTVNVFpHUkRFeFJqa3lNVFpDUVRWQ1JUVkdNME0xTVRWQk1FRkZRZyJ9.eyJnaXZlbl9uYW1lIjoiVGVzdGVyIiwiZmFtaWx5X25hbWUiOiJDeXByZXNzIiwibmlja25hbWUiOiJ0ZXN0ZXItY3lwcmVzcyIsIm5hbWUiOiJUZXN0ZXIgQ3lwcmVzcyIsInBpY3R1cmUiOiIiLCJnZW5kZXIiOiJmZW1hbGUiLCJsb2NhbGUiOiJlbi1HQiIsInVwZGF0ZWRfYXQiOiIyMDE4LTEwLTIxVDE5OjExOjIyLjEyN1oiLCJlbWFpbCI6InRlc3RlckBjeXByZXNzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2J1dHdoeS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnx0ZXN0LWlkIiwiYXVkIjoiWFhrUEs5YUtENVJzendpV0dzbEFrNjFCUWYzMU9GOFciLCJpYXQiOjE1NDAxNDkwODIsImV4cCI6MjU0MDE4NTA4Mn0.nQCs3feAK5Om4nPNS73z4lh3Dy2dXN18ViurXOWzKSU',
    scope: 'openid profile email',
    token_type: 'Bearer',
  },
  profile: {
    "sub":"google-oauth2|test-id",
    "given_name":"Tester",
    "family_name":"Cypress",
    "nickname":"tester-cypress",
    "name":"Tester Cypress",
    "picture":"",
    "gender":"female",
    "locale":"en-GB",
    "updated_at":"2018-10-21T19:11:22.127Z",
    "email":"tester@cypress.com",
    "email_verified":true
  },
};

module.exports = auth;
