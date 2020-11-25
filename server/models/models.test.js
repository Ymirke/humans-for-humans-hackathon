const { connectDB, clearDatabase, closeDatabase } = require('../test/testdb');

const Patients = require('./Patients');
const Cases = require('./Cases');
const Psychologists = require('./Psychologists');

describe('Model unit tests', () => {
  let connection;
  let db;

  beforeAll(async () => await connectDB());
  beforeEach(async () => await clearDatabase());
  afterAll(async () => await closeDatabase());

  it('Patient model', async () => {
    const newPatient = new Patients({
      username: 'user23',
      password: 'secret24',
      email: 'user23@protonmail.com',
      gender: 'female',
    });

    await newPatient.save();

    const insertedUser = await Patients.findOne({ username: newPatient.username });

    expect(insertedUser).toBeTruthy();
    expect(insertedUser.username).toBe(newPatient.username);
    expect(insertedUser.email).toBe(newPatient.email);
    expect(insertedUser.gender).toBe(newPatient.gender);
  });

  it('Case model', async () => {
    const newPatient = new Patients({
      username: 'user23',
      password: 'secret24',
      email: 'user23@protonmail.com',
      gender: 'female',
    });

    await newPatient.save();

    const insertedUser = await Patients.findOne({ username: 'user23' });

    const newCase = new Cases({
      patientId: insertedUser.id,
      issue: 'Stringgg with problem here.',
    });

    await newCase.save();

    const insertedCase = await Cases.findOne({ issue: newCase.issue });

    expect(insertedCase).toBeTruthy();
    expect(insertedCase.issue).toBe(newCase.issue);
  });

  it('Psychologist model', async () => {
    const newPsychologist = new Psychologists({
      fullName: 'Sigmant Freid',
      email: 'SF@psycholigist.co.uk',
      password: 'sAc$$t,=?fevWr',
    });

    await newPsychologist.save();

    const insertedPsycholoigst = await Psychologists.findOne({ email: newPsychologist.email });

    expect(insertedPsycholoigst).toBeTruthy();
    expect(insertedPsycholoigst.fullName).toBe(newPsychologist.fullName);
    expect(insertedPsycholoigst.email).toBe(newPsychologist.email);
  });
});
