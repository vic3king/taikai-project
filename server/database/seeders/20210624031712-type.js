module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Types', [
      {
        id: 'e789fa6a-026d-4df2-a5c5-851d9667eda9',
        jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
        jobType: 'full time',
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
      {
        id: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
        jobId: '6e810164-e633-45c9-9b65-a787984b2405',
        jobType: 'internship',
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
    ]),

  down: queryInterface => queryInterface.bulkDelete('Types', null, {}),
};
