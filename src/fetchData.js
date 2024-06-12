const getSuspender = (promise) => {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

    export const fetchData = async (url, method = 'GET', body = null, token = null) => {
      const headers = {
        'Content-Type': 'application/json',
      };
    
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    
      const options = {
        method,
        headers,
      };
    
      if (body) {
        options.body = JSON.stringify(body);
      }
    
      const response = await fetch(url, options);
      
      const data = await response.json();
      console.log('fetchData response:', data);
      return data;
    
    
}
export const fetchDataasync = async (url, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const data = await response.text(); // Obtener respuesta como texto
      console.error('Error:', data); // Mostrar el contenido de la respuesta en caso de error
      return data;
      throw new Error(`Network response was not ok: ${response.statusText}`);
      
    }

    const contentType = response.headers.get('content-type');
    
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json(); // Procesar respuesta JSON
    } else {
      data = await response.text(); // Procesar respuesta de texto
    }

    console.log('fetchData response:', data);
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

 export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
