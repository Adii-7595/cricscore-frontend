import { useEffect } from "react";
import api from "../api/cricketApi";

function Home() {

    useEffect(() => {

        api.get("/tournaments")
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

    }, []);

    return (
        <h1>Home Page</h1>
    );

}

export default Home;