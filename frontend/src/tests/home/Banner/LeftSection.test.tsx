import LeftSection from '@pages/home/components/Banner/LeftSection';
import {render, fireEvent} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {MemoryRouter} from 'react-router-dom';

describe('LeftSection Component', () => {
  it('renders the left section of the banner', () => {
    render(
      <MemoryRouter>
        <LeftSection />
      </MemoryRouter>
    );
  });

  it('updates color when correct view button is clicked', async () => {
    const {getByTestId} = render(
      <MemoryRouter>
        <LeftSection />
      </MemoryRouter>
    );

    // check grid button is primary colour on initial render
    const gridButton = getByTestId('GridViewIcon');
    expect(gridButton.parentElement).toHaveClass('MuiButton-colorPrimary');

    // after clicking list view, the grid view colour should change back to inherit
    const listButton = getByTestId('ViewListIcon');
    fireEvent.click(listButton);
    expect(gridButton.parentElement).toHaveClass('MuiButton-colorInherit');
  });
});
