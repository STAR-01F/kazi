import LandingPage from '@components/landing/landing';
import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';

describe('LandingPage', () => {
  it('should render with the expected inputs', () => {
     render(<LandingPage />);
      const imgElement = screen.getAllByRole('img');
      expect(imgElement[0]).toBeInTheDocument();
      const tagLine = screen.getByText('Simplify ∙ Track ∙ Succeed');
      expect(tagLine).toBeInTheDocument();
      const logo = screen.getByAltText('Kazi Logo');
      expect(logo).toBeInTheDocument();

  });
});
