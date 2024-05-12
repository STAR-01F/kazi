import SingleFeedItem from '@pages/home/components/NewsFeed/components/SingleFeedItem';
import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';

describe('SingleFeedItem', () => {
  it('should render with the expected output', () => {
    const name = 'Kazi';
    const weblink = 'kazihub.co';
    const title = 'Sucessful exits for Kazi and its 4 co-founders';

    render(
      <SingleFeedItem name={name} weblink={weblink} title={title} id={1} />
    );

    const linkElement = screen.getByRole('link', {name: title});
    expect(linkElement).toHaveAttribute('href', weblink);
    const titleInput = screen.getByText(title);
    expect(titleInput).toBeInTheDocument();
  });
});
