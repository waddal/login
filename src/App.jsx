import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: ", response.credential);
    let userObject = jwt_decode(response.credential);
    console.log("User Object: ", userObject);
    setUser(userObject);
    document.getElementById("signInContainer").hidden = true;
  }

  useEffect(() => {
    console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
    // google object comes from script in index.html
    google.accounts.id.initialize({
      // Referrer-Policy: no-referrer-when-downgrade, 
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      // when someone logs in, this is the function we call
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInContainer"),
      { theme: "outline", size: "large" }
    )
  }, []);

  return (
    <div className="App">
      <div id="signInContainer"></div>
      {user && (
        <div>
          <img src={user.picture}/>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
