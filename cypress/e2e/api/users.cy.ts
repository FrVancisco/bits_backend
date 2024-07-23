import {checkUserStatus, createUser, getUser} from "../../src/api/users";
import { currentTimeHHMMSS, getRandomDateOfBirth } from "../../src/libs/utils/timestamps";
import {getStatusFromRating, getTitle} from "../../src/libs/utils/helpers";

describe('v1 users api tests', () => {
    const timeStamp: string = currentTimeHHMMSS();
    const generateRating: number = Math.floor(Math.random() * 11);
    const generatePassword: string = timeStamp + generateRating.toString();

    const title: string = getTitle(); // "Mr", "Mrs", "Miss", "Ms", "Mx"
    const firstName: string = timeStamp + 'firstName';
    const lastName: string = timeStamp + 'lastName';
    const dateOfBirth: string = getRandomDateOfBirth();
    const email: string = timeStamp + '@test.com';
    const password: string = generatePassword;
    const randomRating: number = generateRating;

    // POST
    //ISSUES 1 AND 2
    for (let rating = 0; rating <= 10; rating++) {
        it(`creates a valid user with rating ${rating}`, () => {
            createUser({
                title,
                firstName,
                lastName,
                dateOfBirth,
                email: `${rating}${email}`,
                password,
                rating
            }, 200).then((): void => {
                const userId = Cypress.env('newUserId');
                const expectedStatus: string = getStatusFromRating(rating);
                checkUserStatus(userId, expectedStatus);
            });
        });
    }

        //ISSUE 3
        it('creates a user without a title (optional field)', () => {
            createUser({
                firstName,
                lastName,
                dateOfBirth,
                email,
                password,
                rating: randomRating
            }, 200);
        });

        it('fails to create a user with invalid title', () => {
            createUser({
                title: 'InvalidTitle',
                firstName,
                lastName,
                dateOfBirth,
                email,
                password,
                rating: randomRating
            }, 400, false);
        });

        it('fails to create a user with a firstName less than 2 characters', () => {
            createUser({
                title,
                firstName: 'A',
                lastName,
                dateOfBirth,
                email,
                password,
                rating: randomRating
            }, 400, false);
        });

        it('fails to create a user with a firstName greater than 255 characters', () => {
            createUser({
                title,
                firstName: 'A'.repeat(256),
                lastName,
                dateOfBirth,
                email,
                password,
                rating: randomRating
            }, 400, false);
        });

        it('fails to create a user with a lastName less than 2 characters', () => {
            createUser({
                title,
                firstName,
                lastName: 'A',
                dateOfBirth,
                email,
                password,
                rating: randomRating
            }, 400, false);
        });

        //ISSUE 4
        it('fails to create a user with a lastName greater than 255 characters', () => {
            createUser({
                title,
                firstName,
                lastName: 'A'.repeat(256),
                dateOfBirth,
                email,
                password,
                rating: randomRating
            }, 400, false);
        });

        it('fails to create a user with an invalid dateOfBirth format', () => {
            createUser({
                title,
                firstName,
                lastName,
                dateOfBirth: '01-01-1990',
                email,
                password,
                rating: randomRating
            }, 400, false);
        });

        it('fails to create a user with an invalid email format', () => {
            createUser({
                title,
                firstName,
                lastName,
                dateOfBirth,
                email: 'invalid-email',
                password,
                rating: randomRating
            }, 400, false);
        });

        //ISSUE 5
        it('fails to create a user with a duplicate email', () => {
            createUser({
                title,
                firstName,
                lastName,
                dateOfBirth,
                email,
                password,
                rating: randomRating
            }, 200);

            createUser({
                title,
                firstName: firstName + 'Dup',
                lastName: lastName + 'Dup',
                dateOfBirth,
                email,
                password,
                rating: randomRating
            }, 400, false);
        });

        //ISSUE 6
        it('fails to create a user without a password', () => {
            createUser({
                title,
                firstName,
                lastName,
                dateOfBirth,
                email,
                rating: randomRating
            }, 400, false);
        });

        //ISSUE 7
        it('fails to create a user with a rating outside 0-10', () => {
            createUser({
                title,
                firstName,
                lastName,
                dateOfBirth,
                email,
                password,
                rating: 11
            }, 400, false);

            createUser({
                title,
                firstName,
                lastName,
                dateOfBirth,
                email,
                password,
                rating: -1
            }, 400, false);
        });


        //GET
        it('gets the created user', () => {
            getUser(Cypress.env('newUserId'), 200);
        });

        it('fails getting a user with an invalid id', () => {
            const wrongId: string = '123';
            getUser(wrongId, 400, false);
        });

        // Test for Authorization header
        //ISSUE 8
        it('fails to create a user with a bad token', () => {
            createUser({
                title,
                firstName,
                lastName,
                dateOfBirth,
                email: 'badtoken@test.com',
                password,
                rating: 5
            }, 401, false, true);
        });

        //ISSUE 9
        it('fails to get a user with a bad token', () => {
            const userId = Cypress.env('newUserId');
            getUser(userId, 401, false, true);
        });
});
