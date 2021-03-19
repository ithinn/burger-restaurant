import Image from "next/image";
import Link from "next/link";
import { Box } from "reflexbox/styled-components"

export const Logo = () => {

    return(
        <Box >
            <Link passHref href="/">
                <a>
                <Image
                    src="/images/logo-01.png"
                    width={130}
                    height={150}
                    alt="logo"
                />
                </a>
            </Link>

        </Box>
    )
}

export default Logo;