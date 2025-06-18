const ValidateAdmin = async () => {
    const token = localStorage.getItem("ASDFDKFFJF");
    const validateReq = await fetch("http://localhost:5000/api/admin/validate", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const validateRes = await validateReq.json();
    console.log(validateRes);
    if (validateRes.success) {
        return validateRes.data;
    }
    return false;
}

export default ValidateAdmin;