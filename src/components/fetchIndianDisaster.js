

export async function fetchIndianDisasters() {
    try {
        const response = await fetch(
            'https://api.reliefweb.int/v1/disasters',
            {
                method: 'POST', // Use POST for structured query
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appname: 'vocabulary',
                    preset: 'external',
                    limit: 10, // Number of results to fetch
                    query: {
                        value: 'India', // Correct query format
                    },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const disasters = data.data; // Extract relevant disaster data
        console.log(disasters);
        return disasters;
    } catch (error) {
        console.error('Error fetching Indian disaster news:', error);
    }
}


// export async function DisasterList( {disasters} ) {
//     console.log("in list",disasters);
//     if (!Array.isArray(disasters)) {
//         console.log("not array");
//         return <p>Invalid data format</p>;  // Handle if disasters is not an array
//       }
//     return(
//         <div>
//         <h2>Disaster Updates for India</h2>
//         {disasters.length > 0 ? (
//             disasters.map((disaster, index) => (
//                 <div key={index} style={{ marginBottom: "1rem" }}>
//                     <h3>{disaster.fields?.name || "Unknown Disaster"}</h3>
//                     <p>GLIDE Number: {disaster.fields?.glide || "N/A"}</p>
//                     <p>Status: {disaster.fields?.status || "N/A"}</p>
//                     <p>Link: <a href={disaster.href} target="_blank" rel="noopener noreferrer">{disaster.href}</a></p>
//                 </div>
//             ))
//         ) : (
//             <p>No disasters found for India.</p>
//         )}
//     </div>
//     );
// };

export async function DisasterList({ disasters }) {
    console.log("in list", disasters[0]);

    if (!Array.isArray(disasters)) {
        console.log("not array");
        // return <p>Invalid data format</p>;  // Handle if disasters is not an array
    }

    const disasterItems = [];
    for (let i = 0; i < 10; i++) {
        const disaster = disasters[i];
        disasterItems.push(
            <div key={i} style={{ marginBottom: "1rem" }}>
                <h3>{disaster.fields?.name || "Unknown Disaster"}</h3>
                <p>GLIDE Number: {disaster.fields?.glide || "N/A"}</p>
                <p>Status: {disaster.fields?.status || "N/A"}</p>
                <p>Link: <a href={disaster.href} target="_blank" rel="noopener noreferrer">{disaster.href}</a></p>
            </div>
        );
    }

    return (
        <div>
            <h2>Disaster Updates for India</h2>
            { disasterItems}
        </div>
    );
}
