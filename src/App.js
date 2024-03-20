import { useEffect, useState } from "react";
import "./styles.css";
function App() {
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [loading,setLoading]=useState(false);
  const[disablebtn,setdisablebtn]=useState(false);

  async function fetchproduct() {
    try {

      setLoading(false);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );

      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProduct((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false  )
    }
  }

  useEffect(() => {
    fetchproduct();

  },[count]);

  useEffect(()=>{
    if(product && product.length === 100) setdisablebtn(true)
    console.log(product);
  },[product])

  if(loading){
    return <div>loading data! Please wait!!!</div>
  }
  return (
    <div className="load-more-container">
      <div className="product-container">
        {product && product.length
          ? product.map((item) => (
              <div key={item.id} className="product">
                <img src={item.thumbnail} alt="" />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button disabled={disablebtn} onClick={() => setCount(count + 1)}>
          Load More Products
         </button>
            {disablebtn ? <p>You have reached to 100 products</p> : null}
      </div>
    </div>
  );
}

export default App;
