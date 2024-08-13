const PortNumber : string = process.env.PORT || '3010';
const BASE_URL = `http://localhost:${PortNumber}`

// Handle Data Shared function
const handleResponse = (response : any) => {
    if(!response.ok){
        console.log("Error Processing fetch");
    }
    return response.json();
}

// Handle Data Shared Function
const fetchData =async (endpoint: string, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, options);
        return handleResponse(response);
    } catch (error) {
        console.log("Fetch Error " + error);
    }
};



export {fetchData, handleResponse} ;