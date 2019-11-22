describe('Blog Homepage', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8000')
	})
	it('contains "Amy Goes to Perth" in the title', () => {
		cy.title().should('contain', 'Amy Goes to Perth')
	})
	it('contains posts in feed', () => {
		cy.get('.article-feed').find('article')
	})
	it('all posts contain title', () => {
		cy.get('.article-feed')
			.find('article')
			.get('h2')
	})
})

describe('Blog Post Template', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8000/template')
	})
	it('contains "Amy Goes to Perth" in the title', () => {
		cy.title().should('contain', 'Amy Goes to Perth')
	})
	it('has visible post title', () => {
		cy.get('h1').should('be.visible')
	})
	it('has share icons', () => {
		cy.get('.share-icons a').should('be.visible')
	})
	it('has working share icons', () => {
		cy.get('.share-icons a').click({ multiple: true })
	})
	it('has a visible author profile image', () => {
		cy.get('.author img').should('be.visible')
	})
})

describe('Mobile Blog Post Template', () => {
	beforeEach(() => {
		cy.viewport('samsung-s10')
		cy.visit('http://localhost:8000/template')
	})
	it('contains "Amy Goes to Perth" in the title', () => {
		cy.title().should('contain', 'Amy Goes to Perth')
	})
	it('has visible post title', () => {
		cy.get('h1').should('be.visible')
	})
	it('has share icons', () => {
		cy.get('.share-icons .share-link').should('be.visible')
	})
	it('has a visible author profile image', () => {
		cy.get('.author img').should('be.visible')
	})
})
