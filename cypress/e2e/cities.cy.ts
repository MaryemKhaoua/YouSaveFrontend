describe('Cities Component E2E Tests', () => {

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Script error')) {
                return false; // Ignore les erreurs CORS
            }
            return true;
        });

        cy.request('POST', 'http://localhost:8080/auth/login', {
            email: 'abir@gmail.com',
            password: 'abir@gmail.com'
        }).then((response) => {
            window.localStorage.setItem('token', response.body.token);
        });

        cy.visit('/cities'); 
    });

    // 1. Vérification de l'affichage des composants principaux
    it('should display the navbar after content is loaded', () => {
        cy.get('.dashboard-container').should('be.visible');
        cy.get('app-navbar').should('exist').and('be.visible');
    });
    
    

    // 2. Ajouter une nouvelle ville
    it('should add a new city successfully', () => {
        cy.get('.btn-success').click();  // Si possible, remplace par `[data-testid="add-city-btn"]` pour plus de précision

        cy.get('#cityName').type('NewCity');
        cy.get('button[type="submit"]').click();

        cy.get('table tbody tr').should('contain', 'NewCity');
    });

    // 3. Éviter d'ajouter une ville en double
    it('should show an alert when adding an existing city', () => {
        cy.get('.btn-success').click();
        cy.get('#cityName').type('ExistingCity');
        cy.get('button[type="submit"]').click();

        cy.get('.swal2-popup').should('contain', 'City Already Exists');
    });

    // 4. Mise à jour d'une ville existante
    it('should update an existing city', () => {
        cy.get('table tbody tr').first().within(() => {
            cy.get('.icon-edit').click();
        });

        cy.get('#updatedCityName').clear().type('UpdatedCity');
        cy.get('button[type="submit"]').contains('Update').click();

        cy.get('table tbody tr').first().should('contain', 'UpdatedCity');
    });

    // 5. Suppression d'une ville
    it('should delete a city successfully', () => {
        cy.get('table tbody tr').first().within(() => {
            cy.get('.icon-delete').click();
        });

        cy.on('window:confirm', () => true); // Confirmer la suppression
        cy.get('table tbody tr').should('not.contain', 'UpdatedCity');
    });
});
