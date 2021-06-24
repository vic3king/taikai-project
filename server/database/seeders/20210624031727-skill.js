module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Skills', [
      {
        id: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
        jobId: '6e810164-e633-45c9-9b65-a787984b2405',
        skill: 'Javascript',
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
      {
        id: '3839ff93-0e02-437f-94c0-bad41c34f2ad',
        jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
        skill: 'CSS',
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
    ]),

  down: queryInterface => queryInterface.bulkDelete('Skills', null, {}),
};
