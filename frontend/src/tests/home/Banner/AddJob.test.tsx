import AddJob from '@pages/home/components/Banner/AddJob';
import {fireEvent, render} from '@testing-library/react';
import {describe, expect, it, vitest} from 'vitest';

describe('AddJob Component', () => {
  it(`renders the Add Job button with 'Add Job' as text`, () => {
    const {getByText} = render(<AddJob />);
    expect(getByText('Add Job')).toBeInTheDocument();
  });

  it('calls handleClickOpen when button is clicked', () => {
    const handleClickOpen = vitest.fn();

    const {getByText} = render(<AddJob handleClickOpen={handleClickOpen} />);
    const addJobButton = getByText('Add Job');
    fireEvent.click(addJobButton);
    expect(handleClickOpen).toBeCalledTimes(1);
  });
});
