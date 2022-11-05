describe('The Home Page', () => {
  it('get email input and type a email', () => {
    cy.visit('http://localhost:8100/') // change URL to match your dev URL

    cy.get("#mat-input-0").click();

    cy.get("#mat-input-0").type('aqui.baeza@duocuc.cl')

    cy.get("#mat-input-1").click();

    cy.get("#mat-input-1").type('pass123')

    cy.get("#main > app-login > ion-content > div > form > div.form-btn-container > button").click();

    

  })
})