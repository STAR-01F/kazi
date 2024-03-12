import MenuListButton from "@components/button/MenuListButton";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";


describe("MenuListButton", () => {
 
  it("should render with the expected inputs", () => {
    render(
      <MenuListButton menuActionList={[]} variant="contained">
        Click me
      </MenuListButton>
    );

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
});
})