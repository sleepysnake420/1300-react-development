import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

import "./App.css";
import Politicians from "./assets/Politicians.json";
import BasicNav from "./components/nav/BasicNav";
import Button from "react-bootstrap/Button";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [democratsChecked, setDemocratsChecked] = useState(false);
  const [republicansChecked, setRepublicansChecked] = useState(false);
  const [under60Checked, setUnder60Checked] = useState(false);
  const [sortedPoliticians, setSortedPoliticians] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    setPoliticians(Politicians);

    // shuffle the politicians
    const shuffledPoliticians = Politicians.sort(() => 0.5 - Math.random());
    setPoliticians(shuffledPoliticians);
  }, []);

  const handleDemocratsCheckbox = (checked) => {
    setDemocratsChecked(checked);
  };

  const handleRepublicansCheckbox = (checked) => {
    setRepublicansChecked(checked);
  };

  const handleUnder60Checkbox = (checked) => {
    setUnder60Checked(checked);
  };

  const handleAddVotes = (votes) => {
    setTotalVotes(totalVotes + votes);
  };

  const handleSortByVotes = () => {
    const sortedPoliticians = politicians.sort((a, b) => {
      return b.votes - a.votes;
    });
    console.log(sortedPoliticians);
    setSortedPoliticians(sortedPoliticians);
  };

  const handleClearVotes = () => {
    console.log("clearing votes");
    setTotalVotes(0);
  };

  useEffect(() => {
    setPoliticians(sortedPoliticians);
  }, [sortedPoliticians]);

  useEffect(() => {
    setPoliticians(
      Politicians.filter((politician) => {
        if (democratsChecked) {
          return politician.party === "Democrat";
        } else {
          return politician;
        }
      })
    );
  }, [democratsChecked]);

  useEffect(() => {
    setPoliticians(
      Politicians.filter((politician) => {
        if (republicansChecked) {
          return politician.party === "Republican";
        } else {
          return politician;
        }
      })
    );
  }, [republicansChecked]);

  useEffect(() => {
    setPoliticians(
      Politicians.filter((politician) => {
        if (under60Checked) {
          return politician.age < 60;
        } else {
          return politician;
        }
      })
    );
  }, [under60Checked]);

  return (
    <div className="App">
      <BasicNav
        democratsChecked={democratsChecked}
        handleDemocratsCheckbox={handleDemocratsCheckbox}
        republicansChecked={republicansChecked}
        handleRepublicansCheckbox={handleRepublicansCheckbox}
        handleUnder60Checkbox={handleUnder60Checkbox}
        handleSortByVotes={handleSortByVotes}
        totalVotes={totalVotes}
      />
      <div className="header-style">
        <h1 className="title-text">Generals Gathered in their Masses</h1>
        <Button
          variant="warning"
          onClick={() => {
            handleClearVotes();
          }}
          size="md"
          className="clear-votes-button"
        >
          Clear Votes Counter
        </Button>
      </div>
      <div className="card-container">
        {politicians.map((politician) => (
          <div key={politician.id}>
            <Card style={{ width: "18rem" }}>
              <div className="image-div">
                <Card.Img
                  variant="top"
                  src={politician.image}
                  className="image-style"
                />
              </div>
              <Card.Body>
                <span>
                  <Card.Title>
                    <span className="politician-name">{politician.name}</span>
                  </Card.Title>
                </span>
                <div className="politician-info">
                  <span
                    className={
                      politician.party === "Republican"
                        ? "republican"
                        : "democrat"
                    }
                  >
                    <Card.Text>{politician.party}</Card.Text>
                  </span>
                  <span>
                    <Card.Text>
                      <b>Age:</b> {politician.age}
                    </Card.Text>
                  </span>
                  <span>
                    <Card.Text>
                      <b>Votes Won:</b> {politician.votes}
                    </Card.Text>
                  </span>
                  <span>
                    <Card.Text>
                      <b>State:</b> {politician.state}
                    </Card.Text>
                  </span>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="primary"
                  onClick={() => handleAddVotes(parseInt(politician.votes))}
                >
                  Add Votes to Cart
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
      <h1 className="footer-text">Just Like Witches at Black Masses</h1>
    </div>
  );
}

export default App;
