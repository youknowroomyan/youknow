import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    age: "",
  });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="password"
                  value={formValues.password}
                />
                {showAge && (
                  <>
                    <input
                      type="number"
                      placeholder="Age"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          [e.target.name]: e.target.value,
                        })
                      }
                      name="age"
                      value={formValues.age}
                    />
                    <span className="age-warning">
                      Put your age correctly, we will recommend movies based on your age
                    </span>
                  </>
                )}
              </>
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
            {showPassword && !showAge && (
              <button onClick={() => setShowAge(true)}>Add age</button>
            )}
          </div>
          {showPassword && showAge && <button onClick={handleSignIn}>Log In</button>}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      gap: 1rem;

      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;

        h1 {
          padding: 0 25rem;
        }
      }

      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        margin: 0 auto;

        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }

        }
        .age-warning {
          font-size: 1rem;
          color: #a9a9a9;
          margin-top: 0.5rem;
          text-align: center;
        }
        

        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }

      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        margin: 0 auto;
      }
    }

    @media screen and (max-width: 768px) {
      grid-template-rows: 20vh 80vh;

      .body {
        .text {
          h1 {
            padding: 0 10%;
            font-size: 1.5rem;
          }
        }

        .form {
          width: 80%;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto auto;

          input {
            margin: 0 auto;
          }

          button {
            margin: 0 auto;
          }
        }

        button {
          margin: 0 auto;
        }
      }
    }

    @media screen and (max-width: 480px) {
      grid-template-rows: 25vh 75vh;

      .body {
        .text {
          h1 {
            padding: 0 5%;
            font-size: 1.2rem;
          }

          h4 {
            font-size: 0.9rem;
          }

          h6 {
            font-size: 0.7rem;
          }
        }

        .form {
          width: 90%;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto auto;

          input {
            margin: 0 auto;
          }

          button {
            margin: 0 auto;
          }
        }

        button {
          margin: 0 auto;
        }
        
      }
    }
  }
`;



  
  export default Signup;