describe('Auth0 login', function() {
  context('Use "logginInWithAuth0" command to login', function() {
    it('is not logged in', function() {
      // smoke test just to show that without logging in we cannot
      cy.visit('/');
      cy.get('h1').should('contain', 'Please log in!');
    });

    it('authenticates with cy.request', function() {
      // this automatically gets + sets cookies on the browser
      // and follows all of the redirects that ultimately get
      // us to /home
      cy.loginWithAuth0().then(resp => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.include('Welcome');
        expect(resp.body).to.include('Your email is');
      });

      cy.reload();
      cy.get('h1').should('contain', 'Welcome');
      cy.get('p').should('contain', 'Your email is');

      // express-session cookie should be set
      cy.getCookie('connect.sid').should('exist');
    });
  });
});
