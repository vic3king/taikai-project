import request from 'supertest';
import nodemailer from 'nodemailer';
import app from '../../server/app';
import baseUrl from '../utils/baseUrl';

beforeAll(() => {
  const mockCreateTestAccount = jest.spyOn(nodemailer, 'createTestAccount');
  const mockCreateTransport = jest.spyOn(nodemailer, 'createTransport');

  mockCreateTestAccount.mockResolvedValue({
    user: 'a33idvpakeyb7syo@ethereal.email',
    pass: 'amEzUXuZcDy2NJf2CE',
  });

  const mockRes = jest.fn();
  mockCreateTransport.mockResolvedValue(mockRes);
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('GET JOBS', () => {
  it('should retrieve all jobs', async () => {
    const res = await request(app).get(`${baseUrl}/jobs`);

    const { body } = res;

    expect(res.statusCode).toEqual(200);
    expect(body).toEqual({
      status: true,
      message: 'jobs successfully retrieved',
      job: [
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
          locations: [
            {
              id: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
              jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
              latitude: '092837461928746',
              longitude: '092837461928746',
              address: 'another random address',
              state: 'Lagos',
              city: 'Lagos',
              country: 'Nigeria',
            },
          ],
          contractTypes: [
            {
              id: 'e789fa6a-026d-4df2-a5c5-851d9667eda9',
              jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
              jobType: 'full time',
            },
          ],
          skills: [
            {
              id: '3839ff93-0e02-437f-94c0-bad41c34f2ad',
              jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
              skill: 'CSS',
            },
          ],
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
          locations: [
            {
              id: '150bb47b-f8be-4740-a7b0-b07e17f8d315',
              jobId: '6e810164-e633-45c9-9b65-a787984b2405',
              latitude: '092837461928746',
              longitude: '092837461928746',
              address: 'my random address',
              state: 'Lagos',
              city: 'Lagos',
              country: 'Nigeria',
            },
          ],
          contractTypes: [
            {
              id: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
              jobId: '6e810164-e633-45c9-9b65-a787984b2405',
              jobType: 'internship',
            },
          ],
          skills: [
            {
              id: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
              jobId: '6e810164-e633-45c9-9b65-a787984b2405',
              skill: 'Javascript',
            },
          ],
        },
      ],
    });
  });

  it('should retrieve all active jobs', async () => {
    const res = await request(app).get(`${baseUrl}/jobs?active=true`);

    const { body } = res;

    expect(res.statusCode).toEqual(200);
    expect(body).toEqual({
      status: true,
      message: 'jobs successfully retrieved',
      job: [
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
          locations: [
            {
              id: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
              jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
              latitude: '092837461928746',
              longitude: '092837461928746',
              address: 'another random address',
              state: 'Lagos',
              city: 'Lagos',
              country: 'Nigeria',
            },
          ],
          contractTypes: [
            {
              id: 'e789fa6a-026d-4df2-a5c5-851d9667eda9',
              jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
              jobType: 'full time',
            },
          ],
          skills: [
            {
              id: '3839ff93-0e02-437f-94c0-bad41c34f2ad',
              jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
              skill: 'CSS',
            },
          ],
        },
      ],
    });
  });

  it('should retrieve all inactive jobs', async () => {
    const res = await request(app).get(`${baseUrl}/jobs?active=false`);

    const { body } = res;

    expect(res.statusCode).toEqual(200);
    expect(body).toEqual({
      status: true,
      message: 'jobs successfully retrieved',
      job: [
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
          locations: [
            {
              id: '150bb47b-f8be-4740-a7b0-b07e17f8d315',
              jobId: '6e810164-e633-45c9-9b65-a787984b2405',
              latitude: '092837461928746',
              longitude: '092837461928746',
              address: 'my random address',
              state: 'Lagos',
              city: 'Lagos',
              country: 'Nigeria',
            },
          ],
          contractTypes: [
            {
              id: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
              jobId: '6e810164-e633-45c9-9b65-a787984b2405',
              jobType: 'internship',
            },
          ],
          skills: [
            {
              id: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
              jobId: '6e810164-e633-45c9-9b65-a787984b2405',
              skill: 'Javascript',
            },
          ],
        },
      ],
    });
  });
});

describe('SEARCH JOBS', () => {
  it('should retrieve a job(s) based on skill search', async () => {
    const res = await request(app).get(`${baseUrl}/jobs/search?filter=CSS`);

    const { body } = res;

    expect(res.statusCode).toEqual(200);
    expect(body).toEqual({
      status: true,
      message: 'jobs successfully retrieved',
      jobsFilter: [],
      locationFilter: [],
      skillsFilter: [
        {
          id: '3839ff93-0e02-437f-94c0-bad41c34f2ad',
          jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
          skill: 'CSS',
          createdAt: '2021-06-24T08:16:30.673Z',
          updatedAt: '2021-06-24T08:16:30.673Z',
          Job: {
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
            contractTypes: [
              {
                id: 'e789fa6a-026d-4df2-a5c5-851d9667eda9',
                jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
                jobType: 'full time',
              },
            ],
            skills: [
              {
                id: '3839ff93-0e02-437f-94c0-bad41c34f2ad',
                jobId: '4576ce6f-05a7-4883-bec0-e3cdbcb06c52',
                skill: 'CSS',
              },
            ],
          },
        },
      ],
    });
  });
});

describe('CREATE JOB', () => {
  it('should post a new job offer', async () => {
    const res = await request(app)
      .post(`${baseUrl}/jobs`)
      .send({
        description: 'some mad gig',
        title: 'frontend dev',
        recruiter: 'taikai',
        recruiterContact: 'taikai@gmail.com',
        numberOfHires: 2,
        typeId: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
        skillId: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
        locationId: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
      });

    const { body } = res;

    expect(res.statusCode).toEqual(201);
    expect(body).toEqual(
      expect.objectContaining({
        status: true,
        message: 'job successfully posted',
        job: expect.objectContaining({
          description: 'some mad gig',
          title: 'frontend dev',
          recruiter: 'taikai',
          recruiterContact: 'taikai@gmail.com',
          numberOfHires: 2,
          typeId: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
          skillId: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
          locationId: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
        }),
      })
    );
  });

  it('should not create a job when job description is missing', async () => {
    const res = await request(app)
      .post(`${baseUrl}/jobs`)
      .send({
        title: 'frontend dev',
        recruiter: 'taikai',
        recruiterContact: 'taikai@gmail.com',
        numberOfHires: 2,
        typeId: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
        skillId: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
        locationId: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('description is required');
  });

  it('should not create a job when job title is missing', async () => {
    const res = await request(app)
      .post(`${baseUrl}/jobs`)
      .send({
        description: 'some mad gig',
        recruiter: 'taikai',
        recruiterContact: 'taikai@gmail.com',
        numberOfHires: 2,
        typeId: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
        skillId: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
        locationId: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('title is required');
  });

  it('should not create a job when job recruiter is missing', async () => {
    const res = await request(app)
      .post(`${baseUrl}/jobs`)
      .send({
        description: 'some mad gig',
        title: 'frontend dev',
        recruiterContact: 'taikai@gmail.com',
        numberOfHires: 2,
        typeId: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
        skillId: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
        locationId: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('recruiter is required');
  });

  it('should not create a job when job recruiterContact is missing', async () => {
    const res = await request(app)
      .post(`${baseUrl}/jobs`)
      .send({
        description: 'some mad gig',
        title: 'frontend dev',
        recruiter: 'taikai',
        numberOfHires: 2,
        typeId: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
        skillId: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
        locationId: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('recruiterContact is required');
  });

  it('should not create a job when job typeId is missing', async () => {
    const res = await request(app)
      .post(`${baseUrl}/jobs`)
      .send({
        description: 'some mad gig',
        title: 'frontend dev',
        recruiter: 'taikai',
        recruiterContact: 'taikai@gmail.com',
        numberOfHires: 2,
        skillId: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
        locationId: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('typeId is required');
  });

  it('should not create a job when job skillId is missing', async () => {
    const res = await request(app)
      .post(`${baseUrl}/jobs`)
      .send({
        description: 'some mad gig',
        title: 'frontend dev',
        recruiter: 'taikai',
        recruiterContact: 'taikai@gmail.com',
        numberOfHires: 2,
        typeId: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
        locationId: 'f50be934-5fc7-4c53-bfa7-4b013052c902',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('skillId is required');
  });

  it('should not create a job when job locationId is missing', async () => {
    const res = await request(app)
      .post(`${baseUrl}/jobs`)
      .send({
        description: 'some mad gig',
        title: 'frontend dev',
        recruiter: 'taikai',
        recruiterContact: 'taikai@gmail.com',
        numberOfHires: 2,
        typeId: '761ecd41-7dfb-4e9b-a3af-1650f6ee3d4a',
        skillId: 'ccec1a69-60ba-4a24-a615-fa929cb16e9f',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBe(false);
    expect(error).toEqual('locationId is required');
  });
});

describe('DELETE JOB', () => {
  it('Should successfully delete a job', async () => {
    const res = await request(app).delete(
      `${baseUrl}/jobs/6e810164-e633-45c9-9b65-a787984b2405`
    );

    const { status, message } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(status).toBeTruthy();
    expect(message).toBe('job successfully deleted');
  });

  it('Should throw an error if job id does not exist', async () => {
    const res = await request(app).delete(
      `${baseUrl}/jobs/83c1965c-04d8-43ef-861f-83c072fe69a4`
    );

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(404);
    expect(status).toBeFalsy();
    expect(error).toBe('Job does not exist');
  });
});

describe('UPDATE JOB', () => {
  it('Should successfully update a job based on the params supplied', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/jobs/4576ce6f-05a7-4883-bec0-e3cdbcb06c52`)
      .send({
        description: 'New description',
      });

    const {
      status,
      message,
      data: { description },
    } = res.body;

    expect(res.statusCode).toEqual(200);
    expect(status).toBeTruthy();
    expect(message).toBe('job Updated successfully');
    expect(description).toBe('New description');
  });

  it('Should fail if user tries to update a private or invalid field', async () => {
    const res = await request(app)
      .patch(`${baseUrl}/jobs/4576ce6f-05a7-4883-bec0-e3cdbcb06c52`)
      .send({
        emaiL: 'random',
      });

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(400);
    expect(status).toBeFalsy();
    expect(error).toBe('emaiL is not allowed');
  });

  it('Should throw an error if job id does not exist', async () => {
    const res = await request(app).patch(
      `${baseUrl}/jobs/83c1965c-04d8-43ef-861f-83c072fe69a4`
    );

    const { status, error } = res.body;
    expect(res.statusCode).toEqual(404);
    expect(status).toBeFalsy();
    expect(error).toBe('Job does not exist');
  });
});
