import httpInstance from "../httpInstance";

export const getTopRatedMovies = async () => {
    let res: any;
    const endpont = `top_rated?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
    await httpInstance
        .get(endpont)
        .then(response => {
            res = response;
        })
        .catch((err) => {
            res = err.response;
        });
    return res;
};