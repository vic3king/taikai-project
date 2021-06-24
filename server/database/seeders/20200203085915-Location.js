module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Locations', [
      {
        id: '150bb47b-f8be-4740-a7b0-b07e17f8d315',
        jobId: '6e810164-e633-45c9-9b65-a787984b2405',
        latitude: '092837461928746',
        longitude: '092837461928746',
        address: 'my random address',
        state: 'Lagos',
        city: 'Lagos',
        country: 'Nigeria',
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
      {
        id: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
        jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
        latitude: '092837461928746',
        longitude: '092837461928746',
        address: 'another random address',
        state: 'Lagos',
        city: 'Lagos',
        country: 'Nigeria',
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
    ]),

  down: queryInterface => queryInterface.bulkDelete('Locations', null, {}),
};
