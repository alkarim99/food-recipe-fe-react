import React from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import axios from "axios"

import NavbarSecond from "../components/NavbarSecond"
import Footer from "../components/Footer"

import "../styles/DetailRecipe.css"

function DetailRecipe() {
  const location = useLocation()
  const id = location?.pathname?.split("/")[2]
  const [currentRecipe, setCurrentRecipe] = React.useState(null)
  // document
  //   .querySelectorAll(".modal-backdrop")
  //   .forEach((el) => el.classList.remove("modal-backdrop"))
  // document
  //   .querySelectorAll(".fade")
  //   .forEach((el) => el.classList.remove("fade"))
  // document
  //   .querySelectorAll(".show")
  //   .forEach((el) => el.classList.remove("show"))
  React.useEffect(() => {
    window.scroll(0, 0)
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/recipes/${id}`)
      .then((response) => {
        setCurrentRecipe(response.data.data[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const ingredients = currentRecipe?.ingredients?.split(", ")

  return (
    <div>
      <NavbarSecond />

      <div className="container py-5 mb-5">
        <div className="row justify-content-center animate__animated animate__fadeInDown">
          <div className="col">
            <h1 className="text-center text-black">{currentRecipe?.title}</h1>
          </div>
        </div>
        <div className="row py-3 justify-content-center animate__animated animate__zoomIn">
          <div
            className="recipe-picture"
            style={{ backgroundImage: `url(${currentRecipe?.recipePicture})` }}
          ></div>
        </div>
        <div className="row py-3 justify-content-md-center animate__animated animate__fadeInLeft">
          <div className="col-md-7">
            <h3>Ingredients</h3>
            <ul>
              {ingredients &&
                ingredients.map((item) => {
                  return <li>{item}</li>
                })}
            </ul>
          </div>
        </div>
        <div className="row py-3 justify-content-md-center animate__animated animate__fadeInLeft">
          <div className="col-md-7">
            <h3>Video Step</h3>
            <Link
              to={`/detail-video-step/${id}`}
              className="btn btn-lg"
              style={{ backgroundColor: "#efc81a", color: "#fff" }}
            >
              Video
            </Link>
          </div>
        </div>
        <div className="row py-3 justify-content-md-center animate__animated animate__zoomIn">
          <div className="col-md-7">
            <form action="" method="post">
              <textarea
                className="form-control mb-3"
                name="comment"
                id="comment"
                cols="35"
                rows="5"
              >
                Comment :
              </textarea>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: "#efc81a", color: "#fff" }}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row py-3 justify-content-md-center animate__animated animate__zoomIn">
          <div className="col-md-7">
            <h3 className="mb-3">Comment</h3>
            <div className="row">
              <div
                className="col-1 col-md-1"
                style={{
                  backgroundImage: "url(/img/user-icon.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="col col-md">
                <p className="m-0 fw-medium">Ayudia</p>
                <p className="m-0">
                  Nice Recipe, Simple and Delicious, Thankyou
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default DetailRecipe
