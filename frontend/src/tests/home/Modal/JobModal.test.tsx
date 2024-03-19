import {describe, it} from 'vitest';
import JobModal from '@pages/home/components/Modal/JobModal';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

describe('JobModal component', () => {
  it('renders the job modal', () => {
    render(
      <MemoryRouter>
        <JobModal />
      </MemoryRouter>
    );
  });
});
