import Copyright from '@components/copyright/copyright';
import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';

describe('Copyright', () => {
  it('should render with the expected inputs', () => {
    render(<Copyright href="test.com" />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'test.com');
    expect(linkElement).toHaveTextContent('Kazi');
  });
});
