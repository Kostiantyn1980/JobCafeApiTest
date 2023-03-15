///<reference types = "Cypress"/>
import { data } from '../fixtures/params.json'
describe('Get Jobs Test', () => {

  it('get all jobs', () => {
    cy.request('/').then((response) => {
      console.log(response),
        expect(response.status).equal(200),
        expect(response.statusText).equal("OK")

    })
  })
  it('job listing has all the details', () => {
    cy.request('http://api.jobka.net:8081/jobs?company=mycompanyKostya2').then((response) => {
      var result = response.body.content[0]
      console.log(result)
      expect(result).have.property("id"),
        expect(result.id).equal("6405202d80f63229f3928e44")


      console.log(response.body.content),
        expect(result).have.property("position")
      expect(result.position).equal("BysyMan")
      expect(response.body.content).not.empty

      console.log(response.body.content),
        expect(result).have.property("company"),
        expect(result.company).equal("mycompanyKostya2")
      expect(response.body.content).not.empty

      console.log(response.body.content),
        expect(result).have.property("location"),
        expect(result.location).equal("Haliluya")
      expect(response.body.content).not.empty

      console.log(response.body.content),
        expect(result).have.property("seniority"),
        expect(result.seniority).equal("Beginner")
      expect(response.body.content).not.empty

      console.log(response.body.content),
        expect(result).have.property("salary"),
        expect(result.salary).equal("5K")
      expect(response.body.content).not.empty

    })
  })
  it('search by location', () => {
    cy.request('http://api.jobka.net:8081/jobs?location=Haliluya').then((response) => {
      let resultlist = response.body.content
      console.log(resultlist)
      expect(response.status).equal(200)

    })
  })
  it('search by location Calgary', () => {
    cy.request('http://api.jobka.net:8081/jobs?location=Calgary').then((response) => {
      let resultlist = response.body.content
      console.log(resultlist)
      expect(response.status).equal(200)
    })
  })
  it('search by Salary negative', () => {
    cy.request('http://api.jobka.net:8081/jobs?description=slary').then((response) => {
      let resultlist = response.body.content
      console.log(resultlist)
      expect(response.status).equal(204)
    })
  })
  it('search by negative ID ', () => {
    cy.request('http://api.jobka.net:8081/jobs?id=64052026262323229f3928e44').then((response) => {
      let resultlist = response.body.content
      console.log(resultlist)
      expect(response.status).equal(204)
    })
  })
  it('search by wrong company name', () => {
    cy.request('http://api.jobka.net:8081/jobs?company=mycompanyKostya33').then((response) => {
      let resultlist = response.body.content
      console.log(resultlist)
      expect(response.status).equal(204)
    })
  })
  it('delete company name', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://api.jobka.net:8081/jobs/DEL?key=aminamin',
      failOnStatusCode: false
    }).
      then((response) => {
        expect(response.status).equal(403),
          expect(response.body.error).equal("Forbidden")
      })
  })
})
