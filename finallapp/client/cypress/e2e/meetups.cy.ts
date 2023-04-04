baseUrl = 'http://localhost:3000';
topicsUrl = `${baseUrl}/meetups/topics`;

before(() => {
  cy.clearLocalStorage();
});

beforeEach(() => {
  cy.visit(baseUrl);
  cy.get('header select').select('en');
});

describe('Meetups work', (): void => {
  it('Open meetups', () => {
      cy.visit(baseUrl).url().should('be.equal', topicsUrl)
  })

  it('Employee vote', () => {
    cy.get('[data-ref="signInButton"]').click()
    cy.get('input[name=username]').type('employee')
    cy.get('input[name=password]').type('private')
    cy.get('form > button').click()

    const voteButton = '[data-ref="meetupPreview.voting"] > button';

    cy.get('[data-ref="meetups.meetupCard"]').first().click()
 
    cy.get(voteButton).should('have.text', 'Vote')
    cy.get(voteButton).click()


    cy.get(voteButton).click()
    cy.get(voteButton).should('have.text', 'Unvote')
  })


  it('Meetup creation', () => {
    cy.get('[data-ref="signInButton"]').click()

    cy.get('input[name=username]').type('chief')
    cy.get('input[name=password]').type('private')
    cy.get('form > button').click()

    const meetupName = crypto.randomUUID()

    cy.get('button').contains('Create meetup').click()
    cy.get('input[name=name]').type(meetupName)
    cy.get('input[name=speaker]').type('Speaker')
    cy.get('textarea').type('description for first meetup')
    cy.get('body').click()
    cy.get('button').contains('Next').click()
    cy.get('button').contains('Next').click()

    cy.url().should('be.equal', topicsUrl)
    cy.get('[data-ref="meetups.meetupCard"]').contains(meetupName)
    cy.contains('[data-ref="meetups.meetupCard"]', meetupName).find('button').click()  
  })

  

  it('Meetup lifecycle', () => {
    cy.get('[data-ref="signInButton"]').click()

    cy.get('input[name=username]').type('chief')
    cy.get('input[name=password]').type('private')
    cy.get('form > button').click()

    const meetupName = crypto.randomUUID()

    cy.get('button').contains('Create meetup').click()
    cy.get('input[name=name]').type(meetupName)
    cy.get('input[name=speaker]').type('Speaker')
    cy.get('textarea').type('description for first meetup')
    cy.get('body').click()
    cy.get('button').contains('Next').click()
    cy.get('button').contains('Next').click()

    cy.url().should('be.equal', topicsUrl)
    cy.get('[data-ref="meetups.meetupCard"]').contains(meetupName).click()
    cy.get('[data-ref="previewMeetup.controlButtons"]').contains('Approve topic').click()

    cy.contains('div', 'On moderation').click()

    cy.get('[data-ref="meetups.meetupCard"]').contains(meetupName).click()
    cy.get('[data-ref="previewMeetup.controlButtons"]').contains('Publish').click()

    cy.contains('div', 'Upcoming').click()
    cy.get('[data-ref="meetups.meetupCard"]').contains(meetupName).click()
    cy.get('[data-ref="previewMeetup.controlButtons"]').contains('Publish').click()

    cy.contains('div', 'Finished').click()

    cy.get('[data-ref="meetups.meetupCard"]').contains(meetupName)
    cy.contains('[data-ref="meetups.meetupCard"]', meetupName).find('button').first() .click() 
  })
})
