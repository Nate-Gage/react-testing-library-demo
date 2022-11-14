import React, { useState } from "react";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);

  const validCredentials = () => {
    return username.length > 3 && password.length > 3;
  };

  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();

    fetch(`https://pokeapi.co/api/v2/pokemon/34/`)
      .then((response) => response.json())
      .then((data) => setPokemonName(data.name));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <form>
      <h2
        data-testid="nameHeading"
        style={{ visibility: pokemonName ? "visible" : "hidden" }}
      >
        Your Name Is: {pokemonName}
      </h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button disabled={!validCredentials()} onClick={handleClick}>
        {loading ? "please wait" : "CLICK ME"}
      </button>
    </form>
  );
};

export default Form;
