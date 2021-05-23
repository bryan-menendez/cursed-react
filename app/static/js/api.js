const login_api = async (username, password, success, fail) => {
    const response = await fetch(
          `/api/token/`,
          {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "username": username,
                "password": password,
              })
          }
      );
    const text = await response.text();
    if (response.status === 200) {
      console.log("success", JSON.parse(text));
      success(JSON.parse(text));
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value])=>{
        fail(`${key}: ${value}`);
      });
    }
};

const get_orders_api = async (pageNo="", success, fail) => {
    const token = await localStorage.getItem("salesToken");
    if (token === null) {
      console.log("No credentials found, redirecting...");
      window.location = "/login";
      return [];
    }
    const response = await fetch(
          `/api/orders/?page_no=${pageNo}`,
          {
              method: 'GET',
              headers: {
                  'Content-Type': 'Application/JSON',
                  'Authorization': `Bearer ${token}`,
              }
          }
      );
    const text = await response.text();
    if (response.status === 401) {
      console.log("Token not valid");
      window.location = "/login";
      return [];
    }
    if (response.status === 200) {
      console.log("success", JSON.parse(text));
      success(JSON.parse(text));
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value])=>{
        fail(`${key}: ${value}`);
      });
    }
  };

  const post_order_api = async (data, success) => {
    const token = await localStorage.getItem("salesToken");
    if (token === null) {
      console.log("No credentials found, redirecting...");
      window.location = "/login";
      return [];
    }
    const response = await fetch(
          `/api/orders/`,
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'Application/JSON',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(data)
          }
      );
    const text = await response.text();
    if (response.status === 401) {
      console.log("Token not valid");
      window.location = "/login";
      return [];
    }
    if (response.status === 201) {
      console.log("success", JSON.parse(text));
      success(JSON.parse(text));
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value])=>{
        fail(`${key}: ${value}`);
      });
    }
  };

  const saveOrder = (e)=>{
    e.preventDefault();
    setError("");
    console.log("saving new", item, price, quantity);
    if (item.length * price * quantity === 0)
      setError("Please enter item name, price and quantity");
    else {
      if (itemId === null)
        post_order_api({item, price, quantity}, ()=>{getData();});
      else
        put_order_api(itemId, {item, price, quantity}, ()=>{getData();});
      setShowModal(false);
    }
  };
  const newOrder = ()=>{
    setModalDescription("New order");
    setItemId(null);
    setItem("");
    setPrice(0);
    setQuantity(0);
    setError("");
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };
  const editOrder = (data)=>{
    setModalDescription("Edit order");
    setItemId(data.id);
    setItem(data.item);
    setPrice(data.price);
    setQuantity(data.quantity);
    setError("");
    setShowModal(true);
    const itemInput = document.getElementById("itemInput");
    setTimeout(()=>{itemInput && itemInput.focus()}, 1);
  };
  const put_order_api = async (saleId, data, success) => {
    const token = await localStorage.getItem("salesToken");
    if (token === null) {
      console.log("No credentials found, redirecting...");
      window.location = "/login";
      return [];
    }
    const response = await fetch(
          `/api/orders/${saleId}/`,
          {
              method: 'PUT',
              headers: {
                  'Content-Type': 'Application/JSON',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(data)
          }
      );
    const text = await response.text();
    if (response.status === 401) {
      console.log("Token not valid");
      window.location = "/login";
      return [];
    }
    if (response.status === 200) {
      console.log("success", JSON.parse(text));
      success(JSON.parse(text));
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value])=>{
        fail(`${key}: ${value}`);
      });
    }
  };
  const deleteOrder = (orderId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        delete_order_api(orderId, ()=>{
          Swal.fire({
              title: 'Deleted!',
              text: "Your order has been deleted!",
              icon: 'success',
              timer: 1000,
          });
          getData();
        });
      }
    });
  };
  const delete_order_api = async (saleId, success) => {
    const token = await localStorage.getItem("salesToken");
    if (token === null) {
      console.log("No credentials found, redirecting...");
      window.location = "/login";
      return [];
    }
    const response = await fetch(
          `/api/orders/${saleId}/`,
          {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'Application/JSON',
                  'Authorization': `Bearer ${token}`,
              }
          }
      );
    const text = await response.text();
    if (response.status === 401) {
      console.log("Token not valid");
      window.location = "/login";
      return [];
    }
    console.log(response.status);
    if (response.status === 410) {
      console.log("success", JSON.parse(text));
      success(JSON.parse(text));
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value])=>{
        fail(`${key}: ${value}`);
      });
    }
  };
  