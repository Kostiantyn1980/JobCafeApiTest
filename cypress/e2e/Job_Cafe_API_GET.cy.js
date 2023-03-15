///<reference types = "Cypress"/>

describe('Get Jobs Test', () => {

  it('get all jobs', () => {
    cy.request('/').then((response) => {
      console.log(response),
        expect(response.status).equal(200),
        expect(response.statusText).equal("OK")
    })
  })
  it('verify jobs result list', () => {
    cy.request('/').then((response) => {
      console.log(response.body.content),
        expect(response.body.content).not.empty
    })
  })
  it('job listing has all the details', () => {
    cy.request('/').then((response) => {
      console.log(response.body.content),
        expect(response.body.content[0]).have.property("id"),
        expect(response.body.content[0].id).equal("63b44d7b74f47208c4447139")
    })
  })
  it('job listing has all the details', () => {
    cy.request('/').then((response) => {
      var result = response.body.content[1]
      console.log(result),
        expect(result).have.property("position"),
        expect(result.position).equal("Web Project Manager")

      expect(result).have.property("company"),
        expect(result.company).equal("GEMS")

      expect(result).have.property("location"),
        expect(result.location).equal("Tel Aviv-Yafo, Israel")

      expect(result).have.property("link"),
        expect(result.link).contain("http")

    })
  })
  it('search by location', () => {
    cy.request('/?location=Toronto').then((response) => {
      let resultlist = response.body.content
      console.log(resultlist)
      expect(response.status).equal(200)

      for (let i = 0; i<resultlist.length; i++) {
        expect(resultlist[i].location).equal('Toronto, ON, Canada')
      }


      })
  })
})
