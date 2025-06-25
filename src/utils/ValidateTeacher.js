const ValidateTeacher = async () => {
    try {
        const token = localStorage.getItem("TSSDFDFDFFDFDF");
        const response = await fetch("http://localhost:5000/api/teacher/validate/token", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (result.success) {
            return result.data;
        }
        return false;
    } catch (err) {
        alert(err.message);
    }
}

export default ValidateTeacher;