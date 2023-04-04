let baseUrl = 'http://localhost:3000';
let topicsUrl = `${baseUrl}/meetups/topics`;

before(() => {
    cy.clearLocalStorage();
});

beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('header select').select('en');
});

describe('Authorizartion', () => {
    it('Authorize page', () => {
        cy.get('[data-ref="signInButton"]').click();

        cy.get('input[name=username]').clear().type('random');
        cy.get('input[name=password]').clear().type('private');
        cy.get('form > button').click();
        cy.url().should('be.equal', `${baseUrl}/authorize`);

        cy.get('input[name=username]').clear().type('chief');
        cy.get('input[name=password]').clear().type('private');
        cy.get('form > button').click();
        cy.url().should('be.equal', topicsUrl);
    });
});

describe('Permissions', () => {
    it('Guest permissions', () => {
        cy.get('button').contains('Create meetup').should('be.disabled');

        cy.get('[data-ref="meetups.meetupCard"]').first().click();
        cy.get('[data-ref="meetupPreview.voting"] > button').should('not.exist');
        cy.get('[data-ref="previewMeetup.controlButtons"] > button').should('have.length', 1);
        cy.get('[data-ref="previewMeetup.controlButtons"] > button').click();

        cy.get('div').contains('Upcoming').click();
        cy.get('[data-ref="meetups.meetupCard"]').first().click();
        cy.get('button').contains('publish').should('not.exist');
    });

    it('Employee permissions', () => {
        cy.get('[data-ref="signInButton"]').click();

        cy.get('input[name=username]').clear().type('employee');
        cy.get('input[name=password]').clear().type('private');
        cy.get('form > button').click();

        cy.get('button').contains('Create meetup').should('be.disabled');

        cy.get('[data-ref="meetups.meetupCard"]').first().click();
        cy.get('[data-ref="meetupPreview.voting"] > button').should('exist');
        cy.get('[data-ref="previewMeetup.controlButtons"] > button').should('have.length', 1);
        cy.get('[data-ref="previewMeetup.controlButtons"] > button').click();

        cy.get('div').contains('Upcoming').click();
        cy.get('[data-ref="meetups.meetupCard"]').first().click();
        cy.contains('button', 'Publish').should('not.exist');
    });

    it('Chief permission', () => {
        cy.get('[data-ref="signInButton"]').click();

        cy.get('input[name=username]').clear().type('chief');
        cy.get('input[name=password]').clear().type('private');
        cy.get('form > button').click();

        cy.get('button').contains('Create meetup').should('be.enabled');

        cy.get('[data-ref="meetups.meetupCard"]').first().click();
        cy.get('[data-ref="meetupPreview.voting"] > button').should('exist');
        cy.get('[data-ref="previewMeetup.controlButtons"] button').should('have.length', 3);
        cy.get('[data-ref="previewMeetup.controlButtons"] > button').last().click();

        cy.get('div').contains('Upcoming').click();
        cy.get('[data-ref="meetups.meetupCard"]').first().click();
        cy.contains('button', 'Publish').should('exist');
    });
});
