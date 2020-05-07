import axios from 'axios';
import axiosMock from 'axios';
import { getAllJobs } from './jobs';

jest.mock('axios');
const jobs = [{ name: 'IT' }, { name: 'Dennis' }];
describe('All Jobs Api', () => {
  it('returns all jobs', async () => {
    await getAllJobs();

    axiosMock.get.mockResolvedValueOnce({
      data: jobs,
    });

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(
      'http://localhost:5000/api/jobs'
    );
  });
});
