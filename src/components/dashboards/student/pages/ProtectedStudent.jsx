import validateToken from "../../../../utils/ValidateToken"

export default function ProtectedStudent() {
    const isStudent = validateToken();
    return <>
        
    </>
}