import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ValidateAdmin from "../../../../utils/ValidateAdmin";

export default function ProtectedAdmin({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            const isAdmin = await ValidateAdmin();
            if (!isAdmin) {
                navigate("/admin/login");
            } else {
                setLoading(false);
            }
        };
        checkAdmin();
    }, [navigate]);

    if (loading) return null;

    return <>{children}</>;
}
