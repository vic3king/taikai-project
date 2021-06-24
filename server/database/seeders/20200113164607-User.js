module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        email: 'john@gmail.com',
        isSubscribed: true,
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
      {
        id: '613e8fed-3f2d-4fda-b1d8-c84ec3570269',
        email: 'jane@gmail.com',
        isSubscribed: true,
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
    ]),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
