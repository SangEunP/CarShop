
export const fetchCars = () => {
    return fetch('https://carrestapi.herokuapp.com/cars')
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong: " + response.statusText);
        return response.json();
      })
      .then((data) => data._embedded.cars)
      .catch((err) => console.error(err));
  };
  
  export const deleteCar = (url) => {
    return fetch(url, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in deletion: " + response.statusText);
        }
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  };
  