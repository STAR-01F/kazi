import PageCircular from '@components/progress/PageCircular';
import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';

describe('PageCircular', () => {
  it('should render with the expected outputs', () => {
    render(
      <PageCircular sx={{height: '100px', width: '100px', display: 'grid'}} />
    );

    const pageCircularElement = screen.getByRole('progressbar');
    expect(pageCircularElement).toBeInTheDocument();
  });
});
