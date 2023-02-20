import { useState } from "react";
import Word from "./Words";


function Search() {
    const [result, setResult] = useState({})

    async function handleSearch(e) {
        const { value } = e.target;
        setResult({ result: await fetchData(value) })

    }
    async function fetchData(val) {
        const trimVal = val.trim().toLowerCase();
        if (trimVal.length > 0) {
            const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${trimVal}`;

            const response = await fetch(api);
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return await response.json();
        }
    }
    return (
        <div className="container">
            <div className="header">
                <div className="caption">
                    <h1>Wiki Search</h1>

                </div>
             
            </div>
            <div className="content">
                <form action="">
                    <input type="text" className="search" onKeyUp={handleSearch} />
                </form>
            </div>
            <div className="word">
                {/* Search result component */}
                <ul>
                    {result.result && result.result.query.search.map(data => <Word key= {data.id} data={data} />)}
                </ul>
            </div>
        </div>

    );
}
export default Search;