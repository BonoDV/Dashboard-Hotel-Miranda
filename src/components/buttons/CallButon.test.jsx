// CallButton.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import CallButton from "./CallButon.jsx";
import "@testing-library/jest-dom";

describe("CallButton", () => {
  it('renderiza un botón con enlace "tel:" y muestra el icono del teléfono', () => {
    const phoneNumber = "+1234567890";

    render(<CallButton phone={phoneNumber} />);

    // Verifica que el enlace tiene el href correcto
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `tel:${phoneNumber}`);

    // Verifica que el ícono de teléfono se renderiza (por su título accesible)
    expect(screen.getByLabelText("Phone icon")).toBeInTheDocument();
  });
});
