import { Card } from "@mui/material";

const AppCard = ({ children, sx = {}, ...props }) => {

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                transition: ".25s",

                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,.12)"
                },

                ...sx
            }}
            {...props}
        >

            {children}

        </Card>

    );

};

export default AppCard;