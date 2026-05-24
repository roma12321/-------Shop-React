const API_URL="http://localhost:3001/users";

export async function getUsers() {
    const responce=await fetch(API_URL);
    return responce.json();
}
export async function registerUset(user){
    const responce=await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"app;ication/json",
            
        },
        body:JSON.stringify(user),
    })
    return responce.json();
}