/* eslint-disable jest/valid-expect-in-promise */
import experimentTest from '../fixtures/experimentTest.json';
import modelTest from '../fixtures/modelTest.json';
import questionsTest from '../fixtures/questionsTest.json';
import questionsQuizTest from '../fixtures/questionsQuizTest.json';
import modelImageTest from '../fixtures/modeImgaeTest.json';

// Cypress.Commands.add('addImage', (imagePath) => {
//     cy.fixture(imagePath)
//         .as('uploadedImage')
//         .get('#input-file')
//         .click()
//         // .get('input[type=file]')
//         .then(function (el) {
//             return Cypress.Blob.base64StringToBlob(
//                 this.uploadImage,
//                 'image/png'
//             ).then((blob) => {
//                 function FileListItem(a) {
//                     a = [].slice.call(Array.isArray(a) ? a : arguments);
//                     for (var c, b = (c = a.length), d = !0; b-- && d; )
//                         d = a[b] instanceof File;
//                     if (!d)
//                         throw new TypeError(
//                             'expected argument to FileList is File or array of File objects'
//                         );
//                     for (
//                         b =
//                             new ClipboardEvent('').clipboardData ||
//                             new DataTransfer();
//                         c--;

//                     )
//                         b.items.add(a[c]);
//                     return b.files;
//                 }
//                 const files = [
//                     new File([blob], 'image', { type: 'image/png' }),
//                 ];
//                 el[0].files = new FileListItem(files);
//                 cy.contains('Guardar Cambios').click();
//             });
//         });
// });

const experiment = experimentTest;
const model = modelTest;
before(function () {
    cy.request('POST', 'http://localhost:3001/api/reset');
    cy.request('POST', 'http://localhost:3001/api/model_types', model);
});
describe('Creación de un Experimento', () => {
    it('Creacion de un experimento', () => {
        cy.visit('http://localhost:3000/experiments');

        cy.contains('Nuevo Experimento').click();

        cy.get('#modal-new-experiment')
            .should('be.visible')
            .wait(500)
            .then(() => {
                // eslint-disable-next-line jest/valid-expect-in-promise
                cy.get('#modelType')
                    .type(model.name)
                    .then((opt) => {
                        cy.get('#modelType-option-0').click();
                    });
                cy.get('#title').type(experiment.title);
                cy.get('#description').type(experiment.description);
            });

        cy.contains('button', 'Crear').click();
    });

    it('Verificar creación', () => {
        cy.get('#card-experiments').contains(experiment.title);
        cy.get('#card-experiments').contains(experiment.description);
        cy.contains('Administrar').click();
        cy.get('.MuiContainer-root').contains(experiment.title);
        cy.get('.MuiContainer-root').contains(experiment.description);
        // cy.get('#card-experiments').contains(experiment.description);
    });

    it('Modificaciones en las encuestas', () => {
        const questions = questionsTest;

        cy.get('.MuiContainer-root').contains('Configurar Encuestas').click();

        cy.get('.MuiBox-root > :nth-child(1) > div').click();
        cy.get('#title-section').clear().type('Sección test end to end');
        cy.get('#description-section').type(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        );
        cy.get('.MuiButton-contained').click();

        let index = 2;
        for (const question of questions) {
            cy.get('[title="Agregar Pregunta"]').click();
            cy.get('.MuiBox-root').contains(`Pregunta ${index}`).click();
            cy.get('#title-question').clear().type(question.value);
            question.type !== 3 &&
                cy
                    .get('#type-question-select')
                    .click()
                    .then((opt) => {
                        cy.get(`[data-value="${question.type}"]`).click();
                    });
            const addAlt = cy.get('#add-option');
            for (let index = 0; index < question.alternatives; index++) {
                addAlt.click();
            }
            cy.get('.MuiButton-contained').click();
            index++;
        }
        cy.get('#back-experiment').click();
    });

    it('Modificaciones en las evaluaciones', () => {
        cy.get('.MuiContainer-root').contains('Configurar Evaluación').click();

        // cy.get('.MuiTypography-h5').click();
        // cy.get('#title-section').type('Quiz end to end');
        // cy.get('#description-section').type(
        //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        // );
        // cy.get('.MuiBox-root > :nth-child(1) > .MuiButton-root').click();

        const modelImgae = modelImageTest;
        cy.get('#modal-image > .MuiButton-label')
            .click()
            .should('be.visible')
            .wait(500)
            .then(() => {
                cy.get('#title').type(modelImgae.title);
                cy.get('#description').type(modelImgae.description);
                cy.get('#modelJson').type(`modelJSON`);
                const image = 'expTest.png';
                cy.get('#icon-button-file').attachFile(image);
                cy.get(':nth-child(4) > .MuiButton-label').click();
            });

        const questionsQuiz = questionsQuizTest;

        let index = 2;
        for (const question of questionsQuiz) {
            cy.get('[title="Agregar Pregunta"]').click();
            cy.get('.MuiBox-root').contains(`Pregunta ${index}`).click();
            cy.get('#title-question').clear().type(question.value);

            question.alternatives.forEach((alt, i) => {
                cy.get('#add-option').click();
                cy.get(
                    `:nth-child(${
                        i + 2
                    }) > .MuiFormControl-root > .MuiInputBase-root > #alternative-question`
                )
                    .clear()
                    .type(alt);
            });
            cy.get('.MuiButton-contained').click();
            index++;
        }
        cy.get('#button-bar').click();
    });

    it('Ejecución del experimento', () => {
        cy.get('.MuiList-root')
            .children()
            .contains('Simular Experimento')
            .click();

        // TODO: Hacerlo generico
        cy.get('.MuiCardActions-root > .MuiButtonBase-root').click();
        cy.get('.MuiButtonBase-root')
            .click()
            .should('be.visible')
            .wait(500)
            .then(() => {
                cy.contains(
                    'Estoy de acuerdo y acepto los terminos y condiciones'
                ).click();
                cy.get('.MuiButton-textPrimary > .MuiButton-label').click();
            });

        // TODO: Generalizar
        cy.get(
            ':nth-child(2) > #options-container > .MuiFormGroup-root > #radio-option'
        ).click();

        cy.get(
            ':nth-child(3) > #options-container > .MuiFormControl-root > :nth-child(1)'
        ).click();
        cy.get(
            ':nth-child(3) > #options-container > .MuiFormControl-root > :nth-child(3)'
        ).click();

        cy.get('#type-question-select')
            .click()
            .then((opt) => {
                cy.get(`[data-value="2"`).click();
            });

        cy.get('.MuiFormGroup-root > :nth-child(2)').click();

        // Guardar
        cy.get('[style="margin-bottom: 20px;"] > div > .MuiButtonBase-root')
            .click()
            .should('be.visible')
            .wait(500)
            .then(() => {
                cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
            });

        cy.get('#radio-option').click();
        cy.get('#next-question').click();

        cy.get('.MuiFormGroup-root > :nth-child(1)').click();
        cy.get('#next-question').click();

        cy.get('.MuiFormGroup-root > :nth-child(3)').click();
        cy.get('#next-question').click();

        cy.get('.MuiFormGroup-root > :nth-child(1)').click();
        cy.get('#end-quiz').click();

        cy.get('.MuiButton-label').click();
    });

    // it('Verificación de la creación de la instancia', () => {
    //     cy.visit('http://localhost:3000/model_types');
    //     cy.get('#button-bar').click();
    //     cy.get('.MuiList-root')
    //         .children()
    //         .contains('Exportar Experimentos')
    //         .click();
    // });

    // after(() => {
    //     cy.request('POST', 'http://localhost:3001/api/reset');
    // });
});
