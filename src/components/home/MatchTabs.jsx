import {
    Stack,
    Button
} from "@mui/material";

const tabs = [

    {
        label: "🔴 Live",
        value: "live"
    },

    {
        label: "⏳ Upcoming",
        value: "upcoming"
    },

    {
        label: "✅ Recent",
        value: "completed"
    }

];

const MatchTabs = ({
    status,
    onChange
}) => {

    return (

        <Stack
            direction="row"
            spacing={2}
            mb={4}
            sx={{
                overflowX: "auto",
                pb: 1
            }}
        >

            {tabs.map(tab => (

                <Button

                    key={tab.value}

                    onClick={() => onChange(tab.value)}

                    variant={
                        status === tab.value
                            ? "contained"
                            : "outlined"
                    }

                    sx={{

                        borderRadius: 100,

                        px: 3,

                        whiteSpace: "nowrap",

                        textTransform: "none",

                        fontWeight: 600,

                        transition: ".3s"

                    }}

                >

                    {tab.label}

                </Button>

            ))}

        </Stack>

    );

};

export default MatchTabs;