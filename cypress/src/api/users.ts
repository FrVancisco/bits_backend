import {paths} from "../libs/paths";

interface CreateUserOptions {
    title?: string
    firstName: string
    lastName: string
    dateOfBirth: string
    email: string
    password?: string
    rating: number
}

export function createUser(options: CreateUserOptions, expectedStatusCode: number, failOnStatusCode: boolean = true, useBadToken: boolean = false): Cypress.Chainable {
    const authorizationToken: string = useBadToken ? 'aWrongAuthToken' : Cypress.env('QA_AUTH_TOKEN');

   return cy.request({
        method: 'POST',
        url: `${Cypress.env('QA_API_BASE_URL')}/${paths.main('v1')}`,
        headers: {
            authorization: authorizationToken
        },
        body: {
            ...options
        },
        failOnStatusCode: failOnStatusCode
    }).then(({ status, body }): void => {
        expect(status).to.eq(expectedStatusCode);
        if (status === 200) {
            Cypress.env('newUserId', body.data.userId);
        }
    });
}

export function checkUserStatus(userId: string, expectedStatus: string): void {
     getUser(userId, 200).then((body): void => {
        expect(body.data.status).to.eq(expectedStatus);
    });
}

export function getUser(userId: string, expectedStatusCode: number, failOnStatusCode: boolean = true, useBadToken: boolean = false): Cypress.Chainable {
    const authorizationToken: string = useBadToken ? 'aWrongAuthToken' : Cypress.env('QA_AUTH_TOKEN');

    return cy.request({
        method: 'GET',
        url: `${Cypress.env('QA_API_BASE_URL')}/${paths.getUserId('v1', userId)}`,
        headers: {
            authorization: authorizationToken
        },
        failOnStatusCode: failOnStatusCode
    }).then(({ status, body }): any => {
        expect(status).to.eq(expectedStatusCode);
        return body;
    });
}
