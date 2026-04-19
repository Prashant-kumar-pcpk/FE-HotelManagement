
const BASE_URL = "https://be-hotelmanagement.onrender.com/api"

// register
export const registerUser = async (data) => {
    const res = await fetch(`${BASE_URL}/users/register`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(data)

    })

    const result = await res.json();
    return result
}


// login
export const loginUser = async (data) => {
    const res = await fetch(`${BASE_URL}/users/login`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(data)

    })

    const result = await res.json();
    return result
}

// contacts
export const contactUser = async (data) =>{

    const res = await fetch(`${BASE_URL}/user/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}