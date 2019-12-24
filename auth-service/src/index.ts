import app from './App';

// env port 
const port = process.env.PORT || '3000';

app.listen(port, error => {
    if (error) {
        throw error;
    }
    console.log("Server up and running on port %s", port)
})
