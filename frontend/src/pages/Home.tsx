import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  async function fetchProducts() {
    const url = "https://frontend-auth-lime.vercel.app/products/get";
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    if (result) {
      setProducts(result.data);
      // console.log(products);
    }
    // console.log(result);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Hello {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
      <div>
        <ul>
          {products && products.length > 0 ? (
            products.map((singleProduct: any, index: any) => {
              return (
                <div>
                  <li key={index}>
                    {singleProduct.name} : ${singleProduct.price}
                  </li>
                </div>
              );
            })
          ) : (
            <p>No products</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
