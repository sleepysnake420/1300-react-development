import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import "./BasicNav.css";

function BasicNav(props) {
  const democratsChecked = props.democratsChecked;
  const handleDemocratsCheckbox = props.handleDemocratsCheckbox;
  const republicansChecked = props.republicansChecked;
  const handleRepublicansCheckbox = props.handleRepublicansCheckbox;
  const handleUnder60Checkbox = props.handleUnder60Checkbox;
  const handleSortByVotes = props.handleSortByVotes;
  const totalVotes = props.totalVotes;

  const radios = [
    { name: "All Ages", value: "1" },
    { name: "Under 60", value: "2" },
  ];

  const [radioValue, setRadioValue] = useState("1");

  useEffect(() => {
    if (radioValue === "1") {
      handleUnder60Checkbox(false);
    } else {
      handleUnder60Checkbox(true);
    }
  }, [radioValue, handleUnder60Checkbox]);

  return (
    <Nav activeKey="1" className="nav-main">
      <div className="menu-item">
        <NavDropdown
          title="Filter on Party"
          id="nav-dropdown"
          className="dropdown-items"
        >
          <NavDropdown.Item eventKey="1">
            <div
              onClick={() => {
                handleDemocratsCheckbox(!democratsChecked);
              }}
              role="button"
            >
              {!democratsChecked ? (
                <span>Only Democrats</span>
              ) : (
                <span>Not Only Democrats</span>
              )}
            </div>
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="2">
            <div
              onClick={() => {
                handleRepublicansCheckbox(!republicansChecked);
              }}
              role="button"
            >
              {!republicansChecked ? (
                <span>Only Republicans</span>
              ) : (
                <span>Not Only Republicans</span>
              )}
            </div>
          </NavDropdown.Item>
        </NavDropdown>
        <ButtonGroup className="button-group-style">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-secondary"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <Button
          variant="outline-warning"
          size="md"
          className="button-style"
          onClick={handleSortByVotes}
        >
          Sort by Highest Votes
        </Button>
        <div className="right-menu-item">
          <span>Vote Tally Counter: </span>{" "}
          <span className="total-votes-style">{totalVotes}</span>
        </div>
      </div>
    </Nav>
  );
}

export default BasicNav;
