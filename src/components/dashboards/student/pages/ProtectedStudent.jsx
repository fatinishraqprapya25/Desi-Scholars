import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import validateToken from "../../../../utils/ValidateToken";

export default function ProtectedStudent({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            const isStudent = await validateToken();
            if (!isStudent) {
                navigate("/login");
            } else {
                setLoading(false);
            }
        };
        checkAdmin();
    }, [navigate]);

    if (loading) return null;

    return <>{children}</>;
}
