const validateToken = async () => {
    const token = localStorage.getItem("HIJDFJFJF12");
    if (token) {
        try {
            const validateReq = await fetch("http://localhost:5000/api/auth/validate-token", {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const validateRes = await validateReq.json();
            return validateRes;
        } catch (err) {
            console.log(err.message);
        }
    }
}

export default validateToken;