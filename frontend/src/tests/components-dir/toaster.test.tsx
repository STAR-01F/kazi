import Toaster from "@components/toaster/toaster";
import { render, screen } from "@testing-library/react";
import { describe, it, expect} from "vitest";



describe("Toaster ", () => {
  it("should render with the expected inputs", () => {
    const open = false
    const toasterMessage = "toaster-test-successful"

    render(<Toaster open = {!open} handleClose={()=>{open}} severity="success" message= {toasterMessage}/>);
    const toasterElement = screen.getByRole('alert');
    expect(toasterElement).toBeInTheDocument();
    const messageElement = screen.getByText('toaster-test-successful');
    expect(messageElement).toBeInTheDocument();
    const closeElement = screen.getByRole('button');
    expect(closeElement).toBeInTheDocument();

  });

  it('should render an error toaster', () => {
    const toasterMessage = 'toaster-test-failed';
    const open = true;
    render(<Toaster open={open} handleClose={() => {open}} severity="error" message={toasterMessage}/>);
    const newMessageElement = screen.getByText(toasterMessage);
    expect(newMessageElement).toBeInTheDocument();
  });

  it('should be visible', () => {
    const toasterMessage = 'toaster-test-failed';
    const open = true;
    render(<Toaster open={open} handleClose={() => {open}} severity="error" message={toasterMessage}/>);
    const newMessageElement = screen.queryByText(toasterMessage);
    expect(newMessageElement).toBeVisible();
  });


});