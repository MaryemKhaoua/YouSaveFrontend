describe('Blood List Component', () => {

    beforeEach(() => {
      cy.visit('blood'); // Assurez-vous que l'URL est correcte
    });
  
    it('should display the navbar, sidebar, and table', () => {
      cy.get('app-navbar').should('be.visible');
      cy.get('app-sidebar').should('be.visible');
      cy.get('table').should('be.visible');
    });
  
    it('should add a new blood type', () => {
      cy.get('.btn-success').contains('Add Blood Type').click();
      cy.get('#bloodType').type('AB+');
      cy.get('button').contains('Submit').click();
  
      cy.get('table tbody tr').should('contain', 'AB+');
    });
  
    it('should update an existing blood type', () => {
      cy.get('table tbody tr').first().within(() => {
        cy.get('.icon-edit').click();
      });
  
      cy.get('#bloodType').clear().type('O-');
      cy.get('button').contains('Update').click();
  
      cy.get('table tbody tr').first().should('contain', 'O-');
    });
  
    it('should delete a blood type', () => {
      cy.get('table tbody tr').first().within(() => {
        cy.get('.icon-delete').click();
      });
  
      cy.on('window:confirm', () => true); // Confirme la suppression
      cy.get('table tbody tr').should('not.contain', 'AB+');
    });
  });
  