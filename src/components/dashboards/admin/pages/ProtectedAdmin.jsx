import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedAdmin({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("ASDFDKFFJF");

    useEffect(() => {
        if (!token) {
            navigate("/admin/login");
        }
    }, [token, navigate]);

    if (!token) return null;

    return <>{children}</>;
}
