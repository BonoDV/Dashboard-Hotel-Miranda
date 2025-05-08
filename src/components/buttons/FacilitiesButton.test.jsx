import React from "react";
import { render, screen } from "@testing-library/react";
import FacilitiesButton from "./FacilitiesButton";
import "@testing-library/jest-dom";

/* globals describe, expect, it */

describe("FacilitiesButton", () => {
  it("Show facilities icons and names", () => {
    const facilities = ["TV", "Wi-Fi", "Minibar", "Sea View"];

    render(<FacilitiesButton facilities={facilities} />);

    facilities.forEach((facility) => {
      expect(screen.getByText(facility)).toBeInTheDocument();
    });


    expect(screen.getByText("📺")).toBeInTheDocument(); // TV
    expect(screen.getByText("📶")).toBeInTheDocument(); // Wi-Fi
    expect(screen.getByText("🍸")).toBeInTheDocument(); // Minibar
    expect(screen.getByText("🌊")).toBeInTheDocument(); // Sea View
  });

  it("muestra un emoji por defecto si no se encuentra en el mapa", () => {
    const facilities = ["Unknown Service"];

    render(<FacilitiesButton facilities={facilities} />);

    expect(screen.getByText("Unknown Service")).toBeInTheDocument();
    expect(screen.getByText("❓")).toBeInTheDocument();
  });
});
