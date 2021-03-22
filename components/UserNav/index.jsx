import { NavBase } from "../StyledComponents/Bases";
import { Button } from "../StyledComponents/Button";

function UserNav() {
    return (
        <NavBase
            navWidth={[1, 1/2, 1/4]}
            navHeight="auto"
            position="absolute"
        >
            <Button>Logg ut</Button>
        </NavBase>
    )
}

export default UserNav;

