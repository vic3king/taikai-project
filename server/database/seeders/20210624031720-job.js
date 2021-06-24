module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Jobs', [
      {
        id: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
        description: 'amazing backend engineer opportunity',
        title: 'backend engineer',
        recruiter: 'taikai',
        recruiterContact: 'taikai@mail.com',
        numberOfHires: 2,
        isActive: true,
        typeId: 'e789fa6a-026d-4df2-a5c5-851d9667eda9',
        skillId: '3839ff93-0e02-437f-94c0-bad41c34f2ad',
        locationId: '150bb47b-f8be-4740-a7b0-b07e17f8d315',
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
      {
        id: '6e810164-e633-45c9-9b65-a787984b2405',
        description: 'amazing frontend engineer opportunity',
        title: 'frontend engineer',
        recruiter: 'cash',
        recruiterContact: 'cash@mail.com',
        numberOfHires: 1,
        typeId: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
        skillId: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
        locationId: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
        isActive: false,
        createdAt: '2021-06-24T08:16:30.673Z',
        updatedAt: '2021-06-24T08:16:30.673Z',
      },
    ]),

  down: queryInterface => queryInterface.bulkDelete('Jobs', null, {}),
};
