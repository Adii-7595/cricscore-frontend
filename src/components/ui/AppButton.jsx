import { Button } from "@mui/material";

const AppButton = ({
    children,
    variant = "contained",
    color = "primary",
    ...props
}) => {

    return (
        <Button
            variant={variant}
            color={color}
            sx={{
                borderRadius: 3,
                px: 3,
                py: 1.2,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",

                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,.12)"
                },

                transition: ".25s"
            }}
            {...props}
        >
            {children}
        </Button>
    );

};

export default AppButton;