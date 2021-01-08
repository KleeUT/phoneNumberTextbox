import * as React from "react";
import "./styles.css";
import styled from "styled-components";
const PhoneNubmerInput = styled.input`
  padding: 1rem;
`;
function handleChange(
  newValue: string,
  oldValue: string,
  onChange: (setNew: string) => void
): void {
  console.log(newValue, oldValue);
  if (newValue.length === oldValue.length - 1) {
    // was a character deleted
    if (
      newValue.charAt(newValue.length - 1) === " " ||
      oldValue.charAt(oldValue.length - 1) === " "
    ) {
      // is the next character a space
      onChange(newValue.slice(0, newValue.length - 1)); // remove the trailing space
      return;
    }
  }
  let formattedInput = newValue.replace(/ /g, ""); // the only spaces allowed are the ones we add in.
  if (!/^\d{0,10}$/.test(formattedInput)) {
    console.log("Bad value");
    // enterd can only be 0-9 up to 10 characters
    onChange(oldValue); // yeah nah you can change it to that
    return;
  }

  // break the number into 3 segments
  const firstSegment = formattedInput.slice(0, 4);
  const secondSegment = formattedInput.slice(4, 7);
  const thridSegment = formattedInput.slice(7, 10);
  // remove any that have no value ie segments that are above the length of the entered string.
  let withSpaces = [firstSegment, secondSegment, thridSegment]
    .filter((x) => x !== "")
    // Combine the elements together with spaces in between.
    .join(" ");
  // if the next character will be in the next segment add a space
  if (withSpaces.length === 4 || withSpaces.length === 8) {
    withSpaces = `${withSpaces} `;
  }
  // set the value
  onChange(withSpaces);
}

export default function App() {
  const [entered, setEntered] = React.useState("1");
  return (
    <div className="App">
      <PhoneNubmerInput
        value={entered}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, entered, setEntered)
        }
      />
    </div>
  );
}
