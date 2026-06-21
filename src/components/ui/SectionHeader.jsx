import {
    Box,
    Typography,
    Button
} from "@mui/material";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const SectionHeader = ({
    title,
    actionText = "View All",
    onAction
}) => {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
            }}
        >

            <Typography
                variant="h4"
                fontWeight={700}
            >
                {title}
            </Typography>

            <Button
                endIcon={<ChevronRightRoundedIcon />}
                onClick={onAction}
                sx={{
                    textTransform: "none",
                    fontWeight: 600
                }}
            >
                {actionText}
            </Button>

        </Box>

    );

};

export default SectionHeader;